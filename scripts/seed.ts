import dotenv from 'dotenv';
import path from 'path';

// Load env vars from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import clientPromise from '../lib/mongodb';
import { ILocation } from '../lib/types';

const API_BASE = 'https://apis.datos.gob.ar/georef/api';
const MAX_PER_PAGE = 1000;
const DB_NAME = 'test'; // Or retrieve from URI if needed, but usually we specify or default. 
// User mentioned "mongo db tengo otras cosas", so maybe a specific DB? 
// But usually sharing the same DB with a new collection is what is meant.
// I will assume default DB from URI or "service-location" or just "test" (Atlas default).
// Better to parse from URI or let the client decide. 
// clientPromise.db() uses the database from the connection string.
const COLLECTION_NAME = 'argentina';

async function fetchData(endpoint: string, params: Record<string, any> = {}) {
    const url = new URL(`${API_BASE}${endpoint}`);
    url.searchParams.set('max', MAX_PER_PAGE.toString());
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));

    let allData: any[] = [];
    let start = 0;
    let total = 0;

    console.log(`Fetching ${endpoint}...`);

    do {
        url.searchParams.set('inicio', start.toString());
        const res = await fetch(url.toString());
        if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
        const data = await res.json();

        // keys are usually 'provincias', 'departamentos', etc.
        const key = Object.keys(data).find(k => Array.isArray(data[k]));
        if (!key) break;

        const items = data[key];
        allData = allData.concat(items);
        total = data.total;
        start += items.length;

        process.stdout.write(`\rFetched ${allData.length} / ${total}`);
    } while (allData.length < total);

    console.log(`\nDone fetching ${endpoint}. Total: ${allData.length}`);
    return allData;
}

async function seed() {
    // Dynamically import to ensure env vars are loaded first
    const { default: clientPromise } = await import('../lib/mongodb');

    const client = await clientPromise;
    const db = client.db('service-location'); // Explicitly use service-location
    const collection = db.collection<ILocation>(COLLECTION_NAME);

    console.log(`Connected to MongoDB. Using collection: ${COLLECTION_NAME}`);

    // Create Indexes
    console.log('Creating indexes...');
    await collection.createIndex({ name: 'text' });
    await collection.createIndex({ location: '2dsphere' });
    await collection.createIndex({ official_id: 1 }, { unique: true });
    console.log('Indexes created.');

    // 1. Provincias
    const provincias = await fetchData('/provincias');
    for (const p of provincias) {
        await collection.updateOne(
            { official_id: p.id },
            {
                $set: {
                    official_id: p.id,
                    name: p.nombre,
                    category: 'provincia',
                    location: {
                        type: 'Point',
                        coordinates: [p.centroide.lon, p.centroide.lat]
                    }
                }
            },
            { upsert: true }
        );
    }
    console.log('Upserted Provincias');

    // 2. Departamentos
    const departamentos = await fetchData('/departamentos');
    for (const d of departamentos) {
        await collection.updateOne(
            { official_id: d.id },
            {
                $set: {
                    official_id: d.id,
                    name: d.nombre,
                    category: 'departamento',
                    parent: {
                        id: d.provincia.id,
                        name: d.provincia.nombre,
                        category: 'provincia'
                    },
                    provincia_id: d.provincia.id,
                    location: {
                        type: 'Point',
                        coordinates: [d.centroide.lon, d.centroide.lat]
                    }
                }
            },
            { upsert: true }
        );
    }
    console.log('Upserted Departamentos');

    // 3. Municipios
    const municipios = await fetchData('/municipios');
    for (const m of municipios) {
        await collection.updateOne(
            { official_id: m.id },
            {
                $set: {
                    official_id: m.id,
                    name: m.nombre,
                    category: 'municipio',
                    parent: {
                        id: m.provincia.id,
                        name: m.provincia.nombre,
                        category: 'provincia'
                    },
                    provincia_id: m.provincia.id,
                    location: {
                        type: 'Point',
                        coordinates: [m.centroide.lon, m.centroide.lat]
                    }
                }
            },
            { upsert: true }
        );
    }
    console.log('Upserted Municipios');

    // 4. Localidades
    const locs = await fetchData('/localidades');
    for (const l of locs) {
        let parent = null;
        if (l.municipio && l.municipio.id) {
            parent = { id: l.municipio.id, name: l.municipio.nombre, category: 'municipio' };
        } else if (l.departamento && l.departamento.id) {
            parent = { id: l.departamento.id, name: l.departamento.nombre, category: 'departamento' };
        } else {
            parent = { id: l.provincia.id, name: l.provincia.nombre, category: 'provincia' };
        }

        await collection.updateOne(
            { official_id: l.id },
            {
                $set: {
                    official_id: l.id,
                    name: l.nombre,
                    category: 'localidad',
                    parent: parent,
                    provincia_id: l.provincia.id,
                    location: {
                        type: 'Point',
                        coordinates: [l.centroide.lon, l.centroide.lat]
                    }
                }
            },
            { upsert: true }
        );
    }
    console.log('Upserted Localidades');

    console.log('Seeding completed');
    process.exit(0);
}

seed().catch(e => {
    console.error(e);
    process.exit(1);
});
