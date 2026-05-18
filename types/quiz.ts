export type PerfilId = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'
export type Temperatura = 'caliente' | 'frio'
export type Compromiso = 'alto' | 'medio' | 'bajo'
export type SecuenciaId = 'A' | 'B' | 'C'

export interface OpcionQuiz {
  id: string
  texto: string
  temperatura?: Temperatura
  esExAlumno?: boolean
  compromisoSenal?: 'alto' | 'medio' | 'bajo'
  compromiso?: Compromiso
}

export interface PreguntaQuiz {
  id: string
  tipo: 'perfil' | 'temperatura' | 'filtro-compromiso' | 'filtro-compromiso-directo'
  foto: 'ana' | 'alex'
  texto: string
  microcopy?: string
  opciones: OpcionQuiz[]
}

export interface ClasificacionResult {
  perfil: PerfilId
  temperatura: Temperatura
  compromiso: Compromiso
  secuencia: SecuenciaId
  esExAlumno: boolean
  flagAlertaCrisis: boolean
}

export interface PasoCamino {
  titulo: string
  descripcion?: string
}

export interface MasterclassGratuita {
  label: string
  titulo: string
  subtitulo: string
  caption: string
}

export interface ResultadoPerfil {
  nombre: string
  subtitulo: string
  colorHeader: string
  situacion: string
  testimonio: string
  mensaje: string
  costoInaccion: string
  visionFuturo: { noPrometemos: string; prometemos: string }
  pasosCamino: PasoCamino[]
  destinoCamino: string
  masterclassGratuita: MasterclassGratuita
  primerPaso: string
  descripcionProducto: string
  precio: string
  urlProductoKey: string
  ctaTexto: string
  etiqueta: string
  secuencia: SecuenciaId
}

export interface QuizSesion {
  completado: boolean
  perfil: PerfilId
  temperatura: Temperatura
  compromiso: Compromiso
  nombre: string
  timestamp: number
}

export interface SubmitPayload {
  nombre: string
  email: string
  perfil: PerfilId
  temperatura: Temperatura
  compromiso: Compromiso
  secuencia: SecuenciaId
  esExAlumno: boolean
  flagAlertaCrisis: boolean
  etiqueta: string
  producto: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
}
