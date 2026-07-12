import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_COOKIE, SESION_MAX_AGE_SEGUNDOS, crearToken } from '@/lib/admin-auth'

export async function POST(req: NextRequest) {
  let body: { password?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'JSON inválido' }, { status: 400 })
  }

  const adminPassword = process.env.ADMIN_PASSWORD
  const secret = process.env.ADMIN_SESSION_SECRET

  if (!adminPassword || !secret) {
    console.error('ADMIN_PASSWORD o ADMIN_SESSION_SECRET no configuradas')
    return NextResponse.json({ ok: false, error: 'Panel no configurado' }, { status: 500 })
  }

  if (!body.password || body.password !== adminPassword) {
    return NextResponse.json({ ok: false, error: 'Clave incorrecta' }, { status: 401 })
  }

  const token = await crearToken(secret)
  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESION_MAX_AGE_SEGUNDOS,
  })
  return res
}
