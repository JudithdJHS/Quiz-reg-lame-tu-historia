'use client'

import { useState } from 'react'
import Script from 'next/script'

interface CheckoutParams {
  publicKey: string
  currency: string
  amountInCents: number
  reference: string
  signatureIntegrity: string
}

type Paso = 'datos' | 'pago' | 'aprobado' | 'rechazado' | 'pendiente'

declare global {
  interface Window {
    WidgetCheckout?: new (config: Record<string, unknown>) => {
      open: (cb: (result: { transaction?: { status?: string } }) => void) => void
    }
  }
}

const INPUT_STYLE: React.CSSProperties = {
  width: '100%',
  padding: '14px 16px',
  borderRadius: '8px',
  border: '1px solid #E0D5C4',
  background: '#FDFAF6',
  color: '#3D3520',
  fontFamily: 'var(--font-poppins), sans-serif',
  fontSize: '16px',
  outline: 'none',
}

const LABEL_STYLE: React.CSSProperties = {
  fontFamily: 'var(--font-poppins), sans-serif',
  fontSize: '13px',
  fontWeight: 600,
  color: '#3D3520',
  display: 'block',
  marginBottom: '6px',
}

function formatearMonto(amountInCents: number, currency: string): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amountInCents / 100)
}

export default function ComprarPage() {
  const [paso, setPaso] = useState<Paso>('datos')
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [checkout, setCheckout] = useState<CheckoutParams | null>(null)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  const datosValidos = nombre.trim().length > 1 && email.includes('@') && whatsapp.trim().length >= 7

  async function enviarDatos(e: React.FormEvent) {
    e.preventDefault()
    if (!datosValidos || cargando) return
    setCargando(true)
    setError('')
    try {
      const res = await fetch('/api/checkout-iniciado', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nombre.trim(), email: email.trim(), whatsapp: whatsapp.trim() }),
      })
      const json = await res.json()
      if (!json.ok || !json.checkout) throw new Error(json.error || 'Error')
      setCheckout(json.checkout)
      setPaso('pago')
    } catch {
      setError('No pudimos procesar tus datos. Intenta de nuevo en un momento.')
    } finally {
      setCargando(false)
    }
  }

  function abrirWompi() {
    if (!checkout || !window.WidgetCheckout) {
      setError('El módulo de pago aún está cargando. Espera unos segundos e intenta de nuevo.')
      return
    }
    setError('')
    const widget = new window.WidgetCheckout({
      currency: checkout.currency,
      amountInCents: checkout.amountInCents,
      reference: checkout.reference,
      publicKey: checkout.publicKey,
      signature: { integrity: checkout.signatureIntegrity },
      customerData: {
        email,
        fullName: nombre,
        phoneNumber: whatsapp.replace(/\D/g, ''),
        phoneNumberPrefix: '+57',
      },
    })
    widget.open((result) => {
      const status = result?.transaction?.status
      if (status === 'APPROVED') setPaso('aprobado')
      else if (status === 'DECLINED' || status === 'ERROR') setPaso('rechazado')
      else setPaso('pendiente')
    })
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F5EDE0' }}>
      <Script src="https://checkout.wompi.co/widget.js" strategy="afterInteractive" />

      <header className="w-full flex justify-center px-6" style={{ paddingTop: '24px', paddingBottom: '8px' }}>
        <img
          src="/Logo-a-color_modf.svg"
          alt="Regálame tu Historia"
          style={{ height: 'clamp(56px, 9vw, 72px)', width: 'auto' }}
        />
      </header>

      <div className="mx-auto px-4 pb-16" style={{ maxWidth: '520px' }}>

        <div className="text-center" style={{ marginTop: '24px', marginBottom: '32px' }}>
          <p style={{
            fontFamily: 'var(--font-playfair), serif',
            fontStyle: 'italic',
            color: '#C49E50',
            fontSize: 'clamp(1rem, 3vw, 1.25rem)',
            marginBottom: '8px',
          }}>
            Tu inscripción al taller
          </p>
          <h1 style={{
            fontFamily: 'var(--font-playfair), serif',
            fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
            fontWeight: 400,
            color: '#3D3520',
            lineHeight: 1.2,
          }}>
            Del Infierno al Cielo <em style={{ color: '#C49E50' }}>en el Matrimonio</em>
          </h1>
        </div>

        {/* Indicador de pasos */}
        {(paso === 'datos' || paso === 'pago') && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '28px' }}>
            {['datos', 'pago'].map((p, i) => (
              <div key={p} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-poppins), sans-serif', fontSize: '13px', fontWeight: 700,
                  background: paso === p || (paso === 'pago' && p === 'datos') ? '#6B783E' : '#E0D5C4',
                  color: paso === p || (paso === 'pago' && p === 'datos') ? '#FDFAF6' : '#8A7E6E',
                }}>
                  {i + 1}
                </div>
                <span style={{
                  fontFamily: 'var(--font-poppins), sans-serif', fontSize: '13px',
                  color: paso === p ? '#3D3520' : '#8A7E6E',
                  fontWeight: paso === p ? 600 : 400,
                }}>
                  {p === 'datos' ? 'Tus datos' : 'Tu pago'}
                </span>
                {i === 0 && <div style={{ width: '32px', height: '1px', background: '#C49E50', opacity: 0.4 }} />}
              </div>
            ))}
          </div>
        )}

        {/* ── PASO 1: DATOS ─────────────────────────────────── */}
        {paso === 'datos' && (
          <form
            onSubmit={enviarDatos}
            style={{
              background: '#FDFAF6',
              border: '1px solid #E0D5C4',
              borderRadius: '12px',
              padding: '28px 24px',
            }}
          >
            <p style={{
              fontFamily: 'var(--font-playfair), serif',
              fontStyle: 'italic',
              fontSize: '1.125rem',
              color: '#3D3520',
              marginBottom: '20px',
            }}>
              ¿A nombre de quién hacemos tu inscripción?
            </p>

            <div style={{ marginBottom: '16px' }}>
              <label style={LABEL_STYLE} htmlFor="nombre">Tu nombre</label>
              <input
                id="nombre" type="text" value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="¿Cómo te llamamos?"
                style={INPUT_STYLE} autoComplete="name"
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={LABEL_STYLE} htmlFor="email">Tu correo</label>
              <input
                id="email" type="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="el que revisas de verdad"
                style={INPUT_STYLE} autoComplete="email"
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={LABEL_STYLE} htmlFor="whatsapp">Tu WhatsApp</label>
              <input
                id="whatsapp" type="tel" value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="300 123 4567"
                style={INPUT_STYLE} autoComplete="tel"
              />
              <p style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontSize: '12px', color: '#8A7E6E', marginTop: '6px',
              }}>
                Solo lo usamos para acompañarte con tu inscripción. Nada de spam.
              </p>
            </div>

            <button
              type="submit"
              disabled={!datosValidos || cargando}
              className="w-full transition-all duration-200 hover:opacity-90"
              style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontSize: '16px', fontWeight: 700, letterSpacing: '0.5px',
                background: datosValidos && !cargando ? '#6B783E' : '#E0D5C4',
                color: datosValidos && !cargando ? '#FDFAF6' : '#8A7E6E',
                padding: '16px', borderRadius: '8px', border: 'none',
                cursor: datosValidos && !cargando ? 'pointer' : 'not-allowed',
              }}
            >
              {cargando ? 'Un momento…' : 'Continuar al pago →'}
            </button>
          </form>
        )}

        {/* ── PASO 2: PAGO ──────────────────────────────────── */}
        {paso === 'pago' && checkout && (
          <div style={{
            background: '#FDFAF6',
            border: '1px solid #E0D5C4',
            borderRadius: '12px',
            padding: '28px 24px',
            textAlign: 'center',
          }}>
            <p style={{
              fontFamily: 'var(--font-poppins), sans-serif',
              fontSize: '14px', color: '#8A7E6E', marginBottom: '4px',
            }}>
              Inscripción a nombre de <strong style={{ color: '#3D3520' }}>{nombre}</strong>
            </p>
            <p style={{
              fontFamily: 'var(--font-playfair), serif',
              fontSize: '2rem', color: '#3D3520', marginBottom: '20px',
            }}>
              {formatearMonto(checkout.amountInCents, checkout.currency)}
            </p>

            <div style={{
              textAlign: 'left',
              background: '#F5EDE0',
              borderRadius: '8px',
              padding: '16px 20px',
              marginBottom: '24px',
            }}>
              <p style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontSize: '12px', fontWeight: 700, color: '#C49E50',
                textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px',
              }}>
                Puedes pagar con
              </p>
              {[
                '💳 Tarjeta — en cuotas de 1 a 36 meses',
                '🏦 PSE — desde tu cuenta bancaria',
                '📱 Nequi',
                '🗓️ Compra y Paga Después (Bancolombia) — 4 cuotas sin interés, sin tarjeta',
              ].map((m) => (
                <p key={m} style={{
                  fontFamily: 'var(--font-poppins), sans-serif',
                  fontSize: '14px', color: '#3D3520', lineHeight: 1.9,
                }}>
                  {m}
                </p>
              ))}
            </div>

            <button
              onClick={abrirWompi}
              className="w-full transition-all duration-200 hover:opacity-90"
              style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontSize: '17px', fontWeight: 700, letterSpacing: '0.5px',
                background: '#6B783E', color: '#FDFAF6',
                padding: '18px', borderRadius: '8px', border: 'none', cursor: 'pointer',
              }}
            >
              Pagar de forma segura →
            </button>
            <p style={{
              fontFamily: 'var(--font-poppins), sans-serif',
              fontSize: '12px', color: '#8A7E6E', marginTop: '10px',
            }}>
              Pago procesado por Wompi (Bancolombia). Tus datos van cifrados.
            </p>
          </div>
        )}

        {/* ── RESULTADOS ────────────────────────────────────── */}
        {paso === 'aprobado' && (
          <div style={{
            background: '#EAF3DE', border: '1px solid #6B783E',
            borderRadius: '12px', padding: '36px 28px', textAlign: 'center',
          }}>
            <p style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🌿</p>
            <h2 style={{
              fontFamily: 'var(--font-playfair), serif', fontStyle: 'italic',
              fontSize: '1.5rem', color: '#6B783E', marginBottom: '12px',
            }}>
              Tu lugar está confirmado
            </h2>
            <p style={{
              fontFamily: 'var(--font-poppins), sans-serif',
              fontSize: '15px', color: '#3D3520', lineHeight: 1.7,
            }}>
              Te enviamos a <strong>{email}</strong> el acceso al grupo privado del taller.
              Revisa tu correo (también la carpeta de promociones) en los próximos minutos.
            </p>
          </div>
        )}

        {paso === 'rechazado' && (
          <div style={{
            background: '#FAECE7', border: '1px solid #BD886A',
            borderRadius: '12px', padding: '36px 28px', textAlign: 'center',
          }}>
            <h2 style={{
              fontFamily: 'var(--font-playfair), serif', fontStyle: 'italic',
              fontSize: '1.5rem', color: '#BD886A', marginBottom: '12px',
            }}>
              Tu pago no pasó — pero tiene solución
            </h2>
            <p style={{
              fontFamily: 'var(--font-poppins), sans-serif',
              fontSize: '15px', color: '#3D3520', lineHeight: 1.7, marginBottom: '24px',
            }}>
              Esto casi siempre es un detalle del banco, no tuyo. Puedes intentar con otro
              método: PSE, Nequi, u otra tarjeta. También te enviamos un correo con el enlace.
            </p>
            <button
              onClick={() => setPaso('pago')}
              style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontSize: '16px', fontWeight: 700,
                background: '#6B783E', color: '#FDFAF6',
                padding: '16px 32px', borderRadius: '8px', border: 'none', cursor: 'pointer',
              }}
            >
              Intentar con otro método →
            </button>
          </div>
        )}

        {paso === 'pendiente' && (
          <div style={{
            background: '#FDFAF6', border: '1px solid #E0D5C4',
            borderRadius: '12px', padding: '36px 28px', textAlign: 'center',
          }}>
            <h2 style={{
              fontFamily: 'var(--font-playfair), serif', fontStyle: 'italic',
              fontSize: '1.5rem', color: '#C49E50', marginBottom: '12px',
            }}>
              Tu pago está en proceso
            </h2>
            <p style={{
              fontFamily: 'var(--font-poppins), sans-serif',
              fontSize: '15px', color: '#3D3520', lineHeight: 1.7,
            }}>
              Algunos métodos (como PSE) tardan unos minutos en confirmarse.
              En cuanto tu banco apruebe el pago, te llega el acceso a <strong>{email}</strong>.
            </p>
          </div>
        )}

        {error && (
          <p style={{
            fontFamily: 'var(--font-poppins), sans-serif',
            fontSize: '14px', color: '#BD886A', textAlign: 'center', marginTop: '16px',
          }}>
            {error}
          </p>
        )}
      </div>

      <footer className="pb-8 text-center">
        <p style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '0.8125rem', color: '#BD886A' }}>
          © 2026 Regálame tu Historia · Ana y Alex
        </p>
      </footer>
    </main>
  )
}
