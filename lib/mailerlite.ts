import { SubmitPayload, SecuenciaId } from '@/types/quiz'

function getGroupId(secuencia: SecuenciaId): string {
  const map: Record<SecuenciaId, string> = {
    A: process.env.MAILERLITE_GROUP_ID_A || '',
    B: process.env.MAILERLITE_GROUP_ID_B || '',
    C: process.env.MAILERLITE_GROUP_ID_C || '',
  }
  return map[secuencia]
}

export async function registrarEnMailerLite(data: SubmitPayload): Promise<void> {
  const apiKey = process.env.MAILERLITE_API_KEY
  if (!apiKey) throw new Error('MAILERLITE_API_KEY no configurada')

  const groupId = getGroupId(data.secuencia)

  const payload = {
    email: data.email,
    fields: {
      name: data.nombre,
      perfil_rth: data.etiqueta,
      temperatura_rth: data.temperatura,
      compromiso_rth: data.compromiso,
      producto_rth: data.producto,
      secuencia_rth: data.secuencia,
    },
    groups: groupId ? [groupId] : [],
    status: 'active',
  }

  const checkRes = await fetch(
    `https://connect.mailerlite.com/api/subscribers/${encodeURIComponent(data.email)}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(8000),
    }
  )

  if (checkRes.ok) {
    await fetch(
      `https://connect.mailerlite.com/api/subscribers/${encodeURIComponent(data.email)}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8000),
      }
    )
  } else {
    await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    })
  }
}
