import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ILocation } from '@/lib/types';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const latStr = searchParams.get('lat');
        const lonStr = searchParams.get('lon');

        if (!latStr || !lonStr) {
            return NextResponse.json(
                { success: false, error: 'Parameters "lat" and "lon" are required.' },
                { status: 400 }
            );
        }

        const lat = parseFloat(latStr);
        const lon = parseFloat(lonStr);

        if (isNaN(lat) || isNaN(lon)) {
            return NextResponse.json(
                { success: false, error: 'Invalid coordinates.' },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db('service-location');
        const collection = db.collection<ILocation>('argentina');

        // Find nearest Municipality or Department
        const result = await collection.findOne({
            category: { $in: ['municipio', 'departamento'] },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [lon, lat],
                    },
                    // $maxDistance: 10000 
                },
            },
        });

        if (!result) {
            return NextResponse.json(
                { success: false, error: 'No location found near coordinates.' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: result });
    } catch (error: any) {
        console.error('Reverse Geocoding API Error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
