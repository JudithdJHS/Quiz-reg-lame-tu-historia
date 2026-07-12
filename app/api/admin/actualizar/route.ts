import { NextRequest, NextResponse } from 'next/server'
import { actualizarLead } from '@/lib/sheets'
import { identidadSesion } from '@/lib/admin-auth'
import { ESTADOS_LEAD, type EstadoLead } from '@/types/admin'

export const dynamic = 'force-dynamic'

interface ActualizarBody {
  email?: string
  estado?: string
  nota?: string
  registrarGestion?: boolean
}

export async function POST(req: NextRequest) {
  const nombreAdmin = await identidadSesion(req)
  if (!nombreAdmin) {
    return NextResponse.json({ ok: false, error: 'No autorizado' }, { status: 401 })
  }

  let body: ActualizarBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'JSON inválido' }, { status: 400 })
  }

  const email = (body.email || '').trim().toLowerCase()
  if (!email.includes('@')) {
    return NextResponse.json({ ok: false, error: 'Email requerido' }, { status: 400 })
  }

  if (body.estado && !(ESTADOS_LEAD as readonly string[]).includes(body.estado)) {
    return NextResponse.json({ ok: false, error: 'Estado no válido' }, { status: 400 })
  }

  if (!body.estado && !body.nota && !body.registrarGestion) {
    return NextResponse.json({ ok: false, error: 'Nada que actualizar' }, { status: 400 })
  }

  try {
    const lead = await actualizarLead(email, {
      estado: body.estado as EstadoLead | undefined,
      nota: body.nota,
      registrarGestion: body.registrarGestion,
      admin: nombreAdmin,
    })
    return NextResponse.json({ ok: true, lead })
  } catch (error) {
    console.error('Error actualizando lead:', error)
    const mensaje = error instanceof Error && error.message.startsWith('Lead no encontrado')
      ? 'Lead no encontrado'
      : 'No se pudo actualizar'
    const status = mensaje === 'Lead no encontrado' ? 404 : 502
    return NextResponse.json({ ok: false, error: mensaje }, { status })
  }
}
