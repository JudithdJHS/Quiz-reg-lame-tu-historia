/** Pago aprobado → dispara el Zap que envía la invitación de Skool con el curso del taller ya desbloqueado */
export async function invitarASkool(email: string, nombre?: string): Promise<void> {
  const url = process.env.ZAPIER_SKOOL_INVITE_WEBHOOK_URL
  if (!url) throw new Error('ZAPIER_SKOOL_INVITE_WEBHOOK_URL no configurada')

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, nombre: nombre || '' }),
    signal: AbortSignal.timeout(8000),
  })

  if (!res.ok) throw new Error(`Zapier Skool invite error: ${await res.text()}`)
}
