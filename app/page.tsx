'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'

export default function Bienvenida() {
  return (
    <main className="flex flex-row w-full h-screen">

      {/* ── COL IZQUIERDA — Video Vimeo placeholder ────────── */}
      {/* Para embed Vimeo: reemplazar todo este div por:
          <iframe src="https://player.vimeo.com/video/[ID]?autoplay=1&muted=1&loop=1&background=1"
            className="w-1/2 h-full border-none" allow="autoplay; fullscreen" />  */}
      <div className="w-1/2 h-full bg-[#3D3520] flex flex-col items-center justify-center gap-4">

        {/* Icono Play */}
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          border: '2px solid #C49E50',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.85,
        }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M10 8l12 6-12 6V8z" fill="#C49E50" />
          </svg>
        </div>

        {/* Texto placeholder */}
        <div style={{ textAlign: 'center', padding: '0 24px' }}>
          <p style={{
            fontFamily: 'Playfair Display, serif',
            fontStyle: 'italic',
            fontSize: '1.125rem',
            color: '#FDFAF6',
            lineHeight: '1.5',
            marginBottom: '8px',
          }}>
            Ana y Alex
          </p>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.75rem',
            color: 'rgba(253,250,246,0.4)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            Video próximamente
          </p>
        </div>
      </div>

      {/* ── COL DERECHA — Contenido ──────────────────────────── */}
      <motion.div
        className="w-1/2 h-full bg-[#F5EDE0] flex flex-col items-center justify-center px-12"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
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
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              width: '140px', margin: '0 auto 24px',
            }}
          >
            <div style={{ flex: 1, height: '1px', backgroundColor: '#C49E50', opacity: 0.4 }} />
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#C49E50', opacity: 0.55 }} />
            <div style={{ flex: 1, height: '1px', backgroundColor: '#C49E50', opacity: 0.4 }} />
          </motion.div>

          {/* Párrafo principal — Inter 18px */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.36 }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '18px',
              color: '#3D3520',
              lineHeight: '1.8',
              marginBottom: '18px',
              textAlign: 'center',
            }}
          >
            No todos los matrimonios viven la misma batalla.
            Algunos están luchando por salvar lo que queda.
            Otros llevan años esperando que algo cambie.
            Algunos no saben si esto tiene solución…
            y otros quieren construir algo santo desde el principio.
          </motion.p>

          {/* Frase italic — Playfair 20px dorado */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.44 }}
            style={{
              fontFamily: 'Playfair Display, serif',
              fontStyle: 'italic',
              fontSize: '20px',
              color: '#C49E50',
              lineHeight: '1.8',
              marginBottom: '32px',
              textAlign: 'center',
            }}
          >
            Responde con honestidad.
            Tal vez descubras algo que tu corazón ya sabía…
            pero no había podido nombrar.
          </motion.p>

          {/* CTA — ancho completo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.52 }}
          >
            <Link
              href="/quiz"
              className="block w-full text-center font-semibold text-lg transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 active:scale-[0.98]"
              style={{
                fontFamily: 'Inter, sans-serif',
                backgroundColor: '#6B783E',
                color: '#FDFAF6',
                padding: '16px 0',
                borderRadius: '10px',
                boxShadow: '0 6px 24px rgba(107,120,62,0.28)',
                letterSpacing: '0.01em',
              }}
            >
              Comenzar mi camino →
            </Link>
          </motion.div>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.75rem',
              color: '#BD886A',
              marginTop: '28px',
              textAlign: 'center',
              letterSpacing: '0.03em',
            }}
          >
            © 2026 Regálame tu Historia · Ana y Alex
          </motion.p>

        </div>
      </motion.div>
    </main>
  )
}
