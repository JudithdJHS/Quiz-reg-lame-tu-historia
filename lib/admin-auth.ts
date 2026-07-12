// Sesión admin con cookie httpOnly firmada (HMAC-SHA256).
// Usa Web Crypto para funcionar tanto en Edge (middleware) como en Node (API routes).

export const ADMIN_COOKIE = 'rth_admin_session'

const OCHO_HORAS_MS = 8 * 60 * 60 * 1000
export const SESION_MAX_AGE_SEGUNDOS = OCHO_HORAS_MS / 1000

const encoder = new TextEncoder()

async function firmar(datos: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const firma = await crypto.subtle.sign('HMAC', key, encoder.encode(datos))
  return Array.from(new Uint8Array(firma))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

/** Genera un token `expiracion.firma` válido por 8 horas. */
export async function crearToken(secret: string): Promise<string> {
  const expiracion = Date.now() + OCHO_HORAS_MS
  const firma = await firmar(String(expiracion), secret)
  return `${expiracion}.${firma}`
}

/** Valida firma y expiración del token. */
export async function validarToken(token: string | undefined, secret: string): Promise<boolean> {
  if (!token) return false
  const [expStr, firma] = token.split('.')
  if (!expStr || !firma) return false

  const expiracion = Number(expStr)
  if (!Number.isFinite(expiracion) || Date.now() > expiracion) return false

  const firmaEsperada = await firmar(expStr, secret)
  return firma === firmaEsperada
}

/** Para API routes: valida la cookie de la request. */
export async function sesionValida(req: Request): Promise<boolean> {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) return false

  const cookies = req.headers.get('cookie') || ''
  const match = cookies.match(new RegExp(`(?:^|;\\s*)${ADMIN_COOKIE}=([^;]+)`))
  return validarToken(match?.[1], secret)
}
