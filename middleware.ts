import { NextResponse, type NextRequest } from 'next/server'

// Config
// ========================================================
const corsOptions: {
  allowedMethods: string[]
  allowedOrigins: string[]
  maxAge?: number
} = {
  allowedMethods: (process.env?.ALLOWED_METHODS || '').split(','),
  allowedOrigins: (process.env?.ALLOWED_ORIGIN || '').split(','),
  maxAge: (process.env?.MAX_AGE && parseInt(process.env?.MAX_AGE)) || undefined
}

// Middleware
// ========================================================
export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Allowed origins check
  const origin = request.headers.get('origin') ?? ''
  if (corsOptions.allowedOrigins.includes('*') || corsOptions.allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  }

  // Set default CORS headers
  response.headers.set('Access-Control-Allow-Methods', corsOptions.allowedMethods.join(','))
  response.headers.set('Access-Control-Max-Age', corsOptions.maxAge?.toString() ?? '')

  return response
}

export const config = {
  matcher: '/api/:path*'
}
