import { SubmitPayload } from '@/types/quiz'
import { getSheetsClient, getSheetId, SHEETS_TIMEOUT_MS } from '@/lib/sheets-client'
import { leerEventos, type EventoLeido } from '@/lib/sheets-eventos'
import { ESTADOS_LEAD, type ActualizarLeadCampos, type EstadoLead, type LeadCRM } from '@/types/admin'

const HOJA_LEADS = 'Leads Quiz RTH'

export async function registrarEnSheets(data: SubmitPayload): Promise<void> {
  const sheets = getSheetsClient()

  const timestamp = new Date().toISOString()
  const row = [
    timestamp,
    data.nombre,
    data.email,
    data.perfil,
    data.temperatura,
    data.compromiso,
    data.producto,
    data.secuencia,
    data.esExAlumno ? 'Sí' : 'No',
    data.utmSource || '',
    data.utmMedium || '',
    data.utmCampaign || '',
  ]

  await sheets.spreadsheets.values.append(
    {
      spreadsheetId: getSheetId(),
      range: `'${HOJA_LEADS}'!A:L`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row],
      },
    },
    { timeout: SHEETS_TIMEOUT_MS }
  )
}

function esEstadoValido(valor: string): valor is EstadoLead {
  return (ESTADOS_LEAD as readonly string[]).includes(valor)
}

/**
 * Deriva el estado del embudo desde los eventos de checkout (Wompi).
 * Un pago aprobado siempre gana; si no, manda el último evento registrado.
 */
function estadoDesdeEventos(eventos: EventoLeido[]): EstadoLead | null {
  if (eventos.length === 0) return null
  if (eventos.some(e => e.evento === 'pago-aprobado')) return 'pagado'
  const ultimo = eventos[eventos.length - 1]
  if (ultimo.evento === 'pago-fallido') return 'pago-fallido'
  return 'checkout-iniciado'
}

/**
 * Lee todas las filas de la hoja de leads (A:P) y las cruza con los eventos
 * de checkout: si la columna Estado está vacía, el estado se deriva de los
 * eventos; el teléfono se toma del WhatsApp del checkout si falta en el lead.
 * El estado escrito manualmente en la columna N siempre tiene prioridad.
 */
export async function leerLeads(): Promise<LeadCRM[]> {
  const sheets = getSheetsClient()

  const [resLeads, eventos] = await Promise.all([
    sheets.spreadsheets.values.get(
      {
        spreadsheetId: getSheetId(),
        range: `'${HOJA_LEADS}'!A2:P`,
      },
      { timeout: SHEETS_TIMEOUT_MS }
    ),
    leerEventos().catch(error => {
      // El CRM sigue funcionando aunque la hoja de eventos falle
      console.error('No se pudieron leer los eventos de checkout:', error)
      return [] as EventoLeido[]
    }),
  ])

  const eventosPorEmail = new Map<string, EventoLeido[]>()
  for (const evento of eventos) {
    const lista = eventosPorEmail.get(evento.email) || []
    lista.push(evento)
    eventosPorEmail.set(evento.email, lista)
  }

  const filas = resLeads.data.values || []

  return filas
    .map((fila, i): LeadCRM => {
      const email = (fila[2] || '').trim().toLowerCase()
      const estadoManual = (fila[13] || '').trim()
      const eventosDelLead = eventosPorEmail.get(email) || []

      const estado = esEstadoValido(estadoManual)
        ? estadoManual
        : estadoDesdeEventos(eventosDelLead) ?? 'lead'

      const telefonoEvento = eventosDelLead.find(e => e.whatsapp)?.whatsapp || ''

      return {
        fila: i + 2,
        timestamp: fila[0] || '',
        nombre: fila[1] || '',
        email,
        perfil: fila[3] || '',
        temperatura: fila[4] || '',
        compromiso: fila[5] || '',
        producto: fila[6] || '',
        secuencia: fila[7] || '',
        exAlumno: fila[8] || '',
        utmSource: fila[9] || '',
        utmMedium: fila[10] || '',
        utmCampaign: fila[11] || '',
        telefono: fila[12] || telefonoEvento,
        estado,
        ultimaGestion: fila[14] || '',
        notas: fila[15] || '',
      }
    })
    .filter(lead => lead.email !== '')
}

/**
 * Actualiza Estado / UltimaGestion / Notas de la fila que coincide por email.
 * Solo escribe las columnas M:P — nunca sobreescribe la fila completa.
 * Las notas nuevas se concatenan con fecha, sin borrar las previas.
 */
export async function actualizarLead(email: string, campos: ActualizarLeadCampos): Promise<LeadCRM> {
  const sheets = getSheetsClient()
  const emailNormalizado = email.trim().toLowerCase()

  const leads = await leerLeads()
  const lead = leads.find(l => l.email === emailNormalizado)
  if (!lead) {
    throw new Error(`Lead no encontrado: ${email}`)
  }

  const ahora = new Date().toISOString()

  const nuevoEstado = campos.estado ?? lead.estado
  const nuevaGestion = campos.registrarGestion ? ahora : lead.ultimaGestion

  let nuevasNotas = lead.notas
  if (campos.nota && campos.nota.trim()) {
    const fecha = ahora.slice(0, 10)
    const linea = `[${fecha}] ${campos.nota.trim()}`
    nuevasNotas = nuevasNotas ? `${nuevasNotas}\n${linea}` : linea
  }

  await sheets.spreadsheets.values.update(
    {
      spreadsheetId: getSheetId(),
      range: `'${HOJA_LEADS}'!M${lead.fila}:P${lead.fila}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[lead.telefono, nuevoEstado, nuevaGestion, nuevasNotas]],
      },
    },
    { timeout: SHEETS_TIMEOUT_MS }
  )

  return {
    ...lead,
    estado: nuevoEstado,
    ultimaGestion: nuevaGestion,
    notas: nuevasNotas,
  }
}
