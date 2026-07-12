export const ESTADOS_LEAD = [
  'lead',
  'checkout-iniciado',
  'pago-fallido',
  'abandonado',
  'pagado',
  'alumno',
  'miembro',
] as const

export type EstadoLead = (typeof ESTADOS_LEAD)[number]

export interface LeadCRM {
  fila: number
  timestamp: string
  nombre: string
  email: string
  perfil: string
  temperatura: string
  compromiso: string
  producto: string
  secuencia: string
  exAlumno: string
  utmSource: string
  utmMedium: string
  utmCampaign: string
  telefono: string
  estado: EstadoLead
  ultimaGestion: string
  notas: string
}

export interface ActualizarLeadCampos {
  estado?: EstadoLead
  nota?: string
  registrarGestion?: boolean
}
