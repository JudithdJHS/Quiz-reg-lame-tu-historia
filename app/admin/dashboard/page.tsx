'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { type LeadCRM } from '@/types/admin'
import { diasDesde, parseGestionesPorAdmin } from '@/lib/admin-utils'

const fuente = 'var(--font-poppins), sans-serif'
const UMBRAL_DIAS = 3

function Tarjeta({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: '#FDFAF6', border: '1px solid #E0D5C4', borderRadius: '12px', padding: '16px', flex: '1 1 200px' }}>
      {children}
    </div>
  )
}

export default function DashboardPage() {
  const router = useRouter()
  const [leads, setLeads] = useState<LeadCRM[]>([])
  const [cargando, setCargando] = useState(true)
  const [errorCarga, setErrorCarga] = useState(false)

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

  const leadsSinAtender = useMemo(() => {
    return leads
      .map(lead => ({ lead, dias: diasDesde(lead.ultimaGestion) ?? diasDesde(lead.timestamp) }))
      .filter(({ lead, dias }) => lead.estado !== 'pagado' && lead.estado !== 'alumno' && lead.estado !== 'miembro' && (dias === null || dias > UMBRAL_DIAS))
      .sort((a, b) => (b.dias ?? 0) - (a.dias ?? 0))
  }, [leads])

  const gestionesPorAdmin = useMemo(() => {
    const stats = parseGestionesPorAdmin(leads.map(l => l.notas))
    return Array.from(stats.entries())
      .map(([admin, datos]) => ({ admin, ...datos }))
      .sort((a, b) => b.total - a.total)
  }, [leads])

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F5EDE0' }}>
      <header style={{ padding: '20px 16px 12px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontStyle: 'italic', fontSize: '1.375rem', color: '#3D3520' }}>
          Dashboard · RTH
        </h1>
        <Link
          href="/admin/pipeline"
          style={{ fontFamily: fuente, fontSize: '0.75rem', fontWeight: 600, color: '#6B783E', border: '1px solid #6B783E', padding: '5px 12px', borderRadius: '6px', textDecoration: 'none' }}
        >
          ← Pipeline
        </Link>
        <button
          onClick={cargar}
          disabled={cargando}
          style={{ fontFamily: fuente, fontSize: '0.75rem', fontWeight: 600, color: '#6B783E', border: '1px solid #6B783E', padding: '5px 12px', borderRadius: '6px', backgroundColor: 'transparent', cursor: 'pointer' }}
        >
          {cargando ? 'Cargando…' : 'Recargar'}
        </button>
      </header>

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
        <p style={{ fontFamily: fuente, color: '#BD886A', padding: '48px 16px', textAlign: 'center' }}>Cargando…</p>
      ) : (
        <div style={{ padding: '4px 16px 32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Tarjeta>
              <p style={{ fontFamily: fuente, fontSize: '0.75rem', color: '#BD886A' }}>Total leads</p>
              <p style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.75rem', color: '#3D3520' }}>{leads.length}</p>
            </Tarjeta>
            <Tarjeta>
              <p style={{ fontFamily: fuente, fontSize: '0.75rem', color: '#BD886A' }}>Sin atender (+{UMBRAL_DIAS} días)</p>
              <p style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.75rem', color: '#C49E50' }}>{leadsSinAtender.length}</p>
            </Tarjeta>
            <Tarjeta>
              <p style={{ fontFamily: fuente, fontSize: '0.75rem', color: '#BD886A' }}>Admins activos</p>
              <p style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.75rem', color: '#3D3520' }}>{gestionesPorAdmin.length}</p>
            </Tarjeta>
          </div>

          <section>
            <h2 style={{ fontFamily: fuente, fontWeight: 700, fontSize: '0.8125rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#6B783E', marginBottom: '10px' }}>
              Gestiones por admin
            </h2>
            <div style={{ backgroundColor: '#FDFAF6', border: '1px solid #E0D5C4', borderRadius: '12px', overflow: 'hidden' }}>
              {gestionesPorAdmin.length === 0 ? (
                <p style={{ fontFamily: fuente, fontSize: '0.8125rem', color: '#BD886A', padding: '16px', textAlign: 'center' }}>
                  Todavía no hay gestiones firmadas.
                </p>
              ) : (
                gestionesPorAdmin.map(({ admin, total, ultima }, i) => (
                  <div
                    key={admin}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '10px 16px',
                      borderTop: i === 0 ? 'none' : '1px solid #E0D5C4',
                    }}
                  >
                    <span style={{ fontFamily: fuente, fontSize: '0.875rem', fontWeight: 600, color: '#3D3520' }}>{admin}</span>
                    <span style={{ fontFamily: fuente, fontSize: '0.8125rem', color: '#BD886A' }}>
                      {total} gestión{total === 1 ? '' : 'es'} · última {ultima || '—'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </section>

          <section>
            <h2 style={{ fontFamily: fuente, fontWeight: 700, fontSize: '0.8125rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#6B783E', marginBottom: '10px' }}>
              Leads sin atender
            </h2>
            <div style={{ backgroundColor: '#FDFAF6', border: '1px solid #E0D5C4', borderRadius: '12px', overflow: 'hidden' }}>
              {leadsSinAtender.length === 0 ? (
                <p style={{ fontFamily: fuente, fontSize: '0.8125rem', color: '#BD886A', padding: '16px', textAlign: 'center' }}>
                  Todo al día — sin leads pendientes.
                </p>
              ) : (
                leadsSinAtender.map(({ lead, dias }, i) => (
                  <div
                    key={lead.email}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px 16px',
                      borderTop: i === 0 ? 'none' : '1px solid #E0D5C4',
                      flexWrap: 'wrap',
                      gap: '4px',
                    }}
                  >
                    <span style={{ fontFamily: fuente, fontSize: '0.8125rem', color: '#3D3520' }}>
                      {lead.nombre || '(sin nombre)'} <span style={{ color: '#BD886A' }}>· {lead.email}</span>
                    </span>
                    <span style={{ fontFamily: fuente, fontSize: '0.75rem', fontWeight: 600, color: '#C49E50' }}>
                      {dias === null ? 'sin gestionar' : `${dias} día${dias === 1 ? '' : 's'} sin gestión`}
                    </span>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      )}
    </main>
  )
}
