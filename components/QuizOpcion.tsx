'use client'

import { motion } from 'motion/react'

interface QuizOpcionProps {
  texto: string
  numero: number
  seleccionada: boolean
  onSelect: () => void
}

export default function QuizOpcion({ texto, numero, seleccionada, onSelect }: QuizOpcionProps) {
  const numStr = String(numero).padStart(2, '0')

  return (
    <motion.button
      onClick={onSelect}
      whileTap={{ scale: 0.99 }}
      className="w-full text-left focus:outline-none"
      style={{
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 400,
        fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
        lineHeight: '1.55',
        color: '#3D3520',
        backgroundColor: seleccionada ? '#FDFAF6' : '#FDFAF6',
        border: seleccionada
          ? '1.5px solid #6B783E'
          : '1.5px solid #E0D5C4',
        borderRadius: '12px',
        padding: '18px 24px',
        minHeight: '56px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '14px',
        boxShadow: seleccionada
          ? '0 2px 16px rgba(196,158,80,0.12)'
          : '0 1px 3px rgba(61,53,32,0.04)',
        transform: seleccionada ? 'translateX(3px)' : 'translateX(0px)',
        transition: 'border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease',
      }}
      onMouseEnter={e => {
        if (!seleccionada) {
          e.currentTarget.style.borderColor = '#6B783E'
          e.currentTarget.style.backgroundColor = 'rgba(107,120,62,0.07)'
          e.currentTarget.style.transform = 'translateX(3px)'
        }
      }}
      onMouseLeave={e => {
        if (!seleccionada) {
          e.currentTarget.style.borderColor = '#E0D5C4'
          e.currentTarget.style.backgroundColor = '#FDFAF6'
          e.currentTarget.style.transform = 'translateX(0px)'
        }
      }}
    >
      {/* Número 01, 02, 03... */}
      <span style={{
        fontFamily: 'Poppins, sans-serif',
        fontSize: '0.75rem',
        fontWeight: 600,
        color: seleccionada ? '#C49E50' : 'rgba(196,158,80,0.55)',
        flexShrink: 0,
        paddingTop: '3px',
        letterSpacing: '0.02em',
        minWidth: '20px',
        transition: 'color 180ms ease',
      }}>
        {numStr}
      </span>

      {/* Texto */}
      <span style={{ flex: 1, fontWeight: 400 }}>{texto}</span>

      {/* Check */}
      {seleccionada && (
        <div style={{
          flexShrink: 0,
          marginTop: '3px',
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          backgroundColor: '#C49E50',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M1.5 4l1.8 1.8 3.2-3.6" stroke="#FDFAF6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </motion.button>
  )
}
