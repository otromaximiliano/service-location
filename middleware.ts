import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Only protect /api routes
    if (request.nextUrl.pathname.startsWith('/api')) {
        const apiKey = request.headers.get('x-api-key')
        const validApiKey = process.env.CARWI_API_KEY

        // Allow if no key is strict configured (dev mode/loose) OR matches
        // But for "public" home and protected API, we usually want strict check
        if (!validApiKey || apiKey !== validApiKey) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized: Missing or invalid API Key' },
                { status: 401 }
            )
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/api/:path*',
}
