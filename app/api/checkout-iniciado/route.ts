import { NextRequest, NextResponse } from 'next/server'
import { crearCheckout } from '@/lib/wompi'
import { marcarCheckoutIniciado } from '@/lib/mailerlite-estados'
import { registrarEvento } from '@/lib/sheets-eventos'

/**
 * Paso 1 del checkout: la persona deja nombre + email + WhatsApp.
 * Se registra INMEDIATAMENTE como checkout-iniciado — ya existe aunque nunca pague.
 * Devuelve los parámetros firmados del widget de Wompi para el paso 2.
 */
export async function POST(req: NextRequest) {
  let body: { nombre?: string; email?: string; whatsapp?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'JSON inválido' }, { status: 400 })
  }

  const nombre = (body.nombre || '').trim()
  const email = (body.email || '').trim().toLowerCase()
  const whatsapp = (body.whatsapp || '').trim()

  if (!nombre || !email.includes('@') || !whatsapp) {
    return NextResponse.json({ ok: false, error: 'Datos incompletos' }, { status: 400 })
  }

  let checkout
  try {
    checkout = crearCheckout(email)
  } catch (error) {
    console.error('Error creando checkout Wompi:', error)
    return NextResponse.json({ ok: false, error: 'Checkout no disponible' }, { status: 500 })
  }

  // El registro no bloquea el pago: si MailerLite o Sheets fallan, la persona igual puede pagar
  await Promise.allSettled([
    marcarCheckoutIniciado(email, nombre, whatsapp),
    registrarEvento({
      evento: 'checkout-iniciado',
      nombre,
      email,
      whatsapp,
      referencia: checkout.reference,
      montoEnCentavos: checkout.amountInCents,
      moneda: checkout.currency,
    }),
  ])

  return NextResponse.json({ ok: true, checkout })
}
