import { ClasificacionResult, PerfilId, Compromiso, SecuenciaId } from '@/types/quiz'

export function clasificar(respuestas: Record<string, string>): ClasificacionResult {
  const preguntasPerfil = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q11', 'q12']
  const conteo: Record<string, number> = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0, H: 0 }
  preguntasPerfil.forEach(q => {
    if (respuestas[q]) conteo[respuestas[q]]++
  })

  const temperatura = ['A', 'D'].includes(respuestas.q8) ? 'caliente' : 'frio'
  const esExAlumno = respuestas.q8 === 'D'

  let compromiso: Compromiso = 'medio'
  if (['A', 'B'].includes(respuestas.q10)) compromiso = 'alto'
  else if (respuestas.q10 === 'C') compromiso = 'medio'
  else if (respuestas.q10 === 'D') compromiso = 'bajo'
  if (respuestas.q9 === 'D' && ['C', 'D'].includes(respuestas.q10)) compromiso = 'bajo'

  const maxConteo = Math.max(...Object.values(conteo))
  const candidatos = Object.keys(conteo).filter(k => conteo[k] === maxConteo)
  const perfil = candidatos.length === 1
    ? candidatos[0]
    : resolverEmpate(candidatos, respuestas)

  const secuencia: SecuenciaId = ['A', 'B', 'C'].includes(perfil) ? 'A'
    : ['D', 'E', 'G'].includes(perfil) ? 'B' : 'C'

  return {
    perfil: perfil as PerfilId,
    temperatura,
    compromiso,
    secuencia,
    esExAlumno,
    flagAlertaCrisis: perfil === 'C' && compromiso === 'alto',
  }
}

function resolverEmpate(candidatos: string[], respuestas: Record<string, string>): string {
  if (candidatos.includes('C') && candidatos.includes('A'))
    return respuestas.q2 === 'C' ? 'C' : 'A'
  if (candidatos.includes('A') && candidatos.includes('B')) return 'B'
  if (candidatos.includes('D') && candidatos.includes('H')) return 'H'
  if (candidatos.includes('E') && candidatos.includes('A')) return 'A'
  if (candidatos.includes('F') && candidatos.includes('G')) return 'F'
  const prioridad = ['C', 'A', 'B', 'E', 'D', 'F', 'G', 'H']
  return prioridad.find(p => candidatos.includes(p)) || candidatos[0]
}
