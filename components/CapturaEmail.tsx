'use client'

import { useState } from 'react'

interface CapturaEmailProps {
  onSubmit: (nombre: string, email: string) => Promise<void>
  cargando: boolean
}

export default function CapturaEmail({ onSubmit, cargando }: CapturaEmailProps) {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [acepto, setAcepto] = useState(false)

  const valido = nombre.trim().length > 0 && email.includes('@') && acepto

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!valido || cargando) return
    onSubmit(nombre.trim(), email.trim())
  }

  return (
    <div
      className="rounded-2xl p-8 md:p-10 shadow-sm"
      style={{ backgroundColor: '#FDFAF6', border: '1px solid #E0D5C4' }}
    >
      <p
        className="text-center mb-1"
        style={{ fontFamily: 'Inter, sans-serif', color: '#BD886A', fontSize: '0.875rem' }}
      >
        Has llegado hasta aquí. Eso ya dice mucho de ti.
      </p>
      <h2
        className="text-center mb-2"
        style={{ fontFamily: 'Playfair Display, serif', color: '#C49E50', fontSize: '1.75rem', fontWeight: 700 }}
      >
        Ya casi está
      </h2>
      <p
        className="text-center mb-1"
        style={{ fontFamily: 'Playfair Display, serif', color: '#3D3520', fontSize: '1.125rem' }}
      >
        Tu camino a la restauración está listo.
      </p>
      <p
        className="text-center mb-8"
        style={{ fontFamily: 'Inter, sans-serif', color: '#BD886A', fontSize: '0.9375rem' }}
      >
        Te enviamos tu camino completo con la ruta que hemos trazado para ti.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <input
            type="text"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            placeholder="¿Cómo te llamamos?"
            required
            className="w-full px-4 py-3 rounded-xl border focus:outline-none transition-colors"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.9375rem',
              color: '#3D3520',
              backgroundColor: '#FDFAF6',
              borderColor: '#E0D5C4',
            }}
            onFocus={e => (e.target.style.borderColor = '#6B783E')}
            onBlur={e => (e.target.style.borderColor = '#E0D5C4')}
          />
        </div>
        <div>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="el que revisas de verdad"
            required
            className="w-full px-4 py-3 rounded-xl border focus:outline-none transition-colors"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.9375rem',
              color: '#3D3520',
              backgroundColor: '#FDFAF6',
              borderColor: '#E0D5C4',
            }}
            onFocus={e => (e.target.style.borderColor = '#6B783E')}
            onBlur={e => (e.target.style.borderColor = '#E0D5C4')}
          />
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <div className="relative flex-shrink-0 mt-0.5">
            <input
              type="checkbox"
              checked={acepto}
              onChange={e => setAcepto(e.target.checked)}
              className="sr-only"
            />
            <div
              className="w-5 h-5 rounded border-2 flex items-center justify-center transition-colors"
              style={{
                borderColor: acepto ? '#6B783E' : '#E0D5C4',
                backgroundColor: acepto ? '#6B783E' : 'transparent',
              }}
            >
              {acepto && (
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', color: '#BD886A', lineHeight: '1.5' }}>
            He leído y acepto la política de privacidad de Regálame tu Historia.
            Puedo darme de baja cuando quiera.
          </span>
        </label>

        <button
          type="submit"
          disabled={!valido || cargando}
          className="w-full py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-3 mt-2"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '1rem',
            backgroundColor: valido && !cargando ? '#6B783E' : '#A8B58A',
            color: '#FDFAF6',
            cursor: valido && !cargando ? 'pointer' : 'not-allowed',
          }}
        >
          {cargando ? (
            <>
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Preparando tu camino...
            </>
          ) : (
            'Ver mi camino →'
          )}
        </button>
      </form>
    </div>
  )
}
