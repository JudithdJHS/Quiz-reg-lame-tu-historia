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
          fontFamily: 'var(--font-poppins), sans-serif',
          fontSize: '13px',
          fontWeight: 600,
          color: '#8A7E6E',
          letterSpacing: '1px',
        }}>
          Pregunta {current} de {total}
        </span>
        {/* Número grande en Playfair */}
        <span style={{
          fontFamily: 'var(--font-playfair), serif',
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
        height: '6px',
        backgroundColor: '#E0D5C4',
        borderRadius: '3px',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          backgroundColor: '#6B783E',
          borderRadius: '3px',
          transition: 'width 500ms cubic-bezier(0.16, 1, 0.3, 1)',
        }} />
      </div>
    </div>
  )
}
