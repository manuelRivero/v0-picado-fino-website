import type { Metadata } from 'next'
import { Inter, Playfair_Display, Cormorant_Garamond, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { getOgImage, getSiteUrl, SITE_META_DESCRIPTION } from '@/lib/metadata'

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter'
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair'
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
})

const ogImage = getOgImage()

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: 'Picado Fino | Parrilla Argentina - Dos Experiencias Únicas',
  description: SITE_META_DESCRIPTION,
  generator: 'v0.app',
  openGraph: {
    description: SITE_META_DESCRIPTION,
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    description: SITE_META_DESCRIPTION,
    images: [ogImage.url],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable} ${cormorant.variable} ${dmSans.variable} bg-background`}>
      <body className="font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
