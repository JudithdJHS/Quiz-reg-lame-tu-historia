async function enviarConResend(to: string, subject: string, html: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY no configurada')

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Ana y Alex · RTH <hola@regalametuhistoria.com>',
      to,
      subject,
      html,
    }),
    signal: AbortSignal.timeout(8000),
  })

  if (!res.ok) throw new Error(`Resend error: ${await res.text()}`)
}

const ESTILO_BASE = 'font-family: Georgia, serif; max-width: 560px; margin: 0 auto; background: #F5EDE0; padding: 32px; border-radius: 8px; color: #3D3520;'
const ESTILO_BOTON = 'display: inline-block; background: #6B783E; color: #FDFAF6; padding: 16px 36px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 16px;'

/** Pago aprobado → acceso al grupo Skool del taller */
export async function enviarEmailAcceso(email: string, nombre?: string): Promise<void> {
  const urlSkool = process.env.URL_SKOOL_TALLER || 'https://www.skool.com'
  const saludo = nombre ? `${nombre}, tu` : 'Tu'

  await enviarConResend(
    email,
    'Tu lugar en el taller está confirmado 🌿',
    `
    <div style="${ESTILO_BASE}">
      <h2 style="color: #6B783E; font-style: italic;">${saludo} pago fue confirmado.</h2>
      <p style="line-height: 1.7;">Bienvenido/a al taller <strong>Del Infierno al Cielo en el Matrimonio</strong>. Diste un paso que muchas personas posponen durante años — y lo diste hoy.</p>
      <p style="line-height: 1.7;"><strong>Tu siguiente paso:</strong></p>
      <ol style="line-height: 1.9;">
        <li>En unos minutos te llega un correo aparte, directo de Skool, con tu acceso al taller ya desbloqueado — sin que tengas que pedir nada.</li>
        <li>Ábrelo y entra con este mismo correo: <strong>${email}</strong></li>
      </ol>
      <p style="text-align: center; margin: 32px 0;">
        <a href="${urlSkool}" style="${ESTILO_BOTON}">Entrar al taller →</a>
      </p>
      <p style="line-height: 1.7; font-size: 14px; color: #BD886A;">Si algo no funciona, responde este correo y te ayudamos personalmente.<br>— Ana y Alex</p>
    </div>
    `
  )
}

/** Pago fallido → link para reintentar + métodos alternativos */
export async function enviarEmailReintento(email: string, nombre?: string): Promise<void> {
  const urlComprar = `${process.env.NEXT_PUBLIC_APP_URL || 'https://quiz.regalametuhistoria.com'}/comprar`
  const saludo = nombre ? `Hola ${nombre},` : 'Hola,'

  await enviarConResend(
    email,
    'Tu pago no pasó — pero tiene solución fácil',
    `
    <div style="${ESTILO_BASE}">
      <p style="line-height: 1.7;">${saludo}</p>
      <p style="line-height: 1.7;">Intentaste inscribirte al taller <strong>Del Infierno al Cielo en el Matrimonio</strong> y tu pago no fue aprobado. Esto pasa más seguido de lo que crees — y casi siempre es un detalle del banco, no tuyo.</p>
      <p style="line-height: 1.7;"><strong>Puedes reintentar con cualquiera de estas opciones:</strong></p>
      <ul style="line-height: 1.9;">
        <li>💳 Tarjeta de crédito — en cuotas de 1 a 36 meses (las difiere tu banco)</li>
        <li>🏦 PSE — débito directo desde tu cuenta bancaria</li>
        <li>📱 Nequi — desde tu celular</li>
        <li>🗓️ "Compra y Paga Después" de Bancolombia — 4 cuotas sin interés, sin tarjeta</li>
      </ul>
      <p style="text-align: center; margin: 32px 0;">
        <a href="${urlComprar}" style="${ESTILO_BOTON}">Reintentar mi inscripción →</a>
      </p>
      <p style="line-height: 1.7; font-size: 14px; color: #BD886A;">Si el pago sigue sin pasar, responde este correo y buscamos juntos la forma.<br>— Ana y Alex</p>
    </div>
    `
  )
}
