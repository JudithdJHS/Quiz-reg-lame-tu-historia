'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ESTADOS_LEAD, type EstadoLead, type LeadCRM } from '@/types/admin'

const NOMBRES_ESTADO: Record<EstadoLead, string> = {
  'lead': 'Leads',
  'checkout-iniciado': 'Checkout iniciado',
  'pago-fallido': 'Pago fallido',
  'abandonado': 'Abandonado',
  'pagado': 'Pagado',
  'alumno': 'Alumno',
  'miembro': 'Miembro',
}

function mensajeWhatsApp(estado: EstadoLead, nombre: string): string {
  const primerNombre = nombre.split(' ')[0] || nombre
  switch (estado) {
    case 'checkout-iniciado':
    case 'abandonado':
      return `Hola ${primerNombre}, soy del equipo de Regálame tu Historia. Vimos que empezaste tu inscripción al taller y queremos ayudarte a completarla. ¿Tienes alguna duda que podamos resolver?`
    case 'pago-fallido':
      return `Hola ${primerNombre}, soy del equipo de Regálame tu Historia. Tu pago no pudo procesarse — a veces pasa con las tarjetas. Hay otros métodos (PSE, Nequi, cuotas sin tarjeta). ¿Te ayudo a completarlo?`
    case 'pagado':
    case 'alumno':
    case 'miembro':
      return `Hola ${primerNombre}, ¡bienvenido/a al taller! Tu acceso a la comunidad ya está listo. Cualquier cosa nos escribes por aquí.`
    case 'lead':
    default:
      return `Hola ${primerNombre}, gracias por hacer el quiz de Regálame tu Historia. ¿Pudiste ver tu resultado? Estamos aquí para lo que necesites.`
  }
}

function diasDesde(fechaIso: string): number | null {
  if (!fechaIso) return null
  const fecha = new Date(fechaIso).getTime()
  if (!Number.isFinite(fecha)) return null
  return Math.floor((Date.now() - fecha) / 86400000)
}

const fuente = 'var(--font-poppins), sans-serif'

