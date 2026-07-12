'use client'

import { motion } from 'motion/react'
import { ResultadoPerfil } from '@/types/quiz'
import RutaCamino from './RutaCamino'
import { URL_TALLER, URL_MEMBRESIA, URL_AGENDA_1_1 } from '@/lib/urls'

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
      ? 'mailto:hola@regalametuhistoria.com'
      : URL_TALLER

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
            fontFamily: 'var(--font-poppins), sans-serif',
            color: '#BD886A',
            fontSize: '0.9375rem',
            letterSpacing: '0.04em',
            marginBottom: '4px',
          }}>
            Hola {nombre},
          </p>
        )}
        <p style={{
          fontFamily: 'var(--font-playfair), serif',
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

        <p style={{
          fontFamily: 'var(--font-poppins), sans-serif',
          fontSize: '10px',
          fontWeight: 700,
          color: '#C49E50',
          textTransform: 'uppercase',
          letterSpacing: '4px',
          marginBottom: '16px',
        }}>
          Tu patrón
        </p>

        {/* Separador dorado */}
        <div style={{ width: '50px', height: '2px', backgroundColor: '#C49E50', marginBottom: '16px' }} />

        {/* Título monumental — fontWeight 400 (el tamaño da el peso) */}
        <h1 style={{
          fontFamily: 'var(--font-playfair), serif',
          fontSize: 'clamp(2rem, 7vw, 3.25rem)',
          fontWeight: 400,
          color: '#3D3520',
          lineHeight: '1.15',
          letterSpacing: '-0.02em',
          marginBottom: '10px',
        }}>
          {tituloRegular}{' '}
          <em style={{ fontStyle: 'italic', color: '#C49E50' }}>{tituloItalic}</em>
        </h1>

        {/* Subtítulo — 15px 400 gris */}
        <p style={{
          fontFamily: 'var(--font-poppins), sans-serif',
          fontWeight: 400,
          color: '#8A7E6E',
          fontSize: '15px',
          lineHeight: '1.7',
          marginBottom: '24px',
        }}>
          {resultado.subtitulo}
        </p>

        {/* Situación — párrafo de cuerpo, 16px 400 */}
        <p style={{
          fontFamily: 'var(--font-poppins), sans-serif',
          fontWeight: 400,
          color: '#3D3520',
          fontSize: '16px',
          lineHeight: '1.75',
        }}>
          {resultado.situacion}
        </p>
      </motion.div>

      {/* ── TESTIMONIO ─────────────────────────────────────────── */}
      <motion.div
        style={{
          backgroundColor: '#FDFAF6',
          borderRadius: '12px',
          padding: '24px 28px',
          marginBottom: '44px',
          border: '1px solid #E0D5C4',
        }}
        {...FADE_UP()}
      >
        <p style={{
          fontFamily: 'var(--font-poppins), sans-serif',
          fontSize: '10px',
          fontWeight: 700,
          color: '#C49E50',
          textTransform: 'uppercase',
          letterSpacing: '3px',
          marginBottom: '12px',
        }}>
          — Alguien que llegó exactamente donde estás tú
        </p>

        <p style={{
          fontFamily: 'var(--font-playfair), serif',
          fontStyle: 'italic',
          color: '#3D3520',
          fontSize: '17px',
          lineHeight: '1.7',
          fontWeight: 400,
        }}>
          {resultado.testimonio}
        </p>
      </motion.div>

      {/* ── MENSAJE CONTUNDENTE — cita emocional con borde dorado ── */}
      <motion.div style={{ marginBottom: '44px' }} {...FADE_UP()}>
        <p style={{
          fontFamily: 'var(--font-playfair), serif',
          fontStyle: 'italic',
          color: '#3D3520',
          fontSize: '20px',
          fontWeight: 400,
          lineHeight: '1.6',
          padding: '24px 32px',
          borderLeft: '3px solid #C49E50',
          background: 'rgba(196,158,80,0.08)',
          borderRadius: '0 8px 8px 0',
        }}>
          {resultado.mensaje}
        </p>
      </motion.div>

      {/* ── COSTO DE LA INACCIÓN + VISIÓN ─────────────────────── */}
      <motion.div style={{ marginBottom: '44px' }} {...FADE_UP()}>
        <p style={{
          fontFamily: 'var(--font-poppins), sans-serif',
          fontWeight: 400,
          color: '#BD886A',
          fontSize: '16px',
          lineHeight: '1.7',
          marginBottom: '28px',
        }}>
          {resultado.costoInaccion}
        </p>

        <div style={{ height: '1px', backgroundColor: 'rgba(196,158,80,0.2)', marginBottom: '28px' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <span style={{
              fontFamily: 'var(--font-poppins), sans-serif',
              fontSize: '10px',
              fontWeight: 700,
              color: '#C49E50',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              flexShrink: 0,
              paddingTop: '4px',
              minWidth: '96px',
            }}>
              No prometemos
            </span>
            <p style={{
              fontFamily: 'var(--font-poppins), sans-serif',
              fontWeight: 400,
              color: '#3D3520',
              fontSize: '16px',
              lineHeight: '1.65',
              margin: 0,
            }}>
              {resultado.visionFuturo.noPrometemos}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <span style={{
              fontFamily: 'var(--font-poppins), sans-serif',
              fontSize: '10px',
              fontWeight: 700,
              color: '#C49E50',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              flexShrink: 0,
              paddingTop: '4px',
              minWidth: '96px',
            }}>
              Prometemos
            </span>
            <p style={{
              fontFamily: 'var(--font-poppins), sans-serif',
              fontWeight: 400,
              color: '#3D3520',
              fontSize: '16px',
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
          fontFamily: 'var(--font-poppins), sans-serif',
          fontSize: '9px',
          fontWeight: 700,
          color: 'rgba(253,250,246,0.55)',
          textTransform: 'uppercase',
          letterSpacing: '3px',
          marginBottom: '16px',
        }}>
          Tu primer paso
        </p>

        <p style={{
          fontFamily: 'var(--font-poppins), sans-serif',
          fontSize: '16px',
          fontWeight: 600,
          color: '#FDFAF6',
          lineHeight: '1.4',
          marginBottom: '12px',
        }}>
          {resultado.primerPaso}
        </p>

        <p style={{
          fontFamily: 'var(--font-poppins), sans-serif',
          fontWeight: 400,
          color: 'rgba(253,250,246,0.7)',
          fontSize: '15px',
          lineHeight: '1.65',
          marginBottom: '28px',
        }}>
          {resultado.descripcionProducto}
        </p>

        {/* ── BLOQUE MEMBRESÍA (C49) ─────────────────────────── */}
        <div style={{
          borderTop: '1px solid rgba(253,250,246,0.2)',
          paddingTop: '20px',
          marginBottom: '20px',
        }}>
          <p style={{
            fontFamily: 'var(--font-poppins), sans-serif',
            fontSize: '11px',
            fontWeight: 700,
            color: 'rgba(253,250,246,0.55)',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '6px',
          }}>
            ¿Ya hiciste el Taller Grabado?
          </p>
          <p style={{
            fontFamily: 'var(--font-poppins), sans-serif',
            fontWeight: 400,
            fontSize: '14px',
            color: 'rgba(253,250,246,0.75)',
            lineHeight: '1.6',
            marginBottom: '10px',
          }}>
            Tu siguiente paso es la Membresía <em>Un Camino para Sanar</em>. También incluye sesión grupal en vivo semanal con Ana y Alex.
          </p>
          <a
            href={URL_MEMBRESIA}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-poppins), sans-serif',
              fontSize: '13px',
              fontWeight: 600,
              color: '#C49E50',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            }}
          >
            Ver la Membresía Un Camino para Sanar →
          </a>
        </div>

        <a
          href={urlProducto}
          target={urlProducto.startsWith('mailto') ? undefined : '_blank'}
          rel="noopener noreferrer"
          className="block w-full text-center transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
          style={{
            fontFamily: 'var(--font-poppins), sans-serif',
            fontSize: '18px',
            fontWeight: 700,
            letterSpacing: '0.5px',
            backgroundColor: '#FDFAF6',
            color: '#3D3520',
            padding: '18px 40px',
            borderRadius: '8px',
            textDecoration: 'none',
            display: 'block',
          }}
        >
          {resultado.ctaTexto}
        </a>

        {resultado.ctaSecundario && (
          <a
            href="mailto:hola@regalametuhistoria.com"
            className="block w-full text-center transition-all duration-200 hover:opacity-80"
            style={{
              fontFamily: 'var(--font-poppins), sans-serif',
              fontSize: '15px',
              fontWeight: 400,
              color: 'rgba(253,250,246,0.7)',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              marginTop: '12px',
              display: 'block',
            }}
          >
            {resultado.ctaSecundario}
          </a>
        )}

      </motion.div>

      {/* ── SESIÓN 1:1 — solo perfil crisis aguda ─────────────── */}
      {resultado.etiqueta === 'perfil-crisis-aguda' && URL_AGENDA_1_1 && (
        <motion.div
          style={{
            borderRadius: '12px',
            padding: 'clamp(28px, 5vw, 40px) clamp(24px, 5vw, 36px)',
            backgroundColor: '#FDFAF6',
            border: '1.5px solid #C49E50',
            marginTop: '16px',
            textAlign: 'center',
          }}
          {...FADE_UP()}
        >
          <p style={{
            fontFamily: 'var(--font-poppins), sans-serif',
            fontSize: '10px',
            fontWeight: 700,
            color: '#C49E50',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            marginBottom: '14px',
          }}>
            ¿Necesitas hablar con alguien ahora?
          </p>
          <p style={{
            fontFamily: 'var(--font-playfair), serif',
            fontStyle: 'italic',
            fontSize: '1.25rem',
            color: '#3D3520',
            lineHeight: 1.5,
            marginBottom: '10px',
          }}>
            Agenda una sesión 1:1 con Ana y Alex
          </p>
          <p style={{
            fontFamily: 'var(--font-poppins), sans-serif',
            fontSize: '15px',
            color: '#8A7E6E',
            lineHeight: 1.65,
            marginBottom: '24px',
          }}>
            Por lo que respondiste, tu situación merece acompañamiento personal — no solo
            contenido. Elige el día y la hora que te sirvan, y hablamos directamente contigo.
          </p>
          <a
            href={URL_AGENDA_1_1}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
            style={{
              fontFamily: 'var(--font-poppins), sans-serif',
              fontSize: '16px',
              fontWeight: 700,
              letterSpacing: '0.5px',
              backgroundColor: '#C49E50',
              color: '#FDFAF6',
              padding: '16px 36px',
              borderRadius: '8px',
              textDecoration: 'none',
            }}
          >
            Reservar mi sesión 1:1 →
          </a>
        </motion.div>
      )}

    </div>
  )
}
