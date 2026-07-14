const ESTILO_BOTON = {
  display: 'inline-block',
  background: '#6B783E',
  color: '#FDFAF6',
  padding: '16px 36px',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: 700,
  fontFamily: 'var(--font-poppins), sans-serif',
  fontSize: '16px',
} as const

export default function GraciasTallerPage({
  searchParams,
}: {
  searchParams: { nombre?: string; email?: string }
}) {
  const urlSkool = process.env.URL_SKOOL_TALLER || 'https://www.skool.com'
  const nombre = searchParams.nombre?.trim()
  const email = searchParams.email?.trim()

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F5EDE0' }}>
      <header className="w-full flex justify-center px-6" style={{ paddingTop: '24px', paddingBottom: '8px' }}>
        <img
          src="/Logo-a-color_modf.svg"
          alt="Regálame tu Historia"
          style={{ height: 'clamp(56px, 9vw, 72px)', width: 'auto' }}
        />
      </header>

      <div className="mx-auto px-4 pb-16 text-center" style={{ maxWidth: '560px', marginTop: '24px' }}>
        <p style={{ fontSize: '3rem', marginBottom: '12px' }}>🌿</p>

        <h1
          style={{
            fontFamily: 'var(--font-playfair), serif',
            fontStyle: 'italic',
            fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
            color: '#6B783E',
            marginBottom: '12px',
          }}
        >
          {nombre ? `${nombre}, tu lugar está confirmado` : 'Tu lugar está confirmado'}
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-poppins), sans-serif',
            fontSize: '15px',
            color: '#3D3520',
            lineHeight: 1.7,
            marginBottom: '32px',
          }}
        >
          Bienvenido/a al taller <strong>Del Infierno al Cielo en el Matrimonio</strong>. Diste
          un paso que muchas personas posponen durante años — y lo diste hoy.
        </p>

        <div
          style={{
            background: '#FDFAF6',
            border: '1px solid #E0D5C4',
            borderRadius: '12px',
            padding: '28px 24px',
            textAlign: 'left',
            marginBottom: '24px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-poppins), sans-serif',
              fontSize: '12px',
              fontWeight: 700,
              color: '#C49E50',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '16px',
            }}
          >
            Tu siguiente paso
          </p>
          <ol style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '15px', color: '#3D3520', lineHeight: 2 }}>
            <li>
              En unos minutos te llega un correo aparte, directo de Skool, con tu acceso al taller
              ya desbloqueado — sin que tengas que pedir nada.
            </li>
            <li>
              Ábrelo y entra con el mismo correo que usaste para pagar
              {email ? <>: <strong>{email}</strong></> : '.'}
            </li>
          </ol>
        </div>

        <a href={urlSkool} style={ESTILO_BOTON}>
          Entrar al taller →
        </a>

        <p
          style={{
            fontFamily: 'var(--font-poppins), sans-serif',
            fontSize: '13px',
            color: '#8A7E6E',
            marginTop: '20px',
            lineHeight: 1.7,
          }}
        >
          También te enviamos este acceso por correo{email ? <> a <strong>{email}</strong></> : ''}. Si
          algo no funciona, responde ese correo y te ayudamos personalmente.
          <br />
          — Ana y Alex
        </p>
      </div>
    </main>
  )
}
