import { google } from 'googleapis'
import { SubmitPayload } from '@/types/quiz'

export async function registrarEnSheets(data: SubmitPayload): Promise<void> {
  const sheetId = process.env.GOOGLE_SHEETS_ID
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')

  if (!sheetId || !email || !privateKey) {
    throw new Error('Google Sheets env vars no configuradas')
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: email,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const sheets = google.sheets({ version: 'v4', auth })

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

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: 'Leads Quiz RTH!A:L',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [row],
    },
  })
}
