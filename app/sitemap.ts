import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://saidkocu.com' // Production URL'inizi buraya yazın
  const lastModified = new Date()

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/hayatin-anlami-nedir`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sevgilinizle-uyumunuz-ne-kadar`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}
