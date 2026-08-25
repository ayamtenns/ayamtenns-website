import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// The printed QR encodes "AYAMTENNS.COM/BOX". /story is the canonical page now,
// so every capitalisation of /box redirects there permanently.
// NEVER remove this route — thousands of printed boxes point at it.
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.toLowerCase() === '/box') {
    const url = request.nextUrl.clone()
    url.pathname = '/story'
    return NextResponse.redirect(url, { status: 301 })
  }
  return NextResponse.next()
}

export const config = {
  // Every capitalisation of /box (Next.js matchers don't support regex flags).
  matcher: [
    '/box', '/BOX', '/Box', '/bOx', '/boX', '/BOx', '/bOX', '/BoX',
  ],
}
