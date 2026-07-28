import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Redirect semua case variant /BOX, /Box, dll ke /box (lowercase canonical).
// QR code di kemasan cetak `/BOX` — harus redirect permanent ke /box.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname.toLowerCase() === '/box' && pathname !== '/box') {
    const url = request.nextUrl.clone()
    url.pathname = '/box'
    return NextResponse.redirect(url, { status: 301 })
  }
  return NextResponse.next()
}

export const config = {
  // All 7 non-lowercase capitalisation variants of /box (Next.js matcher doesn't support regex flags)
  matcher: ['/BOX', '/Box', '/bOx', '/boX', '/BOx', '/bOX', '/BoX'],
}
