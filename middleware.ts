import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { nextUrl, headers } = req

  const host =
    headers.get('host') || process.env.NEXT_PUBLIC_BASE_URL || 'localhost:3000'
  const protocol = headers.get('x-forwarded-proto') || 'http'
  const full_url = `${protocol}://${host}${nextUrl.pathname}${nextUrl.search}`
  const response = NextResponse.next()
  response.headers.set('x-full-url', full_url)

  return response
}

export const config = {
  matcher: '/:path*', // Wende Middleware auf alle Routen an
}
