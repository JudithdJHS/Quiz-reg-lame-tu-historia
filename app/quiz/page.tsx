'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import { PREGUNTAS } from '@/lib/quiz-data'
import { clasificar } from '@/lib/clasificador'
import QuizProgress from '@/components/QuizProgress'
import QuizCard from '@/components/QuizCard'
import CapturaEmail from '@/components/CapturaEmail'
import type { QuizSesion } from '@/types/quiz'

const TOTAL = PREGUNTAS.length

export default function QuizPage() {
  const router = useRouter()
  const [indice, setIndice] = useState(0)
  const [respuestas, setRespuestas] = useState<Record<string, string>>({})
  const [fase, setFase] = useState<'quiz' | 'captura'>('quiz')
  const [cargando, setCargando] = useState(false)

  const preguntaActual = PREGUNTAS[indice]

  function handleRespuesta(opcionId: string) {
    const nuevas = { ...respuestas, [preguntaActual.id]: opcionId }
    setRespuestas(nuevas)
    if (indice + 1 < TOTAL) {
      setIndice(indice + 1)
    } else {
      setFase('captura')
    }
  }

  async function handleSubmit(nombre: string, email: string) {
    setCargando(true)

    // Clasificar en el cliente — navegación inmediata sin esperar API
    const clasificacion = clasificar(respuestas)
    const sesion: QuizSesion = {
      completado: true,
      perfil: clasificacion.perfil,
      temperatura: clasificacion.temperatura,
      compromiso: clasificacion.compromiso,
      nombre,
      timestamp: Date.now(),
      q3: respuestas.q3,
    }
    sessionStorage.setItem('rth_quiz_resultado', JSON.stringify(sesion))

    // Registrar en APIs en background — sin bloquear navegación
    const utm = new URLSearchParams(window.location.search)
    fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre,
        email,
        respuestas,
        utmSource: utm.get('utm_source') || undefined,
        utmMedium: utm.get('utm_medium') || undefined,
        utmCampaign: utm.get('utm_campaign') || undefined,
      }),
    }).catch(() => {})

    router.push('/resultado')
  }

  return (
    <main
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: '#F5EDE0' }}
    >
      <header className="w-full flex justify-center px-6" style={{ paddingTop: '20px', paddingBottom: '16px' }}>
        <Image
          src="/Logo-a-color_modf.svg"
          alt="Regálame tu Historia"
          width={200}
          height={83}
          priority
          style={{ height: 'clamp(56px, 9vw, 72px)', width: 'auto' }}
        />
      </header>

      <div className="flex-1 w-full max-w-xl mx-auto px-6 pb-12">
        <AnimatePresence mode="wait">
          {fase === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-8">
                <QuizProgress current={indice + 1} total={TOTAL} />
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={preguntaActual.id}
                  initial={{ opacity: 0, x: 32 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -32 }}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                >
                  <QuizCard
                    pregunta={preguntaActual}
                    indice={indice}
                    total={TOTAL}
                    onRespuesta={handleRespuesta}
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}

          {fase === 'captura' && (
            <motion.div
              key="captura"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <CapturaEmail onSubmit={handleSubmit} cargando={cargando} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
