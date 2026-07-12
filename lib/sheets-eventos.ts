import { getSheetsClient, getSheetId, SHEETS_TIMEOUT_MS } from '@/lib/sheets-client'

export type EventoCheckout =
  | 'checkout-iniciado'
  | 'pago-aprobado'
  | 'pago-fallido'
  | 'pago-pendiente'

export interface FilaEvento {
  evento: EventoCheckout
  nombre?: string
  email: string
  whatsapp?: string
  referencia?: string
  montoEnCentavos?: number
  moneda?: string
  transaccionId?: string
  metodoPago?: string
}

export interface EventoLeido {
  timestamp: string
  evento: EventoCheckout
  nombre: string
  email: string
  whatsapp: string
}

const HOJA_EVENTOS = 'Eventos Checkout RTH'

/**
 * Registro maestro del embudo de compra.
 * Hoja 'Eventos Checkout RTH' — cada evento es una fila nueva, nunca se sobreescribe.
 */
export async function registrarEvento(fila: FilaEvento): Promise<void> {
  const sheets = getSheetsClient()

  const monto =
    fila.montoEnCentavos !== undefined ? (fila.montoEnCentavos / 100).toFixed(2) : ''

  await sheets.spreadsheets.values.append(
    {
      spreadsheetId: getSheetId(),
      range: `'${HOJA_EVENTOS}'!A:J`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          new Date().toISOString(),
          fila.evento,
          fila.nombre || '',
          fila.email,
          fila.whatsapp || '',
          fila.referencia || '',
          monto,
          fila.moneda || '',
          fila.transaccionId || '',
          fila.metodoPago || '',
        ]],
      },
    },
    { timeout: SHEETS_TIMEOUT_MS }
  )
}

const EVENTOS_VALIDOS: readonly string[] = [
  'checkout-iniciado',
  'pago-aprobado',
  'pago-fallido',
  'pago-pendiente',
]

/** Lee todos los eventos del embudo de compra (para derivar estado en el CRM). */
export async function leerEventos(): Promise<EventoLeido[]> {
  const sheets = getSheetsClient()

  const res = await sheets.spreadsheets.values.get(
    {
      spreadsheetId: getSheetId(),
      range: `'${HOJA_EVENTOS}'!A2:E`,
    },
    { timeout: SHEETS_TIMEOUT_MS }
  )

  const filas = res.data.values || []

  return filas
    .filter(fila => EVENTOS_VALIDOS.includes(fila[1]) && (fila[3] || '').includes('@'))
    .map((fila): EventoLeido => ({
      timestamp: fila[0] || '',
      evento: fila[1] as EventoCheckout,
      nombre: fila[2] || '',
      email: (fila[3] || '').trim().toLowerCase(),
      whatsapp: fila[4] || '',
    }))
}
