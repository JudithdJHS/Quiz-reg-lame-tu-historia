import { SubmitPayload } from '@/types/quiz'

async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY no configurada')

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Ana y Alex · RTH <hola@regalametuhistoria.com>',
      to,
      subject,
      html,
    }),
  })

  if (!res.ok) {
    const error = await res.text()
    throw new Error(`Resend error: ${error}`)
  }
}

export async function enviarAlertaCrisis(data: SubmitPayload): Promise<void> {
  const recipient = process.env.ALERT_EMAIL_RECIPIENT || 'hola@regalametuhistoria.com'
  const fecha = new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })
  await sendEmail(
    recipient,
    '🚨 Lead prioritario — Perfil C (Crisis Aguda) · RTH Quiz',
    `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #BD886A;">🚨 Lead prioritario — Acción requerida en menos de 24h</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; font-weight: bold;">Nombre:</td><td style="padding: 8px;">${data.nombre}</td></tr>
        <tr style="background: #f9f9f9;"><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${data.email}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Perfil:</td><td style="padding: 8px;">C — Crisis Aguda</td></tr>
        <tr style="background: #f9f9f9;"><td style="padding: 8px; font-weight: bold;">Compromiso:</td><td style="padding: 8px;">ALTO</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Fecha:</td><td style="padding: 8px;">${fecha}</td></tr>
      </table>
      <p style="margin-top: 24px; padding: 16px; background: #FAECE7; border-left: 4px solid #BD886A; border-radius: 4px;">
        <strong>Este lead requiere contacto personal en menos de 24h.</strong><br>
        Está viviendo una crisis aguda y ha declarado un compromiso alto de cambio.
      </p>
    </div>
    `
  )
}
