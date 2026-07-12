import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  // Verificar secreto del webhook
  const secret = req.headers.get('x-webhook-secret')
  if (process.env.SKOOL_WEBHOOK_SECRET && secret !== process.env.SKOOL_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  // Skool puede enviar el email en distintas ubicaciones según el evento
  const data = (body?.data ?? body?.member ?? body) as Record<string, unknown>
  const email = (data?.email ?? data?.email_address ?? '') as string
  const nombre = (data?.name ?? data?.full_name ?? '') as string

  if (!email || !email.includes('@')) {
    console.error('Skool webhook: email no encontrado en payload', JSON.stringify(body))
    return NextResponse.json({ error: 'Email no encontrado' }, { status: 400 })
  }

  try {
    await marcarCompradorEnMailerLite(email, nombre)
    console.log(`Comprador marcado en MailerLite: ${email}`)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error procesando webhook de Skool:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}

async function marcarCompradorEnMailerLite(email: string, nombre: string): Promise<void> {
  const apiKey = process.env.MAILERLITE_API_KEY
  if (!apiKey) throw new Error('MAILERLITE_API_KEY no configurada')

  const groupId = process.env.MAILERLITE_GROUP_ID_COMPRADORES
  if (!groupId) throw new Error('MAILERLITE_GROUP_ID_COMPRADORES no configurada')

  // 3 intentos × 2.5s timeout + 500ms + 1s espera = ~9.5s máximo (Vercel Hobby: 10s)
  const MAX_INTENTOS = 3
  const TIMEOUT_MS = 2500
  const ESPERAS_MS = [500, 1000]

  for (let intento = 1; intento <= MAX_INTENTOS; intento++) {
    const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        fields: {
          ...(nombre && { name: nombre }),
          comprador_taller: 'si',
        },
        groups: [groupId],
        status: 'active',
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })

    if (res.ok) return

    const errorTexto = await res.text()

    if (intento === MAX_INTENTOS) {
      throw new Error(`MailerLite error después de ${MAX_INTENTOS} intentos: ${errorTexto}`)
    }

    await new Promise(resolve => setTimeout(resolve, ESPERAS_MS[intento - 1]))
  }
}
