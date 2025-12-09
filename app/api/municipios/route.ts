import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const provinciaId = searchParams.get('provincia');

        const client = await clientPromise;
        const db = client.db('service-location');

        const query: any = { category: 'municipio' };
        if (provinciaId) {
            query.provincia_id = provinciaId;
        }

        const municipios = await db.collection('argentina')
            .find(query)
            .sort({ name: 1 })
            .toArray();

        return NextResponse.json(municipios);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
