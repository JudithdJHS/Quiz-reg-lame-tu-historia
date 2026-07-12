import { NextRequest, NextResponse } from 'next/server'
import { verificarEventoWompi, emailDesdeReferencia } from '@/lib/wompi'
import { marcarPagado, marcarPagoFallido } from '@/lib/mailerlite-estados'
import { registrarEvento } from '@/lib/sheets-eventos'
import { enviarEmailAcceso, enviarEmailReintento } from '@/lib/emails-transaccionales'

interface TransaccionWompi {
  id?: string
  status?: string
  reference?: string
  amount_in_cents?: number
  currency?: string
  payment_method_type?: string
  customer_email?: string
  customer_data?: { full_name?: string }
}

/**
 * Webhook de Wompi — fuente de verdad de cada pago.
 * APPROVED  → compradores, fuera de toda secuencia de venta, email de acceso a Skool.
 * DECLINED/ERROR → pago-fallido, email inmediato de reintento con métodos alternativos.
 */
export async function POST(req: NextRequest) {
  let body: {
    event?: string
    timestamp?: number
    data?: { transaction?: TransaccionWompi }
    signature?: { properties?: string[]; checksum?: string }
  }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  try {
    if (!verificarEventoWompi(body)) {
      console.error('Wompi webhook: checksum inválido')
      return NextResponse.json({ error: 'Firma inválida' }, { status: 401 })
    }
  } catch (error) {
    console.error('Wompi webhook: no se pudo verificar la firma', error)
    return NextResponse.json({ error: 'Configuración incompleta' }, { status: 500 })
  }

  const tx = body.data?.transaction
  if (!tx?.status || !tx.reference) {
    // Evento que no es de transacción — responder 200 para que Wompi no reintente
    return NextResponse.json({ ok: true, ignorado: true })
  }

  const email = (tx.customer_email || emailDesdeReferencia(tx.reference) || '').toLowerCase()
  const nombre = tx.customer_data?.full_name

  if (!email.includes('@')) {
    console.error('Wompi webhook: sin email en la transacción', tx.reference)
    return NextResponse.json({ ok: true, ignorado: true })
  }

  const filaBase = {
    nombre,
    email,
    referencia: tx.reference,
    montoEnCentavos: tx.amount_in_cents,
    moneda: tx.currency,
    transaccionId: tx.id,
    metodoPago: tx.payment_method_type,
  }

  if (tx.status === 'APPROVED') {
    const resultados = await Promise.allSettled([
      marcarPagado(email, nombre),
      registrarEvento({ evento: 'pago-aprobado', ...filaBase }),
      enviarEmailAcceso(email, nombre),
    ])
    resultados.forEach((r) => {
      if (r.status === 'rejected') console.error('Wompi APPROVED — acción falló:', r.reason)
    })
  } else if (tx.status === 'DECLINED' || tx.status === 'ERROR') {
    const resultados = await Promise.allSettled([
      marcarPagoFallido(email),
      registrarEvento({ evento: 'pago-fallido', ...filaBase }),
      enviarEmailReintento(email, nombre),
    ])
    resultados.forEach((r) => {
      if (r.status === 'rejected') console.error('Wompi DECLINED — acción falló:', r.reason)
    })
  } else if (tx.status === 'VOIDED') {
    // Pago anulado/reembolsado — mismo tratamiento que un pago fallido (no quedó cobrado)
    const resultados = await Promise.allSettled([
      marcarPagoFallido(email),
      registrarEvento({ evento: 'pago-fallido', ...filaBase }),
    ])
    resultados.forEach((r) => {
      if (r.status === 'rejected') console.error('Wompi VOIDED — acción falló:', r.reason)
    })
  } else {
    // PENDING u otros estados no finales — solo registrar
    await Promise.allSettled([registrarEvento({ evento: 'pago-pendiente', ...filaBase })])
  }

  return NextResponse.json({ ok: true })
}
