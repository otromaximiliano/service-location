import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const allowedOrigins = [
    'https://www.carwi.autos',
]

export function middleware(request: NextRequest) {
    const origin = request.headers.get('origin') ?? ''

    // Allow carwi.autos or any localhost port
    const isAllowedOrigin = allowedOrigins.includes(origin) || origin.startsWith('http://localhost:')

    // Handle Preflight OPTIONS request
    if (request.method === 'OPTIONS') {
        if (isAllowedOrigin) {
            return new NextResponse(null, {
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': origin,
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
                },
            })
        }
        return new NextResponse(null, { status: 204 })
    }

    // Prepare response
    const response = NextResponse.next()

    // Add CORS headers to the response if allowed
    if (isAllowedOrigin) {
        response.headers.set('Access-Control-Allow-Origin', origin)
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-api-key')
    }

    // Only protect /api routes
    if (request.nextUrl.pathname.startsWith('/api')) {
        const apiKey = request.headers.get('x-api-key')
        const validApiKey = process.env.CARWI_API_KEY

        // Allow if no key is strict configured (dev mode/loose) OR matches
        // But for "public" home and protected API, we usually want strict check
        if (!validApiKey || apiKey !== validApiKey) {
            const errorResponse = NextResponse.json(
                { success: false, error: 'Unauthorized: Missing or invalid API Key' },
                { status: 401 }
            )
            // Ensure 401s also get CORS headers so the browser can see the error
            if (isAllowedOrigin) {
                errorResponse.headers.set('Access-Control-Allow-Origin', origin)
                errorResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                errorResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-api-key')
            }
            return errorResponse
        }
    }

    return response
}

export const config = {
    matcher: '/api/:path*',
}
