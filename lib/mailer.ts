import nodemailer from 'nodemailer'
import { SubmitPayload } from '@/types/quiz'

export async function enviarAlertaCrisis(data: SubmitPayload): Promise<void> {
  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD
  const recipient = process.env.ALERT_EMAIL_RECIPIENT || 'regalametuhistoria@gmail.com'

  if (!user || !pass) throw new Error('Gmail env vars no configuradas')

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  })

  const fecha = new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })

  await transporter.sendMail({
    from: `"RTH Quiz" <${user}>`,
    to: recipient,
    subject: '🚨 Lead prioritario — Perfil C (Crisis Aguda) · RTH Quiz',
    html: `
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
    `,
  })
}
