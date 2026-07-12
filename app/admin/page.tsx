'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  async function entrar(e: React.FormEvent) {
    e.preventDefault()
    if (!password || cargando) return
    setCargando(true)
    setError('')

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        router.push('/admin/pipeline')
        return
      }
      const data = await res.json().catch(() => null)
      setError(data?.error || 'Clave incorrecta')
    } catch {
      setError('Error de conexión. Reintenta.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: '#F5EDE0' }}
    >
      <form
        onSubmit={entrar}
        className="w-full"
        style={{
          maxWidth: '360px',
          backgroundColor: '#FDFAF6',
          border: '1px solid #E0D5C4',
          borderRadius: '12px',
          padding: '32px',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-playfair), serif',
            fontStyle: 'italic',
            fontSize: '1.5rem',
            color: '#3D3520',
            marginBottom: '4px',
          }}
        >
          Panel RTH
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-poppins), sans-serif',
            fontSize: '0.8125rem',
            color: '#BD886A',
            marginBottom: '24px',
          }}
        >
          Acceso solo para el equipo
        </p>

        <label
          htmlFor="clave"
          style={{
            display: 'block',
            fontFamily: 'var(--font-poppins), sans-serif',
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: '#3D3520',
            marginBottom: '8px',
          }}
        >
          Clave de acceso
        </label>
        <input
          id="clave"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoFocus
          className="w-full outline-none"
          style={{
            fontFamily: 'var(--font-poppins), sans-serif',
            fontSize: '1rem',
            padding: '12px 14px',
            border: '1px solid #E0D5C4',
            borderRadius: '8px',
            backgroundColor: '#FDFAF6',
            color: '#3D3520',
            marginBottom: '16px',
          }}
        />

        {error && (
          <p
            style={{
              fontFamily: 'var(--font-poppins), sans-serif',
              fontSize: '0.8125rem',
              color: '#B0563C',
              marginBottom: '16px',
            }}
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={!password || cargando}
          className="w-full transition-opacity"
          style={{
            fontFamily: 'var(--font-poppins), sans-serif',
            fontWeight: 600,
            fontSize: '0.9375rem',
            backgroundColor: '#6B783E',
            color: '#FDFAF6',
            padding: '12px 0',
            borderRadius: '8px',
            opacity: !password || cargando ? 0.5 : 1,
            cursor: !password || cargando ? 'not-allowed' : 'pointer',
          }}
        >
          {cargando ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </main>
  )
}
