import { SubmitPayload } from '@/types/quiz'

const BASE = 'https://services.leadconnectorhq.com'
const API_VERSION = '2021-07-28'

function construirHeaders(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    Version: API_VERSION,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
}

export async function registrarEnGHL(data: SubmitPayload): Promise<void> {
  const token = process.env.GHL_PIT_TOKEN
  const locationId = process.env.GHL_LOCATION_ID
  if (!token) throw new Error('GHL_PIT_TOKEN no configurada')
  if (!locationId) throw new Error('GHL_LOCATION_ID no configurada')

  const partes = data.nombre.trim().split(/\s+/)
  const firstName = partes[0]
  const lastName = partes.slice(1).join(' ')

  const tags = [
    'quiz-completado',
    data.etiqueta,
    `secuencia-${data.secuencia.toLowerCase()}`,
    ...(data.flagAlertaCrisis ? ['alerta-crisis'] : []),
  ]

  const payload = {
    locationId,
    email: data.email,
    firstName,
    ...(lastName ? { lastName } : {}),
    source: 'Quiz diagnostico RTH',
    tags,
    customFields: [
      { key: 'perfil_rth', field_value: data.etiqueta },
      { key: 'perfil_nombre', field_value: data.nombrePerfil },
      { key: 'secuencia_rth', field_value: data.secuencia },
      { key: 'temperatura_rth', field_value: data.temperatura },
      { key: 'compromiso_rth', field_value: data.compromiso },
      { key: 'ex_alumno_rth', field_value: data.esExAlumno ? 'si' : 'no' },
    ],
  }

  const res = await fetch(`${BASE}/contacts/upsert`, {
    method: 'POST',
    headers: construirHeaders(token),
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(8000),
  })

  if (!res.ok) {
    const detalle = await res.text()
    throw new Error(`GHL upsert fallo (${res.status}): ${detalle.slice(0, 200)}`)
  }
}
