export function diasDesde(fechaIso: string): number | null {
  if (!fechaIso) return null
  const fecha = new Date(fechaIso).getTime()
  if (!Number.isFinite(fecha)) return null
  return Math.floor((Date.now() - fecha) / 86400000)
}

const REGEX_GESTION = /\[(\d{4}-\d{2}-\d{2})\]\s*\(([^)]+)\)/g

export interface GestionAdmin {
  total: number
  ultima: string
}

/** Cuenta gestiones por admin a partir de las notas firmadas ("[fecha] (Nombre) ..."). */
export function parseGestionesPorAdmin(notasPorLead: string[]): Map<string, GestionAdmin> {
  const stats = new Map<string, GestionAdmin>()
  for (const notas of notasPorLead) {
    if (!notas) continue
    for (const [, fecha, admin] of Array.from(notas.matchAll(REGEX_GESTION))) {
      const actual = stats.get(admin) ?? { total: 0, ultima: '' }
      actual.total += 1
      if (fecha > actual.ultima) actual.ultima = fecha
      stats.set(admin, actual)
    }
  }
  return stats
}
