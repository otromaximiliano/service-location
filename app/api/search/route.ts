import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ILocation } from '@/lib/types';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q');

        if (!query) {
            return NextResponse.json(
                { success: false, error: 'Query parameter "q" is required.' },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db('service-location');
        const collection = db.collection<ILocation>('argentina');

        // Use $text search as requested
        // Project score to sort by relevance
        const results = await collection
            .find({ $text: { $search: query } })
            .project({ score: { $meta: 'textScore' } })
            .sort({ score: { $meta: 'textScore' } })
            .limit(20)
            .toArray();

        return NextResponse.json({ success: true, data: results });
    } catch (error: any) {
        console.error('Search API Error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
