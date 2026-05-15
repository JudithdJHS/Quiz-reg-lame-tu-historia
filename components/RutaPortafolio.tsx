'use client'

interface RutaPortafolioProps {
  pasos: string[]
}

export default function RutaPortafolio({ pasos }: RutaPortafolioProps) {
  return (
    <div className="mt-8">
      <h3
        className="mb-5 text-center"
        style={{ fontFamily: 'Playfair Display, serif', color: '#C49E50', fontSize: '1.25rem', fontWeight: 600 }}
      >
        Tu ruta completa
      </h3>
      <div className="flex flex-col gap-3">
        {pasos.map((paso, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-5 py-3 rounded-xl"
            style={{
              backgroundColor: i === 0 ? '#EAF3DE' : '#FDFAF6',
              border: `1px solid ${i === 0 ? '#6B783E' : '#E0D5C4'}`,
            }}
          >
            <div
              className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold"
              style={{
                backgroundColor: i === 0 ? '#6B783E' : '#E0D5C4',
                color: i === 0 ? '#FDFAF6' : '#BD886A',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {i + 1}
            </div>
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.9375rem',
                color: i === 0 ? '#3D3520' : '#BD886A',
                fontWeight: i === 0 ? 600 : 400,
              }}
            >
              {paso}
            </span>
            {i === 0 && (
              <span
                className="ml-auto text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ backgroundColor: '#6B783E', color: '#FDFAF6', fontFamily: 'Inter, sans-serif' }}
              >
                Primer paso
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
