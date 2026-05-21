import type { Metadata } from 'next'
import { Playfair_Display, Poppins } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: 'Tu Camino a la Restauración · Regálame tu Historia',
  description: 'Descubre qué camino está hecho para ti. Quiz de Ana y Alex, terapeutas de pareja y familia con más de 1.000 personas acompañadas.',
  openGraph: {
    title: 'Tu Camino a la Restauración · Regálame tu Historia',
    description: '¿Cuál es tu situación real? Responde con honestidad y descubre la ruta que hemos trazado para ti.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    locale: 'es_ES',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${poppins.variable}`}>
      <body style={{ backgroundColor: '#F5EDE0', color: '#3D3520', minHeight: '100vh' }}>
        {children}
      </body>
    </html>
  )
}
