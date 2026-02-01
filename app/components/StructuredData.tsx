export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Said Koçu',
    jobTitle: 'Girişimci & PDR Öğrencisi',
    description: 'Psikoloji kuramlarını teknoloji ve yapay zeka ile harmanlayan girişimci',
    url: 'https://saidkocu.com',
    sameAs: [
      'https://www.youtube.com/@saidkocu',
      'https://medium.com/@saidkocu',
      'https://discord.com/invite/gelisim-anahtari-gecmisolsun-1021011873753219122',
    ],
    email: 'saidkocun@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'İzmir',
      addressCountry: 'TR',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Mersin Üniversitesi',
    },
    knowsAbout: ['Psikoloji', 'Yapay Zeka', 'Teknoloji', 'Kişisel Gelişim'],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
