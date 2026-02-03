import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'
import StructuredData from './components/StructuredData'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://saidkocu.com'),
  title: 'Said Koçu',
  description: 'Psikoloji kuramlarını teknoloji ve yapay zeka ile harmanlayan girişimci',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  authors: [{ name: 'Said Koçu', url: 'https://saidkocu.com' }],
  creator: 'Said Koçu',
  publisher: 'Said Koçu',
  openGraph: {
    title: 'Said Koçu | Gelişim ve Teknoloji',
    description: 'Psikoloji kuramlarını teknoloji ve yapay zeka ile harmanlayan girişimci',
    url: '/',
    siteName: 'Said Koçu',
    locale: 'tr_TR',
    images: [
      {
        url: '/api/og?title=Said Koçu | Gelişim ve Teknoloji',
        width: 1200,
        height: 630,
        alt: 'Said Koçu',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Said Koçu | Gelişim ve Teknoloji',
    description: 'Psikoloji kuramlarını teknoloji ve yapay zeka ile harmanlayan girişimci',
    images: ['/api/og?title=Said Koçu | Gelişim ve Teknoloji'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <StructuredData />
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
