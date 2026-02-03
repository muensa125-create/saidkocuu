import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hayatın Anlamı Nedir? | Said Koçu',
  description: 'Hayatın anlamı üzerine derin felsefi analizler. Mutluluk, aşk, para ve İslam perspektiflerinden hayatın anlamını keşfedin.',
  alternates: {
    canonical: '/hayatin-anlami-nedir',
  },
  openGraph: {
    title: 'Hayatın Anlamı Nedir? | Said Koçu',
    description: 'Hayatın anlamı üzerine derin felsefi analizler. Mutluluk, aşk, para ve İslam perspektiflerinden hayatın anlamını keşfedin.',
    url: '/hayatin-anlami-nedir',
    images: [
      {
        url: '/api/og?title=Hayatın Anlamı Nedir? | Said Koçu',
        width: 1200,
        height: 630,
        alt: 'Hayatın Anlamı Nedir? | Said Koçu',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hayatın Anlamı Nedir? | Said Koçu',
    description: 'Hayatın anlamı üzerine derin felsefi analizler. Mutluluk, aşk, para ve İslam perspektiflerinden hayatın anlamını keşfedin.',
    images: ['/api/og?title=Hayatın Anlamı Nedir? | Said Koçu'],
  },
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
