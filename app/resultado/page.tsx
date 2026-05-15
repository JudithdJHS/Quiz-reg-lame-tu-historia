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
      {/* Foto real — nítida, sin blur */}
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

      {/* Overlay oscuro solo en la parte inferior para legibilidad del texto */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: imgError
            ? 'transparent'
            : 'linear-gradient(to bottom, transparent 40%, rgba(61,53,32,0.45) 100%)',
        }}
      />

      {/* Texto sobre el hero */}
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

      {/* [1] FOTO HERO con overlay y texto */}
      <HeroFoto />

      {/* Contenido del resultado con fade-in */}
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
      </div>

      <footer className="pb-8 text-center">
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', color: '#BD886A' }}>
          © 2026 Regálame tu Historia · Ana y Alex
        </p>
      </footer>
    </main>
  )
}
