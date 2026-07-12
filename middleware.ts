import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_COOKIE, validarToken } from '@/lib/admin-auth'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // El login es la única ruta admin pública
  if (pathname === '/api/admin/login') {
    return NextResponse.next()
  }

  const secret = process.env.ADMIN_SESSION_SECRET
  const token = req.cookies.get(ADMIN_COOKIE)?.value
  const valido = secret ? await validarToken(token, secret) : false

  if (valido) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ ok: false, error: 'No autorizado' }, { status: 401 })
  }

  return NextResponse.redirect(new URL('/admin', req.url))
}

export const config = {
  // /admin (login) queda fuera; /admin/* y /api/admin/* protegidos
  matcher: ['/admin/:path+', '/api/admin/:path*'],
}
