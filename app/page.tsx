'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'

export default function Bienvenida() {
  const [imgError, setImgError] = useState(false)
  const [muted, setMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  function toggleMute() {
    if (!videoRef.current) return
    videoRef.current.muted = !videoRef.current.muted
    setMuted(videoRef.current.muted)
  }

  return (
    <main className="flex flex-col md:flex-row w-full min-h-screen md:h-screen">

      {/* ── COL IZQUIERDA — Video ─────────────────────────────── */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-[#3D3520]" style={{ height: '100vh' }}>
        <div style={{ height: '100%', aspectRatio: '9/16', position: 'relative', overflow: 'hidden' }}>
          <video
            ref={videoRef}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/Quiz.mp4" type="video/mp4" />
          </video>

        {/* Botón mute/unmute */}
        <button
          onClick={toggleMute}
          style={{
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            background: 'rgba(61,53,32,0.65)',
            border: '1px solid rgba(253,250,246,0.3)',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(4px)',
          }}
          aria-label={muted ? 'Activar sonido' : 'Silenciar'}
        >
          {muted ? (
            <svg width="20" height="20" fill="none" stroke="#FDFAF6" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M11 5L6 9H2v6h4l5 4V5z"/>
              <line x1="23" y1="9" x2="17" y2="15"/>
              <line x1="17" y1="9" x2="23" y2="15"/>
            </svg>
          ) : (
            <svg width="20" height="20" fill="none" stroke="#FDFAF6" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M11 5L6 9H2v6h4l5 4V5z"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
            </svg>
          )}
        </button>
        </div>
      </div>

      {/* ── COL DERECHA — Contenido (full en mobile, 1/2 en desktop) */}
      <motion.div
        className="w-full md:w-1/2 flex flex-col bg-[#F5EDE0]"
        style={{ minHeight: 0 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
      >

        {/* ── FOTO MOBILE (oculta en desktop) ────────────────── */}
        {!imgError && (
          <div className="block md:hidden w-full" style={{ height: '280px', flexShrink: 0, overflow: 'hidden' }}>
            <img
              src="/foto-ana-alex.jpg"
              alt="Ana y Alex — Regálame tu Historia"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 25%' }}
              onError={() => setImgError(true)}
            />
          </div>
        )}

        {/* ── CONTENIDO — logo, texto, botón ─────────────────── */}
        <div
          className="flex flex-col items-center justify-center flex-1"
          style={{ padding: '32px' }}
        >
          <div style={{ maxWidth: '380px', width: '100%' }}>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}
            >
              <Image
                src="/Logo-a-color_modf.svg"
                alt="Regálame tu Historia"
                width={220}
                height={92}
                priority
                style={{ height: '80px', width: 'auto' }}
              />
            </motion.div>

            {/* Divisor dorado */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.45, delay: 0.32 }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '140px', margin: '0 auto 24px' }}
            >
              <div style={{ flex: 1, height: '1px', backgroundColor: '#C49E50', opacity: 0.4 }} />
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#C49E50', opacity: 0.55 }} />
              <div style={{ flex: 1, height: '1px', backgroundColor: '#C49E50', opacity: 0.4 }} />
            </motion.div>

            {/* Párrafo principal */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.36 }}
              style={{ fontFamily: 'var(--font-poppins), sans-serif', fontWeight: 400, fontSize: '18px', color: '#3D3520', lineHeight: '1.8', marginBottom: '18px', textAlign: 'center' }}
            >
              No todos los matrimonios viven la misma batalla.
              Algunos están luchando por salvar lo que queda.
              Otros llevan años esperando que algo cambie.
              Algunos no saben si esto tiene solución…
              y otros quieren construir algo santo desde el principio.
            </motion.p>

            {/* Frase italic dorada */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.44 }}
              style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 400, fontStyle: 'italic', fontSize: '20px', color: '#C49E50', lineHeight: '1.8', marginBottom: '32px', textAlign: 'center' }}
            >
              Responde con honestidad. Al finalizar, descubrirás el momento que estás viviendo hoy, recibirás una orientación personalizada y conocerás el camino más adecuado para comenzar un proceso de sanación, restauración y crecimiento para ti, tu relación y tu familia.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.52 }}
            >
              <Link
                href="/quiz"
                className="block w-full text-center font-semibold text-lg transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 active:scale-[0.98]"
                style={{ fontFamily: 'var(--font-poppins), sans-serif', backgroundColor: '#6B783E', color: '#FDFAF6', padding: '16px 0', borderRadius: '10px', boxShadow: '0 6px 24px rgba(107,120,62,0.28)', letterSpacing: '0.01em' }}
              >
                Comenzar mi camino →
              </Link>
            </motion.div>

            {/* Footer */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '0.75rem', color: '#BD886A', marginTop: '28px', textAlign: 'center', letterSpacing: '0.03em' }}
            >
              © 2026 Regálame tu Historia · Ana y Alex
            </motion.p>

          </div>
        </div>
      </motion.div>
    </main>
  )
}
