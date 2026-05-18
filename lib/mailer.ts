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
      from: 'Ana y Alex · RTH <onboarding@resend.dev>',
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

export async function enviarConfirmacionUsuario(data: SubmitPayload): Promise<void> {
  await sendEmail(
    data.email,
    'Tu camino a la restauración — Regálame tu Historia',
    `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #F5EDE0; padding: 40px;">
      <p style="color: #6B783E; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 24px;">Regálame tu Historia · Ana y Alex</p>
      <h1 style="font-family: Georgia, serif; color: #3D3520; font-size: 28px; margin: 0 0 8px;">Tu camino a la restauración</h1>
      <p style="color: #C49E50; font-style: italic; font-size: 18px; margin: 0 0 32px;">está listo, ${data.nombre}.</p>
      <p style="color: #3D3520; line-height: 1.8; margin: 0 0 16px;">Gracias por responder con honestidad.</p>
      <p style="color: #3D3520; line-height: 1.8; margin: 0 0 16px;">Eso no es poco. Muchas personas llegan hasta la primera pregunta y cierran la pestaña. Tú llegaste hasta el final — y eso ya dice algo de ti.</p>
      <p style="color: #3D3520; line-height: 1.8; margin: 0 0 32px;">Lo que vimos en tus respuestas no nos sorprendió. Lo hemos escuchado antes — en cientos de historias que empezaron exactamente donde está la tuya hoy.</p>
      <div style="background: #EDE3D5; border-left: 3px solid #C49E50; padding: 20px 24px; margin: 0 0 32px;">
        <p style="color: #3D3520; font-style: italic; font-family: Georgia, serif; font-size: 17px; margin: 0; line-height: 1.7;">"La persona que dio el primer paso no esperó a que las condiciones fueran perfectas. Simplemente decidió que ya era suficiente seguir igual."</p>
      </div>
      <p style="color: #3D3520; line-height: 1.8; margin: 0 0 32px;">No hay prisa. Pero sí hay un primer paso que está esperándote.</p>
      <div style="text-align: center; margin: 0 0 40px;">
        <a href="https://www.regalametuhistoria.com/?utm_source=quiz&utm_medium=email&utm_content=confirmacion" style="background: #6B783E; color: #FDFAF6; text-decoration: none; padding: 16px 32px; font-family: Arial, sans-serif; font-size: 15px; font-weight: bold; display: inline-block; border-radius: 2px;">Ver mi camino a la restauración →</a>
      </div>
      <p style="color: #8A7E6E; font-size: 13px; line-height: 1.8; margin: 0;">Con cariño,<br><strong style="color: #3D3520;">Ana y Alex</strong></p>
      <p style="color: #8A7E6E; font-size: 12px; margin: 24px 0 0; line-height: 1.7;">P.D. Si tienes una pregunta sobre tu situación específica, puedes escribirnos a <a href="mailto:regalametuhistoria@gmail.com" style="color: #6B783E;">regalametuhistoria@gmail.com</a> — leemos cada mensaje.</p>
    </div>
    `
  )
}

export async function enviarAlertaCrisis(data: SubmitPayload): Promise<void> {
  const recipient = process.env.ALERT_EMAIL_RECIPIENT || 'regalametuhistoria@gmail.com'
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
