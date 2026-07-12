import { NextResponse } from 'next/server'
import { leerLeads } from '@/lib/sheets'
import { sesionValida } from '@/lib/admin-auth'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  if (!(await sesionValida(req))) {
    return NextResponse.json({ ok: false, error: 'No autorizado' }, { status: 401 })
  }

  try {
    const leads = await leerLeads()
    return NextResponse.json({ ok: true, leads })
  } catch (error) {
    console.error('Error leyendo leads de Sheets:', error)
    return NextResponse.json({ ok: false, error: 'No se pudo cargar' }, { status: 502 })
  }
}
