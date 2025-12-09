import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('service-location');

        const provinces = await db.collection('argentina')
            .find({ category: 'provincia' })
            .sort({ name: 1 })
            .toArray();

        return NextResponse.json(provinces);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
