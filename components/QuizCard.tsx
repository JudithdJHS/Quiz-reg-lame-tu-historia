'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { PreguntaQuiz } from '@/types/quiz'
import QuizOpcion from './QuizOpcion'
import AnaAlexPresencia from './AnaAlexPresencia'

interface QuizCardProps {
  pregunta: PreguntaQuiz
  indice: number
  total: number
  onRespuesta: (opcionId: string) => void
}

export default function QuizCard({ pregunta, onRespuesta }: QuizCardProps) {
  const [seleccionada, setSeleccionada] = useState<string | null>(null)

  function handleSelect(opcionId: string) {
    if (seleccionada) return
    setSeleccionada(opcionId)
    setTimeout(() => onRespuesta(opcionId), 400)
  }

  return (
    <div>
      {/* Microcopy */}
      {pregunta.microcopy && (
        <p style={{
          fontFamily: 'Playfair Display, serif',
          fontStyle: 'italic',
          color: '#BD886A',
          fontSize: 'clamp(0.875rem, 1.8vw, 1rem)',
          textAlign: 'center',
          marginBottom: '18px',
          letterSpacing: '0.01em',
        }}>
          {pregunta.microcopy}
        </p>
      )}

      {/* Foto */}
      <div style={{ marginBottom: '16px' }}>
        <AnaAlexPresencia persona={pregunta.foto} />
      </div>

      {/* Línea divisora */}
      <div style={{
        width: '100%',
        height: '1px',
        backgroundColor: 'rgba(196,158,80,0.15)',
        marginBottom: '22px',
      }} />

      {/* Pregunta — Playfair Italic, serif con impacto emocional */}
      <h2 style={{
        fontFamily: 'Playfair Display, serif',
        fontStyle: 'italic',
        fontSize: 'clamp(1.375rem, 4vw, 1.625rem)',
        fontWeight: 700,
        color: '#6B783E',
        lineHeight: '1.35',
        letterSpacing: '-0.01em',
        textAlign: 'center',
        maxWidth: '680px',
        margin: '0 auto clamp(20px, 4vw, 30px)',
      }}>
        {pregunta.texto}
      </h2>

      {/* Opciones con número y stagger */}
      <div className="flex flex-col gap-2 md:gap-2.5">
        {pregunta.opciones.map((opcion, i) => (
          <motion.div
            key={opcion.id}
            initial={{ opacity: 0, y: 7 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: i * 0.05 }}
          >
            <QuizOpcion
              texto={opcion.texto}
              numero={i + 1}
              seleccionada={seleccionada === opcion.id}
              onSelect={() => handleSelect(opcion.id)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
