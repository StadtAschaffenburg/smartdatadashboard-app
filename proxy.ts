import { NextRequest, NextResponse } from 'next/server'

// list of allowed site IDs
const valid_site_ids = process.env.SITE_IDS?.split(',') || []
const default_site_id =
  process.env.DEFAULT_SITE_ID || valid_site_ids[0] || 'default'
const default_index = valid_site_ids.indexOf(default_site_id)
if (default_index > -1) {
  valid_site_ids.splice(default_index, 1)
}
valid_site_ids.push('preview')

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const host = request.headers.get('host') || 'localhost:3000'
  const protocol = host.includes('localhost') ? 'http' : 'https'

  // allow static files
  if (pathname.includes('.')) {
    return NextResponse.next()
  }

  // check ?password param
  const url = request.nextUrl.clone()
  const password = url.searchParams.get('password')

  if (password && password === process.env.PASSWORD) {
    // remove password from URL
    url.searchParams.delete('password')

    // build response with redirect to clean URL
    const response = NextResponse.redirect(url)

    // set cookie (HTTP-only, short lifespan optional)
    response.cookies.set('site_auth', password, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  }

  let response: NextResponse
  let site_id = default_site_id

  const matched_site_id = valid_site_ids.find(
    s => pathname.startsWith(`/${s}/`) || pathname === `/${s}`,
  )

  if (matched_site_id) {
    site_id = matched_site_id
    response = NextResponse.next()
  } else {
    const rewrite_url = new URL(
      `/${default_site_id}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
      request.url,
    )
    response = NextResponse.rewrite(rewrite_url)
  }

  const full_url = `${protocol}://${host}${pathname}${search}`
  response.headers.set('x-full-url', full_url)
  response.headers.set('x-pathname', pathname)
  response.headers.set('x-site-id', site_id)
  response.headers.delete('X-Frame-Options')
  response.headers.set('Content-Security-Policy', 'frame-ancestors *;')

  // CORS for API routes
  if (pathname.includes('/api')) {
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set(
      'Access-Control-Allow-Methods',
      'GET,HEAD,PUT,PATCH,POST,DELETE',
    )
    response.headers.set(
      'Access-Control-Allow-Headers',
      request.headers.get('Access-Control-Request-Headers') ?? 'Content-Type',
    )
    response.headers.set('locale', site_id)
  }

  return response
}

export const config = {
  matcher: ['/((?!api|images|download|icoset|favicon|_next|\\.well-known).*)'],
}
