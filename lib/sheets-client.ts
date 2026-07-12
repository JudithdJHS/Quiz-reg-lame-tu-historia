import { google, sheets_v4 } from 'googleapis'

export const SHEETS_TIMEOUT_MS = 8000

export function getSheetsClient(): sheets_v4.Sheets {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')

  if (!email || !privateKey) {
    throw new Error('Google Sheets env vars no configuradas')
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: email,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  return google.sheets({ version: 'v4', auth })
}

export function getSheetId(): string {
  const sheetId = process.env.GOOGLE_SHEETS_ID
  if (!sheetId) throw new Error('GOOGLE_SHEETS_ID no configurada')
  return sheetId
}