function TarjetaLead({
  lead,
  onActualizar,
}: {
  lead: LeadCRM
  onActualizar: (email: string, campos: { estado?: EstadoLead; nota?: string; registrarGestion?: boolean }) => Promise<boolean>
}) {
  const [notaAbierta, setNotaAbierta] = useState(false)
  const [textoNota, setTextoNota] = useState('')
  const [guardando, setGuardando] = useState(false)

  const diasLead = diasDesde(lead.timestamp)
  const diasGestion = diasDesde(lead.ultimaGestion)
  const sinGestion = diasGestion === null ? diasLead !== null && diasLead > 3 : diasGestion > 3

  const telefonoLimpio = lead.telefono.replace(/\D/g, '')
  const urlWhatsApp = telefonoLimpio
    ? `https://wa.me/${telefonoLimpio}?text=${encodeURIComponent(mensajeWhatsApp(lead.estado, lead.nombre))}`
    : ''

  async function guardarGestion() {
    if (guardando) return
    setGuardando(true)
    const ok = await onActualizar(lead.email, {
      registrarGestion: true,
      ...(textoNota.trim() && { nota: textoNota.trim() }),
    })
    setGuardando(false)
    if (ok) {
      setTextoNota('')
      setNotaAbierta(false)
    }
  }

  async function cambiarEstado(nuevo: EstadoLead) {
    if (nuevo === lead.estado || guardando) return
    setGuardando(true)
    await onActualizar(lead.email, { estado: nuevo })
    setGuardando(false)
  }

  return (
    <div
      style={{
        backgroundColor: '#FDFAF6',
        border: `1px solid ${sinGestion ? '#C49E50' : '#E0D5C4'}`,
        borderRadius: '10px',
        padding: '12px',
        marginBottom: '10px',
        opacity: guardando ? 0.6 : 1,
      }}
    >
      <p style={{ fontFamily: fuente, fontWeight: 600, fontSize: '0.875rem', color: '#3D3520', marginBottom: '2px' }}>
        {lead.nombre || '(sin nombre)'}
      </p>
      <p style={{ fontFamily: fuente, fontSize: '0.75rem', color: '#BD886A', marginBottom: '6px', wordBreak: 'break-all' }}>
        {lead.email}
        {lead.telefono && <> · {lead.telefono}</>}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
        {lead.perfil && (
          <span style={{ fontFamily: fuente, fontSize: '0.6875rem', backgroundColor: '#EAF3DE', color: '#6B783E', padding: '2px 8px', borderRadius: '999px', fontWeight: 600 }}>
            Perfil {lead.perfil}
          </span>
        )}
        {lead.utmSource && (
          <span style={{ fontFamily: fuente, fontSize: '0.6875rem', backgroundColor: '#F5EDE0', color: '#BD886A', padding: '2px 8px', borderRadius: '999px' }}>
            {lead.utmSource}
          </span>
        )}
      </div>

      <p style={{ fontFamily: fuente, fontSize: '0.6875rem', color: sinGestion ? '#C49E50' : '#BD886A', fontWeight: sinGestion ? 700 : 400, marginBottom: '10px' }}>
        {diasLead !== null && <>Lead hace {diasLead} día{diasLead === 1 ? '' : 's'}</>}
        {' · '}
        {diasGestion === null ? 'sin gestionar' : `gestión hace ${diasGestion} día${diasGestion === 1 ? '' : 's'}`}
      </p>

      {lead.notas && (
        <p style={{ fontFamily: fuente, fontSize: '0.6875rem', color: '#8A7E6E', whiteSpace: 'pre-wrap', backgroundColor: '#F5EDE0', borderRadius: '6px', padding: '6px 8px', marginBottom: '10px', maxHeight: '80px', overflowY: 'auto' }}>
          {lead.notas}
        </p>
      )}

      {notaAbierta && (
        <div style={{ marginBottom: '10px' }}>
          <textarea
            value={textoNota}
            onChange={e => setTextoNota(e.target.value)}
            placeholder="Nota de la gestión (opcional)"
            rows={2}
            autoFocus
            className="w-full outline-none"
            style={{ fontFamily: fuente, fontSize: '0.75rem', padding: '8px', border: '1px solid #E0D5C4', borderRadius: '6px', backgroundColor: '#FDFAF6', color: '#3D3520', resize: 'vertical' }}
          />
          <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
            <button
              onClick={guardarGestion}
              disabled={guardando}
              style={{ fontFamily: fuente, fontSize: '0.75rem', fontWeight: 600, backgroundColor: '#6B783E', color: '#FDFAF6', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}
            >
              {guardando ? 'Guardando…' : 'Guardar gestión'}
            </button>
            <button
              onClick={() => { setNotaAbierta(false); setTextoNota('') }}
              style={{ fontFamily: fuente, fontSize: '0.75rem', color: '#BD886A', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
        {urlWhatsApp ? (
          <a
            href={urlWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: fuente, fontSize: '0.75rem', fontWeight: 600, backgroundColor: '#6B783E', color: '#FDFAF6', padding: '6px 12px', borderRadius: '6px', textDecoration: 'none' }}
          >
            WhatsApp
          </a>
        ) : (
          <span style={{ fontFamily: fuente, fontSize: '0.6875rem', color: '#BD886A' }}>Sin teléfono</span>
        )}

        {!notaAbierta && (
          <button
            onClick={() => setNotaAbierta(true)}
            style={{ fontFamily: fuente, fontSize: '0.75rem', fontWeight: 600, color: '#6B783E', border: '1px solid #6B783E', padding: '5px 12px', borderRadius: '6px', backgroundColor: 'transparent', cursor: 'pointer' }}
          >
            Registrar gestión
          </button>
        )}

        <select
          value={lead.estado}
          onChange={e => cambiarEstado(e.target.value as EstadoLead)}
          disabled={guardando}
          style={{ fontFamily: fuente, fontSize: '0.75rem', color: '#3D3520', border: '1px solid #E0D5C4', borderRadius: '6px', padding: '5px 6px', backgroundColor: '#FDFAF6', cursor: 'pointer', marginLeft: 'auto' }}
        >
          {ESTADOS_LEAD.map(e => (
            <option key={e} value={e}>{NOMBRES_ESTADO[e]}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default function PipelinePage() {
  const router = useRouter()
  const [leads, setLeads] = useState<LeadCRM[]>([])
  const [cargando, setCargando] = useState(true)
  const [errorCarga, setErrorCarga] = useState(false)
  const [errorAccion, setErrorAccion] = useState('')
  const [filtroTexto, setFiltroTexto] = useState('')
  const [filtroEstado, setFiltroEstado] = useState<'todos' | EstadoLead>('todos')
  const [tabActivo, setTabActivo] = useState<EstadoLead>('lead')

  const cargar = useCallback(async () => {
    setCargando(true)
    setErrorCarga(false)
    try {
      const res = await fetch('/api/admin/leads')
      if (res.status === 401) {
        router.replace('/admin')
        return
      }
      if (!res.ok) throw new Error('carga')
      const data = await res.json()
      setLeads(data.leads || [])
    } catch {
      setErrorCarga(true)
    } finally {
      setCargando(false)
    }
  }, [router])

  useEffect(() => {
    cargar()
  }, [cargar])

  const actualizar = useCallback(
    async (email: string, campos: { estado?: EstadoLead; nota?: string; registrarGestion?: boolean }): Promise<boolean> => {
      setErrorAccion('')
      try {
        const res = await fetch('/api/admin/actualizar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, ...campos }),
        })
        if (res.status === 401) {
          router.replace('/admin')
          return false
        }
        const data = await res.json().catch(() => null)
        if (!res.ok || !data?.ok) {
          setErrorAccion(data?.error || 'No se pudo actualizar. Reintenta.')
          return false
        }
        setLeads(prev => prev.map(l => (l.email === email ? { ...l, ...data.lead } : l)))
        return true
      } catch {
        setErrorAccion('No se pudo actualizar. Reintenta.')
        return false
      }
    },
    [router]
  )

  const leadsFiltrados = useMemo(() => {
    const texto = filtroTexto.trim().toLowerCase()
    return leads.filter(l => {
      if (texto && !l.nombre.toLowerCase().includes(texto) && !l.email.includes(texto)) return false
      if (filtroEstado !== 'todos' && l.estado !== filtroEstado) return false
      return true
    })
  }, [leads, filtroTexto, filtroEstado])

  const porEstado = useMemo(() => {
    const mapa = new Map<EstadoLead, LeadCRM[]>()
    ESTADOS_LEAD.forEach(e => mapa.set(e, []))
    leadsFiltrados.forEach(l => mapa.get(l.estado)?.push(l))
    return mapa
  }, [leadsFiltrados])

  const columnasVisibles = filtroEstado === 'todos' ? ESTADOS_LEAD : ([filtroEstado] as const)

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F5EDE0' }}>
      <header style={{ padding: '20px 16px 12px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontStyle: 'italic', fontSize: '1.375rem', color: '#3D3520' }}>
          Pipeline · RTH
        </h1>
        <button
          onClick={cargar}
          disabled={cargando}
          style={{ fontFamily: fuente, fontSize: '0.75rem', fontWeight: 600, color: '#6B783E', border: '1px solid #6B783E', padding: '5px 12px', borderRadius: '6px', backgroundColor: 'transparent', cursor: 'pointer' }}
        >
          {cargando ? 'Cargando…' : 'Recargar'}
        </button>
        <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={filtroTexto}
            onChange={e => setFiltroTexto(e.target.value)}
            placeholder="Buscar nombre o email…"
            className="outline-none"
            style={{ fontFamily: fuente, fontSize: '0.8125rem', padding: '7px 12px', border: '1px solid #E0D5C4', borderRadius: '8px', backgroundColor: '#FDFAF6', color: '#3D3520', width: '200px' }}
          />
          <select
            value={filtroEstado}
            onChange={e => setFiltroEstado(e.target.value as 'todos' | EstadoLead)}
            style={{ fontFamily: fuente, fontSize: '0.8125rem', padding: '7px 8px', border: '1px solid #E0D5C4', borderRadius: '8px', backgroundColor: '#FDFAF6', color: '#3D3520', cursor: 'pointer' }}
          >
            <option value="todos">Todos los estados</option>
            {ESTADOS_LEAD.map(e => (
              <option key={e} value={e}>{NOMBRES_ESTADO[e]}</option>
            ))}
          </select>
        </div>
      </header>

      {errorAccion && (
        <p style={{ fontFamily: fuente, fontSize: '0.8125rem', color: '#B0563C', padding: '0 16px 8px' }}>{errorAccion}</p>
      )}

      {errorCarga ? (
        <div style={{ padding: '48px 16px', textAlign: 'center' }}>
          <p style={{ fontFamily: fuente, color: '#3D3520', marginBottom: '16px' }}>No se pudo cargar. Reintenta.</p>
          <button
            onClick={cargar}
            style={{ fontFamily: fuente, fontWeight: 600, fontSize: '0.875rem', backgroundColor: '#6B783E', color: '#FDFAF6', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer' }}
          >
            Reintentar
          </button>
        </div>
      ) : cargando && leads.length === 0 ? (
        <p style={{ fontFamily: fuente, color: '#BD886A', padding: '48px 16px', textAlign: 'center' }}>Cargando leads…</p>
      ) : (
        <>
          {/* Móvil: tabs por estado */}
          <div className="md:hidden">
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', padding: '4px 16px 12px' }}>
              {ESTADOS_LEAD.map(e => (
                <button
                  key={e}
                  onClick={() => setTabActivo(e)}
                  style={{
                    fontFamily: fuente,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    padding: '6px 12px',
                    borderRadius: '999px',
                    cursor: 'pointer',
                    backgroundColor: tabActivo === e ? '#6B783E' : '#FDFAF6',
                    color: tabActivo === e ? '#FDFAF6' : '#3D3520',
                    border: `1px solid ${tabActivo === e ? '#6B783E' : '#E0D5C4'}`,
                  }}
                >
                  {NOMBRES_ESTADO[e]} ({porEstado.get(e)?.length || 0})
                </button>
              ))}
            </div>
            <div style={{ padding: '0 16px 32px' }}>
              {(porEstado.get(tabActivo) || []).map(lead => (
                <TarjetaLead key={lead.email} lead={lead} onActualizar={actualizar} />
              ))}
              {(porEstado.get(tabActivo) || []).length === 0 && (
                <p style={{ fontFamily: fuente, fontSize: '0.8125rem', color: '#BD886A', textAlign: 'center', padding: '24px 0' }}>
                  Sin leads en este estado
                </p>
              )}
            </div>
          </div>

          {/* Escritorio: columnas */}
          <div className="hidden md:flex" style={{ gap: '12px', overflowX: 'auto', padding: '4px 16px 32px', alignItems: 'flex-start' }}>
            {columnasVisibles.map(estado => (
              <div key={estado} style={{ width: '290px', flexShrink: 0 }}>
                <p style={{ fontFamily: fuente, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#6B783E', padding: '0 2px 8px' }}>
                  {NOMBRES_ESTADO[estado]} · {porEstado.get(estado)?.length || 0}
                </p>
                {(porEstado.get(estado) || []).map(lead => (
                  <TarjetaLead key={lead.email} lead={lead} onActualizar={actualizar} />
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  )
}
