import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sevgilinizle Uyumunuz Ne Kadar? | Said Koçu',
  description: 'Kişilik testi ile sevgilinizle olan uyumunuzu ölçün',
  openGraph: {
    title: 'Sevgilinizle Uyumunuz Ne Kadar? | Said Koçu',
    description: 'Kişilik testi ile sevgilinizle olan uyumunuzu ölçün',
    type: 'article',
  },
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
