import { NextRequest, NextResponse } from 'next/server'
import { clasificar } from '@/lib/clasificador'
import { registrarEnGHL } from '@/lib/gohighlevel'
import { registrarEnSheets } from '@/lib/sheets'
import { enviarAlertaCrisis } from '@/lib/mailer'
import { RESULTADOS } from '@/lib/resultados-data'
import { SubmitPayload } from '@/types/quiz'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nombre, email, respuestas, utmSource, utmMedium, utmCampaign } = body

    if (!nombre || !email || !respuestas) {
      return NextResponse.json({ ok: false, error: 'Datos incompletos' }, { status: 400 })
    }

    const clasificacion = clasificar(respuestas)
    const resultado = RESULTADOS[clasificacion.perfil]

    const payload: SubmitPayload = {
      nombre,
      email,
      perfil: clasificacion.perfil,
      temperatura: clasificacion.temperatura,
      compromiso: clasificacion.compromiso,
      secuencia: clasificacion.secuencia,
      esExAlumno: clasificacion.esExAlumno,
      flagAlertaCrisis: clasificacion.flagAlertaCrisis,
      etiqueta: resultado.etiqueta,
      nombrePerfil: resultado.nombre,
      producto: resultado.primerPaso,
      utmSource,
      utmMedium,
      utmCampaign,
    }

    const destinos = ['GoHighLevel', 'Google Sheets']
    if (payload.flagAlertaCrisis) destinos.push('Alerta de crisis')

    const resultados = await Promise.allSettled([
      registrarEnGHL(payload),
      registrarEnSheets(payload),
      ...(payload.flagAlertaCrisis ? [enviarAlertaCrisis(payload)] : []),
    ])

    // Nunca fallar en silencio: un lead perdido sin rastro es peor que un error visible.
    resultados.forEach((r, i) => {
      if (r.status === 'rejected') {
        console.error(`[submit] ${destinos[i]} fallo para ${payload.email}:`, r.reason)
      }
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[submit] error inesperado:', error)
    return NextResponse.json({ ok: true })
  }
}
