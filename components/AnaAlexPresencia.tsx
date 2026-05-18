'use client'

import { useState } from 'react'

interface AnaAlexPresenciaProps {
  persona: 'ana' | 'alex'
  grande?: boolean
}

export default function AnaAlexPresencia({ persona, grande = false }: AnaAlexPresenciaProps) {
  const [imgError, setImgError] = useState(false)

  const nombre = persona === 'ana' ? 'Ana' : 'Alex'
  const src = '/Ana y Alex 2.jpg'
  const objectPosition = '62% 20%'
  const size = grande ? 'w-40 h-40 md:w-56 md:h-56' : 'w-9 h-9 md:w-16 md:h-16'

  return (
    <div className={`flex ${grande ? 'flex-col items-center gap-4' : 'items-center gap-2 md:gap-3'}`}>
      <div
        className={`${size} rounded-full overflow-hidden flex-shrink-0 border-2`}
        style={{
          borderColor: '#C49E50',
          background: 'linear-gradient(135deg, #F5EDE0 0%, #EDD5B0 55%, #C49E5028 100%)',
        }}
      >
        {!imgError ? (
          <img
            src={src}
            alt={nombre}
            className="w-full h-full object-cover"
            style={{ objectPosition }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10%',
              gap: '2px',
            }}
          >
            <span
              style={{
                fontFamily: 'Playfair Display, serif',
                color: '#C49E50',
                fontSize: grande ? '1.375rem' : '0.8125rem',
                fontStyle: 'italic',
                fontWeight: 600,
                textAlign: 'center',
                lineHeight: 1.2,
              }}
            >
              {nombre}
            </span>
            <span
              style={{
                fontFamily: 'Playfair Display, serif',
                color: '#BD886A',
                fontSize: grande ? '0.75rem' : '0.625rem',
                fontStyle: 'italic',
                textAlign: 'center',
                lineHeight: 1.2,
              }}
            >
              RTH
            </span>
          </div>
        )}
      </div>

      {!grande && (
        <span style={{
          fontFamily: 'Inter, sans-serif',
          color: '#BD886A',
          fontSize: 'clamp(0.8125rem, 2vw, 0.875rem)',
        }}>
          {nombre} te acompaña
        </span>
      )}
    </div>
  )
}
