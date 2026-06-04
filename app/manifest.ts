import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ucchash Global Education - IELTS, PTE & Study Abroad',
    short_name: 'Ucchash',
    description:
      'Leading IELTS, PTE & English coaching center with expert study abroad consultancy services in Bangladesh',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF8F3',
    theme_color: '#0F5132',
    orientation: 'portrait-primary',
    categories: ['education', 'learning', 'language'],
    lang: 'en-BD',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
      {
        src: '/apple-icon.svg',
        sizes: '180x180',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  }
}
