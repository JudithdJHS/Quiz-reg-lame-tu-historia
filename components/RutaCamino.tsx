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
      {/* Label eyebrow */}
      <p style={{
        fontFamily: 'var(--font-poppins), sans-serif',
        fontSize: '10px',
        fontWeight: 700,
        color: '#C49E50',
        textTransform: 'uppercase',
        letterSpacing: '4px',
        textAlign: 'center',
        marginBottom: '28px',
      }}>
        Tu camino hacia aquí
      </p>

      <div style={{ position: 'relative' }}>
        {/* Línea conectora vertical */}
        <div style={{
          position: 'absolute',
          left: '17px',
          top: '18px',
          bottom: '18px',
          width: '1px',
          background: 'linear-gradient(to bottom, rgba(196,158,80,0.4) 0%, rgba(196,158,80,0.06) 100%)',
          zIndex: 0,
        }} />

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
                  border: esActivo ? 'none' : '1px solid #E0D5C4',
                  boxShadow: esActivo ? '0 4px 20px rgba(107,120,62,0.14)' : 'none',
                }}
              >
                {/* Número */}
                <div style={{
                  flexShrink: 0,
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-poppins), sans-serif',
                  fontSize: '14px',
                  fontWeight: 800,
                  backgroundColor: esActivo ? '#C49E50' : 'rgba(196,158,80,0.12)',
                  color: esActivo ? '#FDFAF6' : '#C49E50',
                  border: esActivo ? 'none' : '1px solid rgba(196,158,80,0.3)',
                }}>
                  {i + 1}
                </div>

                <div style={{ flex: 1, paddingTop: '4px' }}>
                  {esActivo && (
                    <p style={{
                      fontFamily: 'var(--font-poppins), sans-serif',
                      fontSize: '10px',
                      fontWeight: 700,
                      color: 'rgba(253,250,246,0.65)',
                      textTransform: 'uppercase',
                      letterSpacing: '3px',
                      marginBottom: '5px',
                    }}>
                      Tu primer paso
                    </p>
                  )}
                  <p style={{
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontSize: '16px',
                    fontWeight: 700,
                    color: esActivo ? '#FDFAF6' : '#3D3520',
                    lineHeight: '1.4',
                    margin: 0,
                    marginBottom: paso.descripcion ? '4px' : 0,
                  }}>
                    {paso.titulo}
                  </p>
                  {paso.descripcion && (
                    <p style={{
                      fontFamily: 'var(--font-poppins), sans-serif',
                      fontSize: '15px',
                      fontWeight: 400,
                      color: esActivo ? 'rgba(253,250,246,0.7)' : '#BD886A',
                      lineHeight: '1.5',
                      margin: 0,
                    }}>
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
              border: '1.5px solid rgba(196,158,80,0.4)',
              background: 'linear-gradient(135deg, #F5EDE0 0%, #EDE3D5 100%)',
              textAlign: 'center',
            }}
          >
            <div style={{
              width: '24px',
              height: '1px',
              backgroundColor: '#C49E50',
              margin: '0 auto 12px',
              opacity: 0.6,
            }} />
            <p style={{
              fontFamily: 'var(--font-playfair), serif',
              fontStyle: 'italic',
              fontSize: '17px',
              color: '#C49E50',
              fontWeight: 400,
              lineHeight: '1.5',
              margin: 0,
            }}>
              {destino}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
