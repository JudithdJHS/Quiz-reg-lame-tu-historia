'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { RESULTADOS } from '@/lib/resultados-data'
import ResultadoCard from '@/components/ResultadoCard'
import type { QuizSesion, PerfilId, ResultadoPerfil } from '@/types/quiz'

const DOS_HORAS = 2 * 60 * 60 * 1000

function HeroFoto() {
  const [imgError, setImgError] = useState(false)

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(280px, 40vw, 400px)',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #F5EDE0 0%, #EDD5B0 50%, #C49E5025 100%)',
      }}
    >
      {!imgError && (
        <img
          src="/foto-ana-alex.jpg"
          alt="Ana y Alex — Regálame tu Historia"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
          }}
          onError={() => setImgError(true)}
        />
      )}

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: imgError
            ? 'transparent'
            : 'linear-gradient(to bottom, transparent 40%, rgba(61,53,32,0.45) 100%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 2,
        }}
      >
        <p
          style={{
            fontFamily: 'Playfair Display, serif',
            fontStyle: 'italic',
            fontWeight: 600,
            color: imgError ? '#C49E50' : '#FDFAF6',
            fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
            lineHeight: '1.2',
            marginBottom: '4px',
            textShadow: imgError ? 'none' : '0 1px 6px rgba(0,0,0,0.3)',
          }}
        >
          Ana y Alex
        </p>
        <p
          style={{
            fontFamily: 'Playfair Display, serif',
            fontStyle: 'italic',
            color: imgError ? '#BD886A' : 'rgba(253,250,246,0.85)',
            fontSize: 'clamp(0.8125rem, 2vw, 1rem)',
            textShadow: imgError ? 'none' : '0 1px 4px rgba(0,0,0,0.25)',
          }}
        >
          Terapeutas de Pareja y Familia
        </p>
      </div>
    </div>
  )
}

export default function ResultadoPage() {
  const router = useRouter()
  const [resultado, setResultado] = useState<ResultadoPerfil | null>(null)
  const [nombre, setNombre] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const raw = sessionStorage.getItem('rth_quiz_resultado')
    if (!raw) {
      router.replace('/')
      return
    }

    let sesion: QuizSesion
    try {
      sesion = JSON.parse(raw)
    } catch {
      router.replace('/')
      return
    }

    if (!sesion.completado || Date.now() - sesion.timestamp > DOS_HORAS) {
      sessionStorage.removeItem('rth_quiz_resultado')
      router.replace('/')
      return
    }

    const r = RESULTADOS[sesion.perfil as PerfilId]
    if (!r) {
      router.replace('/')
      return
    }

    setResultado(r)
    setNombre(sesion.nombre || '')
    setTimeout(() => setVisible(true), 80)
  }, [router])

  if (!resultado) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: '#F5EDE0' }}
      >
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin w-8 h-8" style={{ color: '#C49E50' }} fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p style={{ fontFamily: 'Inter, sans-serif', color: '#BD886A' }}>Cargando tu resultado…</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F5EDE0' }}>

      {/* Logo */}
      <header
        className="w-full flex justify-center px-6"
        style={{ backgroundColor: '#F5EDE0', paddingTop: '20px', paddingBottom: '16px' }}
      >
        <img
          src="/Logo-a-color_modf.svg"
          alt="Regálame tu Historia"
          style={{ height: 'clamp(56px, 9vw, 72px)', width: 'auto', display: 'block' }}
        />
      </header>

      {/* FOTO HERO */}
      <HeroFoto />

      {/* Contenido con fade-in */}
      <div
        className="transition-all duration-500 pb-16 mt-8"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
        }}
      >
        <div className="px-4">
          <ResultadoCard resultado={resultado} nombre={nombre} />
        </div>

        {/* EXTRACTO VIDEO — Sesión 2 */}
        <div className="mx-auto px-4 mt-12" style={{ maxWidth: '720px' }}>
          <div style={{ borderTop: '1px solid #E0D5C4', paddingTop: '48px' }}>

            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: '#6B783E',
              marginBottom: '12px',
              textAlign: 'center',
            }}>
              Tu primer regalo
            </p>

            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              color: '#3D3520',
              textAlign: 'center',
              marginBottom: '8px',
              lineHeight: 1.3,
            }}>
              Sesión 2 — Reconociendo las heridas
            </h2>

            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1rem',
              color: '#8A7E6E',
              textAlign: 'center',
              marginBottom: '32px',
              lineHeight: 1.7,
            }}>
              Este es el trabajo que no depende de tu pareja.<br />
              Solo de ti.
            </p>

            {/* Player */}
            <div style={{
              position: 'relative',
              paddingBottom: '56.25%',
              height: 0,
              overflow: 'hidden',
              borderRadius: '4px',
              background: '#EDE3D5',
              boxShadow: '0 4px 24px rgba(61,53,32,0.12)',
            }}>

              {/* OPCIÓN A: YouTube — descomenta y pon el ID cuando tengas el video */}
              {/* <iframe
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                src="https://www.youtube.com/embed/VIDEO_ID?rel=0&modestbranding=1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              /> */}

              {/* PLACEHOLDER — elimina este bloque cuando actives el video */}
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#C49E50',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <svg width="24" height="24" fill="#FDFAF6" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <p style={{
                  fontFamily: 'Playfair Display, serif',
                  fontStyle: 'italic',
                  color: '#8A7E6E',
                  fontSize: '1rem',
                }}>
                  El extracto estará disponible muy pronto
                </p>
              </div>

            </div>

            {/* CTA después del video */}
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                color: '#3D3520',
                fontSize: '1rem',
                lineHeight: 1.7,
                marginBottom: '24px',
              }}>
                Esto es solo el inicio de tu camino.
              </p>
              
                href="https://www.regalametuhistoria.com/?utm_source=quiz&utm_medium=resultado&utm_content=cta_video"
                style={{
                  display: 'inline-block',
                  background: '#6B783E',
                  color: '#FDFAF6',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  letterSpacing: '0.5px',
                  padding: '16px 36px',
                  borderRadius: '2px',
                  textDecoration: 'none',
                }}
              >
                Quiero continuar mi camino →
              </a>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.8125rem',
                color: '#8A7E6E',
                marginTop: '12px',
              }}>
                Taller Del Infierno al Cielo en el Matrimonio
              </p>
            </div>

          </div>
        </div>
      </div>

      <footer className="pb-8 text-center mt-12">
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', color: '#BD886A' }}>
          © 2026 Regálame tu Historia · Ana y Alex
        </p>
      </footer>

    </main>
  )
}
