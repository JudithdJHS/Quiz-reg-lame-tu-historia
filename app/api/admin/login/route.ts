import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_COOKIE, SESION_MAX_AGE_SEGUNDOS, crearToken, parseAdminUsers } from '@/lib/admin-auth'

export async function POST(req: NextRequest) {
  let body: { password?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'JSON inválido' }, { status: 400 })
  }

  const secret = process.env.ADMIN_SESSION_SECRET
  const usersRaw = process.env.ADMIN_USERS
  const legacyPassword = process.env.ADMIN_PASSWORD

  if (!secret || (!usersRaw && !legacyPassword)) {
    console.error('ADMIN_SESSION_SECRET y (ADMIN_USERS o ADMIN_PASSWORD) no configuradas')
    return NextResponse.json({ ok: false, error: 'Panel no configurado' }, { status: 500 })
  }

  if (!body.password) {
    return NextResponse.json({ ok: false, error: 'Clave incorrecta' }, { status: 401 })
  }

  let nombreAutenticado: string | null = null

  if (usersRaw) {
    const usuario = parseAdminUsers(usersRaw).find(u => u.clave === body.password)
    if (usuario) nombreAutenticado = usuario.nombre
  }
  if (!nombreAutenticado && legacyPassword && body.password === legacyPassword) {
    nombreAutenticado = 'Equipo'
  }

  if (!nombreAutenticado) {
    return NextResponse.json({ ok: false, error: 'Clave incorrecta' }, { status: 401 })
  }

  const token = await crearToken(secret, nombreAutenticado)
  const res = NextResponse.json({ ok: true, nombre: nombreAutenticado })
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESION_MAX_AGE_SEGUNDOS,
  })
  return res
}
