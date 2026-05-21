'use client'

interface QuizProgressProps {
  current: number
  total: number
}

export default function QuizProgress({ current, total }: QuizProgressProps) {
  const pct = Math.round((current / total) * 100)

  return (
    <div className="w-full">
      <div className="flex items-end justify-between mb-2">
        <span style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: '0.875rem',
          fontWeight: 600,
          color: '#6B783E',
          letterSpacing: '0.08em',
          textTransform: 'uppercase' as const,
        }}>
          Pregunta {current} de {total}
        </span>
        {/* Número grande en Playfair */}
        <span style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '1.75rem',
          fontWeight: 700,
          color: '#C49E50',
          lineHeight: '1',
          letterSpacing: '-0.02em',
        }}>
          {pct}
          <span style={{ fontSize: '0.875rem', fontWeight: 400, opacity: 0.6, marginLeft: '1px' }}>%</span>
        </span>
      </div>

      {/* Barra 8px */}
      <div style={{
        width: '100%',
        height: '8px',
        backgroundColor: 'rgba(196,158,80,0.12)',
        borderRadius: '4px',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          backgroundColor: '#C49E50',
          borderRadius: '4px',
          transition: 'width 500ms cubic-bezier(0.16, 1, 0.3, 1)',
        }} />
      </div>
    </div>
  )
}
