import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ILocation } from '@/lib/types';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const parent_id = searchParams.get('parent_id');
        const category = searchParams.get('category'); // Optional filter by category

        if (!parent_id) {
            return NextResponse.json(
                { success: false, error: 'Query parameter "parent_id" is required.' },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db('service-location');
        const collection = db.collection<ILocation>('argentina');

        const query: any = {
            $or: [
                { 'parent.id': parent_id },
                { 'provincia_id': parent_id }
            ]
        };

        if (category) {
            query.category = category;
        }

        // Sort by name A-Z
        const results = await collection
            .find(query)
            .sort({ name: 1 })
            .toArray();

        return NextResponse.json({ success: true, data: results });
    } catch (error: any) {
        console.error('Children API Error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
