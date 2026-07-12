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

function base64UrlEncode(texto: string): string {
  const bytes = encoder.encode(texto)
  let binario = ''
  bytes.forEach(b => { binario += String.fromCharCode(b) })
  return btoa(binario).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function base64UrlDecode(texto: string): string {
  const rellenado = texto.replace(/-/g, '+').replace(/_/g, '/')
  const binario = atob(rellenado)
  const bytes = new Uint8Array(binario.length)
  for (let i = 0; i < binario.length; i++) bytes[i] = binario.charCodeAt(i)
  return new TextDecoder().decode(bytes)
}

/** Genera un token `expiracion.nombreB64.firma` válido por 8 horas. */
export async function crearToken(secret: string, nombre: string): Promise<string> {
  const expiracion = Date.now() + OCHO_HORAS_MS
  const nombreB64 = base64UrlEncode(nombre)
  const firma = await firmar(`${expiracion}.${nombreB64}`, secret)
  return `${expiracion}.${nombreB64}.${firma}`
}

/** Valida firma y expiración del token (sin exponer la identidad). */
export async function validarToken(token: string | undefined, secret: string): Promise<boolean> {
  return (await obtenerIdentidad(token, secret)) !== null
}

/** Valida el token y devuelve el nombre del admin autenticado, o null si no es válido. */
export async function obtenerIdentidad(token: string | undefined, secret: string): Promise<string | null> {
  if (!token) return null
  const [expStr, nombreB64, firma] = token.split('.')
  if (!expStr || !nombreB64 || !firma) return null

  const expiracion = Number(expStr)
  if (!Number.isFinite(expiracion) || Date.now() > expiracion) return null

  const firmaEsperada = await firmar(`${expStr}.${nombreB64}`, secret)
  if (firma !== firmaEsperada) return null

  try {
    return base64UrlDecode(nombreB64)
  } catch {
    return null
  }
}

function tokenDeCookie(req: Request): string | undefined {
  const cookies = req.headers.get('cookie') || ''
  const match = cookies.match(new RegExp(`(?:^|;\\s*)${ADMIN_COOKIE}=([^;]+)`))
  return match?.[1]
}

/** Para API routes: valida la cookie de la request. */
export async function sesionValida(req: Request): Promise<boolean> {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) return false
  return validarToken(tokenDeCookie(req), secret)
}

/** Para API routes: valida la cookie y devuelve el nombre del admin autenticado. */
export async function identidadSesion(req: Request): Promise<string | null> {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) return null
  return obtenerIdentidad(tokenDeCookie(req), secret)
}

export interface AdminUser {
  nombre: string
  clave: string
}

/** Parsea ADMIN_USERS con formato "Nombre:clave, Nombre2:clave2". */
export function parseAdminUsers(raw: string): AdminUser[] {
  return raw
    .split(',')
    .map(par => par.trim())
    .filter(Boolean)
    .map((par): AdminUser | null => {
      const idx = par.indexOf(':')
      if (idx === -1) return null
      const nombre = par.slice(0, idx).trim()
      const clave = par.slice(idx + 1).trim()
      return nombre && clave ? { nombre, clave } : null
    })
    .filter((u): u is AdminUser => u !== null)
}
