import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sevgilinizle Uyumunuz Ne Kadar? | Said Koçu',
  description: 'Kişilik testi ile sevgilinizle olan uyumunuzu ölçün',
  alternates: {
    canonical: '/sevgilinizle-uyumunuz-ne-kadar',
  },
  openGraph: {
    title: 'Sevgilinizle Uyumunuz Ne Kadar? | Said Koçu',
    description: 'Kişilik testi ile sevgilinizle olan uyumunuzu ölçün',
    url: '/sevgilinizle-uyumunuz-ne-kadar',
    images: [
      {
        url: '/api/og?title=Sevgilinizle Uyumunuz Ne Kadar? | Said Koçu',
        width: 1200,
        height: 630,
        alt: 'Sevgilinizle Uyumunuz Ne Kadar? | Said Koçu',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sevgilinizle Uyumunuz Ne Kadar? | Said Koçu',
    description: 'Kişilik testi ile sevgilinizle olan uyumunuzu ölçün',
    images: ['/api/og?title=Sevgilinizle Uyumunuz Ne Kadar? | Said Koçu'],
  },
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
