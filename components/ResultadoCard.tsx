'use client'

import { motion } from 'motion/react'
import { ResultadoPerfil } from '@/types/quiz'
import RutaCamino from './RutaCamino'

interface ResultadoCardProps {
  resultado: ResultadoPerfil
  nombre: string
}

const FADE_UP = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.52, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
})

/** Divide el nombre en parte regular + parte italic (últimas N palabras) */
function splitNombre(nombre: string): { regular: string; italic: string } {
  const words = nombre.split(' ')
  const nItalic = Math.max(Math.ceil(words.length / 3), 2)
  const splitAt = words.length - nItalic
  return {
    regular: words.slice(0, splitAt).join(' '),
    italic: words.slice(splitAt).join(' '),
  }
}

export default function ResultadoCard({ resultado, nombre }: ResultadoCardProps) {
  const urlProducto =
    resultado.urlProductoKey === 'EMAIL_CONTACTO'
      ? 'mailto:regalametuhistoria@gmail.com'
      : process.env.NEXT_PUBLIC_URL_TALLER || '#'

  const { regular: tituloRegular, italic: tituloItalic } = splitNombre(resultado.nombre)

  return (
    <div className="max-w-2xl mx-auto">

      {/* ── SALUDO ─────────────────────────────────────────────── */}
      <motion.div
        className="text-center"
        style={{ marginBottom: '44px' }}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {nombre && (
          <p style={{
            fontFamily: 'Inter, sans-serif',
            color: '#BD886A',
            fontSize: '0.9375rem',
            letterSpacing: '0.04em',
            marginBottom: '4px',
          }}>
            Hola {nombre},
          </p>
        )}
        <p style={{
          fontFamily: 'Playfair Display, serif',
          fontStyle: 'italic',
          color: '#C49E50',
          fontSize: 'clamp(1rem, 3vw, 1.25rem)',
          letterSpacing: '-0.01em',
          marginBottom: '20px',
        }}>
          Tu camino a la restauración
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
          <div style={{ width: '40px', height: '1px', backgroundColor: '#C49E50', opacity: 0.35 }} />
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#C49E50', opacity: 0.5 }} />
          <div style={{ width: '40px', height: '1px', backgroundColor: '#C49E50', opacity: 0.35 }} />
        </div>
      </motion.div>

      {/* ── EL PATRÓN ──────────────────────────────────────────── */}
      <motion.div style={{ marginBottom: '44px' }} {...FADE_UP(0.08)}>

        {/* Label premium — Inter 11px, tracking 0.15em */}
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.6875rem',
          fontWeight: 600,
          color: '#C49E50',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          marginBottom: '14px',
        }}>
          Tu patrón
        </p>

        {/* Título monumental — regular + italic gold */}
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(2rem, 7vw, 3.5rem)',
          fontWeight: 700,
          color: '#3D3520',
          lineHeight: '1.1',
          letterSpacing: '-0.02em',
          marginBottom: '10px',
        }}>
          {tituloRegular}{' '}
          <em style={{ fontStyle: 'italic', color: '#C49E50' }}>{tituloItalic}</em>
        </h1>

        {/* Subtítulo — Inter Light 16px */}
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 300,
          color: '#BD886A',
          fontSize: '1rem',
          letterSpacing: '0.03em',
          marginBottom: '24px',
        }}>
          {resultado.subtitulo}
        </p>

        {/* Situación con borde izquierdo */}
        <div style={{
          borderLeft: '3px solid #C49E50',
          paddingLeft: '20px',
        }}>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            color: '#3D3520',
            fontSize: '0.9375rem',
            lineHeight: '1.85',
          }}>
            {resultado.situacion}
          </p>
        </div>
      </motion.div>

      {/* ── TESTIMONIO — fondo #EDE3D5, sin borde ─────────────── */}
      <motion.div
        style={{
          backgroundColor: '#EDE3D5',
          borderRadius: '12px',
          padding: '32px 28px 28px',
          marginBottom: '44px',
          position: 'relative',
          overflow: 'hidden',
        }}
        {...FADE_UP()}
      >
        {/* Comilla decorativa flotante — 80px, dorado muy transparente */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '-10px',
            left: '20px',
            fontFamily: 'Playfair Display, serif',
            fontSize: '80px',
            color: '#C49E50',
            opacity: 0.18,
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          "
        </div>

        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.6875rem',
          fontWeight: 600,
          color: '#BD886A',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '14px',
          position: 'relative',
        }}>
          — Alguien que llegó exactamente donde estás tú
        </p>

        <p style={{
          fontFamily: 'Playfair Display, serif',
          fontStyle: 'italic',
          color: '#3D3520',
          fontSize: 'clamp(1.0625rem, 2.5vw, 1.25rem)',
          lineHeight: '1.7',
          letterSpacing: '-0.01em',
          position: 'relative',
        }}>
          {resultado.testimonio}
        </p>
      </motion.div>

      {/* ── MENSAJE CONTUNDENTE — líneas doradas arriba y abajo ── */}
      <motion.div
        style={{
          textAlign: 'center',
          marginBottom: '44px',
          padding: '0 8px',
        }}
        {...FADE_UP()}
      >
        {/* Línea dorada superior */}
        <div style={{ height: '1px', backgroundColor: 'rgba(196,158,80,0.4)', marginBottom: '24px' }} />

        <p style={{
          fontFamily: 'Playfair Display, serif',
          fontStyle: 'italic',
          color: '#3D3520',
          fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
          lineHeight: '1.6',
          letterSpacing: '-0.01em',
        }}>
          {resultado.mensaje}
        </p>

        {/* Línea dorada inferior */}
        <div style={{ height: '1px', backgroundColor: 'rgba(196,158,80,0.4)', marginTop: '24px' }} />
      </motion.div>

      {/* ── COSTO DE LA INACCIÓN + VISIÓN ─────────────────────── */}
      <motion.div style={{ marginBottom: '44px' }} {...FADE_UP()}>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          color: '#BD886A',
          fontSize: '0.9375rem',
          lineHeight: '1.85',
          marginBottom: '28px',
        }}>
          {resultado.costoInaccion}
        </p>

        <div style={{ height: '1px', backgroundColor: 'rgba(196,158,80,0.2)', marginBottom: '28px' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.6875rem',
              fontWeight: 700,
              color: '#BD886A',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              flexShrink: 0,
              paddingTop: '3px',
              minWidth: '92px',
            }}>
              No prometemos
            </span>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              color: '#3D3520',
              fontSize: '0.9375rem',
              lineHeight: '1.65',
              margin: 0,
            }}>
              {resultado.visionFuturo.noPrometemos}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.6875rem',
              fontWeight: 700,
              color: '#6B783E',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              flexShrink: 0,
              paddingTop: '3px',
              minWidth: '92px',
            }}>
              Prometemos
            </span>
            <p style={{
              fontFamily: 'Playfair Display, serif',
              color: '#3D3520',
              fontSize: '0.9375rem',
              lineHeight: '1.65',
              margin: 0,
            }}>
              {resultado.visionFuturo.prometemos}
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── EL CAMINO ──────────────────────────────────────────── */}
      <motion.div
        style={{
          borderRadius: '12px',
          padding: '28px 22px',
          marginBottom: '12px',
          backgroundColor: '#FDFAF6',
          border: '1px solid rgba(196,158,80,0.18)',
        }}
        {...FADE_UP()}
      >
        <RutaCamino pasos={resultado.pasosCamino} destino={resultado.destinoCamino} />
      </motion.div>

      {/* ── MASTERCLASS GRATUITA ──────────────────────────────── */}
      <motion.div
        style={{
          borderRadius: '12px',
          padding: '28px 24px',
          marginBottom: '12px',
          backgroundColor: '#EDE3D5',
          border: '1px solid rgba(196,158,80,0.25)',
        }}
        {...FADE_UP()}
      >
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.6875rem',
          fontWeight: 700,
          color: '#C49E50',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          marginBottom: '14px',
        }}>
          {resultado.masterclassGratuita.label}
        </p>

        <h3 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(1.125rem, 3vw, 1.375rem)',
          fontWeight: 700,
          color: '#3D3520',
          lineHeight: '1.3',
          letterSpacing: '-0.01em',
          marginBottom: '10px',
        }}>
          {resultado.masterclassGratuita.titulo}
        </h3>

        <p style={{
          fontFamily: 'Inter, sans-serif',
          color: '#BD886A',
          fontSize: '0.9375rem',
          lineHeight: '1.65',
          marginBottom: '16px',
        }}>
          {resultado.masterclassGratuita.subtitulo}
        </p>

        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontStyle: 'italic',
          color: 'rgba(189,136,106,0.65)',
          fontSize: '0.8125rem',
          letterSpacing: '0.02em',
        }}>
          {resultado.masterclassGratuita.caption}
        </p>
      </motion.div>

      {/* ── CTA — verde oliva, texto blanco ───────────────────── */}
      <motion.div
        style={{
          borderRadius: '12px',
          padding: 'clamp(28px, 5vw, 44px) clamp(24px, 5vw, 36px)',
          backgroundColor: '#6B783E',
          marginTop: '8px',
        }}
        {...FADE_UP()}
      >
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.6875rem',
          fontWeight: 700,
          color: 'rgba(253,250,246,0.5)',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          marginBottom: '16px',
        }}>
          ¿Por dónde empezar?
        </p>

        <h3 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(1.25rem, 3.5vw, 1.625rem)',
          fontWeight: 700,
          color: '#FDFAF6',
          lineHeight: '1.25',
          letterSpacing: '-0.01em',
          marginBottom: '12px',
        }}>
          {resultado.primerPaso}
        </h3>

        <p style={{
          fontFamily: 'Inter, sans-serif',
          color: 'rgba(253,250,246,0.7)',
          fontSize: '0.9375rem',
          lineHeight: '1.65',
          marginBottom: '28px',
        }}>
          {resultado.descripcionProducto}
        </p>

        <a
          href={urlProducto}
          target={urlProducto.startsWith('mailto') ? undefined : '_blank'}
          rel="noopener noreferrer"
          className="block w-full text-center font-semibold transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '1rem',
            backgroundColor: '#FDFAF6',
            color: '#3D3520',
            padding: '17px 24px',
            borderRadius: '8px',
            letterSpacing: '0.01em',
          }}
        >
          {resultado.ctaTexto}
        </a>

        {resultado.precio && (
          <p className="text-center" style={{
            fontFamily: 'Inter, sans-serif',
            color: 'rgba(253,250,246,0.45)',
            fontSize: '0.8125rem',
            marginTop: '10px',
            letterSpacing: '0.02em',
          }}>
            {resultado.precio}
          </p>
        )}
      </motion.div>

    </div>
  )
}
