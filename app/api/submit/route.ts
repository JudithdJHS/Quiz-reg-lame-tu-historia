import { NextRequest, NextResponse } from 'next/server'
import { clasificar } from '@/lib/clasificador'
import { registrarEnMailerLite } from '@/lib/mailerlite'
import { registrarEnSheets } from '@/lib/sheets'
import { enviarAlertaCrisis, enviarConfirmacionUsuario } from '@/lib/mailer'
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
      producto: resultado.primerPaso,
      utmSource,
      utmMedium,
      utmCampaign,
    }

    await Promise.allSettled([
      enviarConfirmacionUsuario(payload),
      registrarEnMailerLite(payload),
      registrarEnSheets(payload),
      ...(payload.flagAlertaCrisis ? [enviarAlertaCrisis(payload)] : []),
    ])

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: true })
  }
}
