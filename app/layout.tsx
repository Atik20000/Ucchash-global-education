import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistMono } from "geist/font/mono"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["500", "600", "700", "800"],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0F5132' },
    { media: '(prefers-color-scheme: dark)', color: '#0a3a23' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://ucchash.com'),
  title: {
    default: "Ucchash Global Education - IELTS, PTE, English & Study Abroad Consultancy",
    template: "%s | Ucchash Global Education"
  },
  description:
    "Leading IELTS, PTE & English coaching center in Bangladesh. Expert study abroad consultancy for UK, Australia, Canada, New Zealand & Europe. Online & offline classes with AI-powered mock exams. Achieve your dream band score with proven teaching methodology.",
  applicationName: "Ucchash Global Education",
  keywords: [
    "IELTS coaching Bangladesh",
    "PTE preparation",
    "English learning center",
    "Study abroad consultancy",
    "UK university admission",
    "Australia student visa",
    "Canada study permit",
    "New Zealand study visa",
    "Europe Schengen visa",
    "Germany student visa",
    "Denmark education",
    "Sweden universities",
    "Finland education",
    "Belgium universities",
    "Netherlands study",
    "IELTS mock test",
    "PTE mock test",
    "AI exam evaluation",
    "IELTS band 7",
    "IELTS band 8",
    "IELTS band 9",
    "online IELTS classes",
    "offline IELTS training",
    "grammar course Bangladesh",
    "English speaking practice",
    "IELTS writing feedback",
    "university application support",
    "visa processing help",
    "scholarship guidance",
    "Ucchash IELTS",
    "Ucchash Global Education",
    "best IELTS center Bangladesh",
    "IELTS preparation Dhaka",
    "study abroad consultant Bangladesh",
  ],
  authors: [{ name: "Ucchash Global Education", url: "https://ucchash.com" }],
  creator: "Ucchash Global Education",
  publisher: "Ucchash Global Education",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_BD',
    url: 'https://ucchash.com',
    title: 'Ucchash Global Education - IELTS, PTE & Study Abroad Experts',
    description: 'Achieve your dream IELTS/PTE band score and study abroad with expert guidance. Online & offline classes, AI-powered evaluation, 95% visa success rate. 500+ students placed worldwide.',
    siteName: 'Ucchash Global Education',
    images: [
      {
        url: '/ucchash-og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ucchash Global Education - Pathway to Worldwide Excellence',
        type: 'image/png',
      },
      {
        url: '/ucchash-logo.png',
        width: 800,
        height: 600,
        alt: 'Ucchash Global Education Logo',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ucchash Global Education - IELTS, PTE & Study Abroad',
    description: 'Master IELTS & PTE. Study Abroad with Confidence. Expert coaching & consultancy with 95% visa success rate.',
    images: ['/ucchash-og-image.png'],
    creator: '@UcchashGlobal',
    site: '@UcchashGlobal',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://ucchash.com',
    languages: {
      'en-BD': 'https://ucchash.com',
      'en': 'https://ucchash.com',
    },
  },
  manifest: '/manifest.webmanifest',
  // icon.svg and apple-icon.svg in app/ are auto-injected by Next.js, no manual icons needed
  generator: "Next.js",
  category: 'education',
  classification: 'Education & Training',
  verification: {
    google: 'your-google-search-console-verification-code',
    yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
    // other: {
    //   'msvalidate.01': 'your-bing-verification-code',
    //   'facebook-domain-verification': 'your-fb-verification-code',
    // },
  },
  appleWebApp: {
    capable: true,
    title: 'Ucchash Education',
    statusBarStyle: 'black-translucent',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Ucchash',
    'application-name': 'Ucchash Global Education',
    'msapplication-TileColor': '#0F5132',
    'theme-color': '#0F5132',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${GeistMono.variable} font-body antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
