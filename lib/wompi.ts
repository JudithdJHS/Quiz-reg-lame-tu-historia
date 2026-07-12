import { createHash } from 'crypto'

export interface WompiCheckoutParams {
  publicKey: string
  currency: string
  amountInCents: number
  reference: string
  signatureIntegrity: string
}

/** La referencia lleva el email codificado — así el webhook sabe a quién pertenece cada transacción */
export function generarReferencia(email: string): string {
  const emailB64 = Buffer.from(email.toLowerCase().trim()).toString('base64url')
  return `RTH-TALLER-${Date.now()}-${emailB64}`
}

export function emailDesdeReferencia(reference: string): string | null {
  const partes = reference.split('-')
  if (partes.length < 4) return null
  try {
    const email = Buffer.from(partes.slice(3).join('-'), 'base64url').toString('utf8')
    return email.includes('@') ? email : null
  } catch {
    return null
  }
}

/** Firma de integridad del widget: SHA256(referencia + monto + moneda + secreto) */
export function firmarIntegridad(reference: string, amountInCents: number, currency: string): string {
  const secret = process.env.WOMPI_INTEGRITY_SECRET
  if (!secret) throw new Error('WOMPI_INTEGRITY_SECRET no configurada')
  return createHash('sha256')
    .update(`${reference}${amountInCents}${currency}${secret}`)
    .digest('hex')
}

export function crearCheckout(email: string): WompiCheckoutParams {
  const publicKey = process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY
  const amountInCents = Number(process.env.WOMPI_AMOUNT_IN_CENTS)
  const currency = process.env.WOMPI_CURRENCY || 'COP'
  if (!publicKey) throw new Error('NEXT_PUBLIC_WOMPI_PUBLIC_KEY no configurada')
  if (!amountInCents || Number.isNaN(amountInCents)) throw new Error('WOMPI_AMOUNT_IN_CENTS no configurada')

  const reference = generarReferencia(email)
  return {
    publicKey,
    currency,
    amountInCents,
    reference,
    signatureIntegrity: firmarIntegridad(reference, amountInCents, currency),
  }
}

/** Verifica el checksum de un evento de Wompi (webhooks como fuente de verdad) */
export function verificarEventoWompi(body: {
  timestamp?: number
  data?: Record<string, unknown>
  signature?: { properties?: string[]; checksum?: string }
}): boolean {
  const secret = process.env.WOMPI_EVENTS_SECRET
  if (!secret) throw new Error('WOMPI_EVENTS_SECRET no configurada')
  const checksum = body.signature?.checksum
  const properties = body.signature?.properties
  if (!checksum || !properties || body.timestamp === undefined) return false

  const valores = properties.map((prop) => {
    let actual: unknown = body.data
    for (const key of prop.split('.')) {
      actual = (actual as Record<string, unknown> | undefined)?.[key]
    }
    return String(actual ?? '')
  })

  const calculado = createHash('sha256')
    .update(`${valores.join('')}${body.timestamp}${secret}`)
    .digest('hex')

  return calculado.toLowerCase() === checksum.toLowerCase()
}
