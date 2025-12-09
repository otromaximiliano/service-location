import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const provinciaId = searchParams.get('provincia');
        const municipioId = searchParams.get('municipio');

        const client = await clientPromise;
        const db = client.db('service-location');

        const query: any = { category: 'localidad' };

        if (provinciaId) {
            query.provincia_id = provinciaId;
        }

        if (municipioId) {
            query['parent.id'] = municipioId;
            query['parent.category'] = 'municipio';
        }

        const localidades = await db.collection('argentina')
            .find(query)
            .sort({ name: 1 })
            .toArray();

        return NextResponse.json(localidades);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
