'use client'

import { motion } from 'motion/react'
import { PasoCamino } from '@/types/quiz'

interface RutaCaminoProps {
  pasos: PasoCamino[]
  destino: string
}

export default function RutaCamino({ pasos, destino }: RutaCaminoProps) {
  return (
    <div>
      {/* Label editorial */}
      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.6875rem',
          fontWeight: 600,
          color: '#C49E50',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          textAlign: 'center',
          marginBottom: '28px',
        }}
      >
        Tu camino hacia aquí
      </p>

      <div style={{ position: 'relative' }}>
        {/* Línea conectora vertical — 1px, editorial */}
        <div
          style={{
            position: 'absolute',
            left: '15px',
            top: '16px',
            bottom: '16px',
            width: '1px',
            background: 'linear-gradient(to bottom, rgba(196,158,80,0.4) 0%, rgba(196,158,80,0.06) 100%)',
            zIndex: 0,
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative', zIndex: 1 }}>
          {pasos.map((paso, i) => {
            const esActivo = i === 0
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.32, delay: i * 0.07 }}
                style={{
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start',
                  padding: esActivo ? '18px 18px 18px 14px' : '14px 16px 14px 14px',
                  borderRadius: '10px',
                  backgroundColor: esActivo ? '#6B783E' : 'transparent',
                  border: esActivo ? 'none' : '1px solid rgba(196,158,80,0.18)',
                  boxShadow: esActivo ? '0 4px 20px rgba(107,120,62,0.14)' : 'none',
                }}
              >
                {/* Número */}
                <div
                  style={{
                    flexShrink: 0,
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.02em',
                    backgroundColor: esActivo ? 'rgba(255,255,255,0.15)' : 'rgba(196,158,80,0.1)',
                    color: esActivo ? '#FDFAF6' : '#C49E50',
                    border: esActivo ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(196,158,80,0.25)',
                  }}
                >
                  {i + 1}
                </div>

                <div style={{ flex: 1, paddingTop: '4px' }}>
                  {esActivo && (
                    <p
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.625rem',
                        fontWeight: 700,
                        color: 'rgba(253,250,246,0.65)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        marginBottom: '5px',
                      }}
                    >
                      Tu primer paso
                    </p>
                  )}
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: esActivo ? '0.9375rem' : '0.875rem',
                      fontWeight: 600,
                      color: esActivo ? '#FDFAF6' : '#3D3520',
                      lineHeight: '1.45',
                      margin: 0,
                      marginBottom: paso.descripcion ? '5px' : 0,
                    }}
                  >
                    {paso.titulo}
                  </p>
                  {paso.descripcion && (
                    <p
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.8125rem',
                        color: esActivo ? 'rgba(253,250,246,0.65)' : '#BD886A',
                        lineHeight: '1.55',
                        margin: 0,
                      }}
                    >
                      {paso.descripcion}
                    </p>
                  )}
                </div>
              </motion.div>
            )
          })}

          {/* Destino final */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.38, delay: 0.18 }}
            style={{
              marginTop: '8px',
              padding: '20px',
              borderRadius: '10px',
              border: '1px solid rgba(196,158,80,0.35)',
              background: 'linear-gradient(135deg, #F5EDE0 0%, #EDE3D5 100%)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '24px',
                height: '1px',
                backgroundColor: '#C49E50',
                margin: '0 auto 12px',
                opacity: 0.6,
              }}
            />
            <p
              style={{
                fontFamily: 'Playfair Display, serif',
                fontStyle: 'italic',
                fontSize: '1.0625rem',
                color: '#C49E50',
                fontWeight: 600,
                lineHeight: '1.45',
                margin: 0,
                letterSpacing: '0.01em',
              }}
            >
              {destino}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
