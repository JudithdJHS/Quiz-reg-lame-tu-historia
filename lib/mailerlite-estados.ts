const API_BASE = 'https://connect.mailerlite.com/api'

function headers() {
  const apiKey = process.env.MAILERLITE_API_KEY
  if (!apiKey) throw new Error('MAILERLITE_API_KEY no configurada')
  return {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  }
}

/** Crea o actualiza el suscriptor y lo agrega a un grupo de estado */
export async function asignarEstado(
  email: string,
  groupId: string,
  fields: Record<string, string> = {}
): Promise<void> {
  const res = await fetch(`${API_BASE}/subscribers`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      email,
      fields,
      groups: [groupId],
      status: 'active',
    }),
    signal: AbortSignal.timeout(8000),
  })
  if (!res.ok) throw new Error(`MailerLite asignarEstado: ${await res.text()}`)
}

async function obtenerSubscriberId(email: string): Promise<string | null> {
  const res = await fetch(`${API_BASE}/subscribers/${encodeURIComponent(email)}`, {
    headers: headers(),
    signal: AbortSignal.timeout(8000),
  })
  if (!res.ok) return null
  const json = await res.json()
  return json?.data?.id ?? null
}

async function removerDeGrupo(subscriberId: string, groupId: string): Promise<void> {
  await fetch(`${API_BASE}/subscribers/${subscriberId}/groups/${groupId}`, {
    method: 'DELETE',
    headers: headers(),
    signal: AbortSignal.timeout(8000),
  })
}

/**
 * Regla de oro: quien paga sale de TODAS las secuencias de venta el mismo minuto.
 * Lo saca de las secuencias A/B/C del quiz y de los grupos de checkout/rescate,
 * y lo agrega a compradores.
 */
export async function marcarPagado(email: string, nombre?: string): Promise<void> {
  const grupoCompradores = process.env.MAILERLITE_GROUP_ID_COMPRADORES
  if (!grupoCompradores) throw new Error('MAILERLITE_GROUP_ID_COMPRADORES no configurada')

  await asignarEstado(email, grupoCompradores, {
    ...(nombre ? { name: nombre } : {}),
    comprador_taller: 'si',
    estado_compra: 'pagado',
  })

  const gruposDeVenta = [
    process.env.MAILERLITE_GROUP_ID_A,
    process.env.MAILERLITE_GROUP_ID_B,
    process.env.MAILERLITE_GROUP_ID_C,
    process.env.MAILERLITE_GROUP_ID_CHECKOUT_INICIADO,
    process.env.MAILERLITE_GROUP_ID_PAGO_FALLIDO,
  ].filter((g): g is string => Boolean(g))

  const subscriberId = await obtenerSubscriberId(email)
  if (!subscriberId) return

  await Promise.allSettled(gruposDeVenta.map((g) => removerDeGrupo(subscriberId, g)))
}

export async function marcarPagoFallido(email: string): Promise<void> {
  const grupo = process.env.MAILERLITE_GROUP_ID_PAGO_FALLIDO
  if (!grupo) throw new Error('MAILERLITE_GROUP_ID_PAGO_FALLIDO no configurada')
  await asignarEstado(email, grupo, { estado_compra: 'pago-fallido' })
}

export async function marcarCheckoutIniciado(
  email: string,
  nombre: string,
  whatsapp: string
): Promise<void> {
  const grupo = process.env.MAILERLITE_GROUP_ID_CHECKOUT_INICIADO
  if (!grupo) throw new Error('MAILERLITE_GROUP_ID_CHECKOUT_INICIADO no configurada')
  await asignarEstado(email, grupo, {
    name: nombre,
    phone: whatsapp,
    estado_compra: 'checkout-iniciado',
  })
}
