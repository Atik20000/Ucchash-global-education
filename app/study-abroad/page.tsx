import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  Globe2,
  MapPin,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Star,
  Quote,
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FloatingWhatsapp } from "@/components/floating-whatsapp"
import { StudyAbroadStatsGrid } from "@/components/study-abroad-stats-grid"
import { PublicPageHero } from "@/components/public-page-hero"
import Script from "next/script"

export const metadata: Metadata = {
  metadataBase: new URL("https://ucchash.com"),
  title: "Study Abroad Consultancy - UK, Europe, Asia & Beyond | Ucchash Global Education",
  description:
    "Expert study abroad consultancy for UK, Canada, Australia, New Zealand, Germany, Denmark, Sweden, Finland, Belgium, Netherlands, Malaysia, China, South Korea and Japan. 95% visa success rate. Free career counseling, university selection, application support and visa processing.",
  keywords: [
    "study abroad consultancy Bangladesh",
    "UK university admission",
    "Canada study permit",
    "Australia student visa",
    "Germany student visa",
    "Denmark education consultancy",
    "Sweden universities",
    "Finland study abroad",
    "New Zealand student visa",
    "Belgium universities",
    "Netherlands study",
    "Europe Schengen visa",
    "Malaysia study abroad",
    "study in China scholarship",
    "South Korea student visa",
    "Japan MEXT scholarship",
    "study in Asia Bangladesh",
    "study abroad consultant",
    "overseas education",
    "international education",
    "university application support",
    "visa processing Bangladesh",
    "scholarship guidance",
    "study visa help",
    "admission consultancy",
  ],
  openGraph: {
    type: "website",
    locale: "en_BD",
    url: "https://ucchash.com/study-abroad",
    title: "Study Abroad Consultancy - 95% Visa Success | Ucchash Global Education",
    description:
      "Study in UK, Canada, Australia, New Zealand, Europe (Schengen) or Asia (Malaysia, China, South Korea, Japan) with expert guidance. 500+ students placed. Free career counseling, university selection & visa support.",
    siteName: "Ucchash Global Education",
    images: [
      {
        url: "/study-abroad-og.png",
        width: 1200,
        height: 630,
        alt: "Study Abroad with Ucchash Global Education",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Study Abroad Consultancy - UK, Canada, Australia, Europe",
    description:
      "Expert study abroad guidance with 95% visa success rate. Free counseling & application support.",
    images: ["/study-abroad-og.png"],
    creator: "@UcchashGlobal",
  },
  alternates: {
    canonical: "https://ucchash.com/study-abroad",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

const countries = [
  { code: "UK", name: "United Kingdom", flag: "🇬🇧" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "DK", name: "Denmark", flag: "🇩🇰" },
  { code: "SE", name: "Sweden", flag: "🇸🇪" },
  { code: "FI", name: "Finland", flag: "🇫🇮" },
  { code: "BE", name: "Belgium", flag: "🇧🇪" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱" },
  { code: "EU", name: "Europe (Schengen)", flag: "🇪🇺" },
  { code: "MY", name: "Malaysia", flag: "🇲🇾" },
  { code: "CN", name: "China", flag: "🇨🇳" },
  { code: "KR", name: "South Korea", flag: "🇰🇷" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
]

const services = [
  {
    icon: GraduationCap,
    title: "Career Counseling",
    description:
      "Choose the right country, course and university based on your academic background, budget and long-term career goals.",
  },
  {
    icon: Globe2,
    title: "University Application Support",
    description:
      "End-to-end help with SOP, LOR, CV, application forms and document checklists so you apply with confidence.",
  },
  {
    icon: MapPin,
    title: "Visa Processing",
    description:
      "Step-by-step visa guidance, document preparation and mock interviews to improve your chance of approval.",
  },
  {
    icon: BarChart3,
    title: "Scholarship Guidance",
    description:
      "Support to find and apply for scholarships, bursaries and discounts to reduce your tuition and living costs.",
  },
  {
    icon: Star,
    title: "Pre-Departure Support",
    description:
      "Accommodation guidance, travel tips and cultural preparation so you feel ready from the first day abroad.",
  },
  {
    icon: CheckCircle2,
    title: "End-to-End Mentorship",
    description:
      "From your first counseling session to passport stamping, we stay beside you and your family at every step.",
  },
]

const countryHighlights = [
  {
    flags: "🇨🇦 🇦🇺",
    title: "Canada & Australia",
    description:
      "Welcoming immigration policies, excellent quality of life and strong post-graduation work opportunities make these countries ideal for those seeking long-term settlement options alongside world-class education.",
  },
  {
    flags: "🇩🇪 🇸🇪 🇩🇰",
    title: "Germany, Sweden & Nordic Countries",
    description:
      "Low or no tuition fees, high standard of living, innovative education systems and strong economies. Germany offers free education at public universities, while Nordic countries provide excellent research opportunities.",
  },
  {
    flags: "🇳🇿",
    title: "New Zealand",
    description:
      "Safe, peaceful environment with stunning natural beauty. Known for friendly people, high-quality education and practical, industry-focused programs. Post-study work rights and pathways to permanent residence.",
  },
  {
    flags: "🇧🇪 🇳🇱",
    title: "Belgium & Netherlands",
    description:
      "Strategic European locations with multicultural environments. Many English-taught programs, affordable tuition and access to the entire European job market.",
  },
  {
    flags: "🇲🇾",
    title: "Malaysia",
    description:
      "Affordable tuition, English-taught programs and a strong base for branch campuses of UK and Australian universities. Friendly visa process, multicultural cities and easy proximity to home make it a popular launchpad for international study.",
  },
  {
    flags: "🇨🇳",
    title: "China",
    description:
      "Generous government and Confucius scholarships, modern campuses and rapidly rising universities (Tsinghua, Peking, Fudan). Strong programs in engineering, medicine, business and Chinese language — a strategic choice for careers connected to Asia's largest economy.",
  },
  {
    flags: "🇰🇷",
    title: "South Korea",
    description:
      "World-class universities (SNU, KAIST, Yonsei, Korea University) with strong scholarship support, vibrant student life and growing English-taught programs in tech, design, business and K-culture studies. Excellent post-study career pathways in Korean and global firms.",
  },
  {
    flags: "🇯🇵",
    title: "Japan",
    description:
      "Globally respected universities, MEXT scholarships and English-medium programs across STEM, robotics, design and business. Safe, organized cities and a strong post-graduation work visa route make Japan an outstanding long-term choice.",
  },
]

const whyStudyAbroad = [
  {
    icon: GraduationCap,
    title: "World-Class Education",
    description:
      "Access universities ranked among the world's best, with cutting-edge research facilities, renowned faculty and innovative teaching methods that prepare you for real-world challenges.",
  },
  {
    icon: Globe2,
    title: "Global Career Prospects",
    description:
      "International degrees open doors to multinational companies and global job markets — giving you a competitive edge wherever you choose to work.",
  },
  {
    icon: Star,
    title: "Personal Growth",
    description:
      "Living independently in a new country builds confidence, adaptability and cross-cultural communication skills — qualities that employers value and that enrich your entire life.",
  },
]

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://ucchash.com/study-abroad#service",
      name: "Study Abroad Consultancy",
      description:
        "Expert guidance for studying in UK, Canada, Australia, New Zealand, Germany, Denmark, Sweden, Finland, Belgium, Netherlands, Malaysia, China, South Korea and Japan with 95% visa success rate",
      provider: {
        "@type": "EducationalOrganization",
        name: "Ucchash Global Education",
        url: "https://ucchash.com",
      },
      areaServed: ["BD", "Bangladesh"],
      serviceType: "Educational Consultancy",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "BDT",
        description: "Free initial consultation",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://ucchash.com/study-abroad#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://ucchash.com" },
        {
          "@type": "ListItem",
          position: 2,
          name: "Study Abroad",
          item: "https://ucchash.com/study-abroad",
        },
      ],
    },
  ],
}

export default function StudyAbroadPage() {
  return (
    <>
      <Script
        id="study-abroad-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="relative flex min-h-screen flex-col">
        <Navigation />

        <div className="relative z-10 flex-1">
          {/* HERO */}
          <PublicPageHero
            badge="Ucchash Global Education"
            title="Study Abroad with Confidence"
            description="Ucchash Global Education helps students from Bangladesh plan and achieve their dream of studying in top universities worldwide — from course selection and admission to visa approval and pre-departure support."
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="xl">
                <a href="https://wa.me/8801611549962" target="_blank" rel="noopener noreferrer">
                  Get Free Consultation
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="xl" variant="outline">
                <a href="#countries">Explore Countries</a>
              </Button>
            </div>
          </PublicPageHero>

          {/* ABOUT */}
          <section className="relative py-20 sm:py-24">
            <div className="absolute inset-0 -z-10 bg-white" />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid items-start gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
                <div>
                  <Badge variant="emerald" className="mb-5">
                    About Us
                  </Badge>
                  <h2 className="font-heading text-3xl font-bold tracking-tight text-[#1A1F2C] sm:text-4xl">
                    About <span className="italic text-emerald-shine">Ucchash</span> Global Education
                  </h2>
                  <div className="mt-5 h-px w-24 bg-gradient-to-r from-[#D4A24C] to-transparent" />
                  <p className="mt-6 text-[15px] leading-[1.9] text-[#1A1F2C]/75 sm:text-base">
                    A dedicated study abroad consultancy helping Bangladeshi students access
                    world-class education. We believe every student deserves clear guidance, honest
                    advice and a realistic roadmap to build a global future.
                  </p>
                  <p className="mt-4 text-[15px] leading-[1.9] text-[#1A1F2C]/75 sm:text-base">
                    From the first counseling session to your pre-departure orientation, our team
                    supports you with personalized counseling, university short-listing, application
                    support, visa processing and settling-in guidance — so you never feel alone in
                    the process.
                  </p>
                </div>
                <div className="glass-card rounded-3xl p-7">
                  <h3 className="font-heading text-lg font-semibold text-[#1A1F2C]">
                    Promises we keep
                  </h3>
                  <div className="mt-3 h-px w-12 bg-gradient-to-r from-[#D4A24C] to-transparent" />
                  <ul className="mt-5 space-y-4 text-sm leading-6 text-[#1A1F2C]/75">
                    {[
                      "Trusted guidance focused on what is genuinely best for your profile and family situation.",
                      "Clear explanation of admission, financial and visa requirements — in simple language.",
                      "Close alignment with your English preparation through Ucchash IELTS for a complete journey.",
                    ].map((p) => (
                      <li key={p} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0F5132]" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* WHY STUDY ABROAD */}
          <section className="relative overflow-hidden py-20 sm:py-24">
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#FAF8F3]/60 via-white to-[#FAF8F3]/60" />
            <div className="absolute inset-0 -z-10 bg-grid-emerald opacity-30" />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <Badge variant="gold" className="mb-5">
                  Why Go Global
                </Badge>
                <h2 className="font-heading text-3xl font-bold tracking-tight text-[#1A1F2C] sm:text-[2.5rem]">
                  Why <span className="text-emerald-shine">study abroad?</span>
                </h2>
                <div className="mx-auto mt-5 h-px w-32 bg-gradient-to-r from-transparent via-[#D4A24C] to-transparent" />
                <p className="mt-5 text-base leading-7 text-[#1A1F2C]/65 sm:text-lg">
                  More than a degree — a perspective shift, a global network and a future-shaping
                  experience.
                </p>
              </div>

              <div className="mt-14 grid gap-6 md:grid-cols-3">
                {whyStudyAbroad.map((item) => {
                  const Icon = item.icon
                  return (
                    <article
                      key={item.title}
                      className="card-lift rounded-2xl border border-[#0F5132]/10 bg-white p-7 shadow-[0_1px_2px_rgba(15,81,50,0.04),0_18px_40px_-22px_rgba(15,81,50,0.18)]"
                    >
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#0F5132] to-[#14593a] text-white shadow-[0_8px_18px_-8px_rgba(15,81,50,0.55)] ring-1 ring-[#D4A24C]/25">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="mt-5 font-heading text-lg font-semibold text-[#1A1F2C]">
                        {item.title}
                      </h3>
                      <div className="mt-3 h-px w-10 bg-gradient-to-r from-[#D4A24C] to-transparent" />
                      <p className="mt-3 text-sm leading-6 text-[#1A1F2C]/65">{item.description}</p>
                    </article>
                  )
                })}
              </div>

              <div className="mx-auto mt-14 max-w-4xl">
                <div className="glass-card relative rounded-3xl p-8 text-center sm:p-10">
                  <Quote aria-hidden className="mx-auto h-8 w-8 text-[#D4A24C]" />
                  <p className="mt-4 text-balance font-heading text-lg italic leading-[1.8] text-[#1A1F2C]/85 sm:text-xl">
                    The world is becoming more interconnected every day. Students who embrace
                    international education don&apos;t just earn degrees — they gain perspectives,
                    networks and experiences that become the foundation of extraordinary careers and
                    meaningful lives.
                  </p>
                  <p className="mt-5 font-body text-xs font-semibold uppercase tracking-[0.22em] text-[#B2823A]">
                    Your passport · A key to limitless possibilities
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* COUNTRIES */}
          <section id="countries" className="relative overflow-hidden py-20 sm:py-24">
            <div className="absolute inset-0 -z-10 bg-white" />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <Badge variant="emerald" className="mb-5">
                  Countries We Cover
                </Badge>
                <h2 className="font-heading text-3xl font-bold tracking-tight text-[#1A1F2C] sm:text-[2.5rem]">
                  Top study destinations
                </h2>
                <div className="mx-auto mt-5 h-px w-32 bg-gradient-to-r from-transparent via-[#D4A24C] to-transparent" />
                <p className="mt-5 text-base leading-7 text-[#1A1F2C]/65 sm:text-lg">
                  Admission and visa guidance for the world&apos;s most respected study destinations.
                </p>
              </div>

              {/* UK feature */}
              <div className="mt-12">
                <div className="card-lift relative overflow-hidden rounded-3xl border border-[#D4A24C]/30 bg-gradient-to-br from-white via-[#FAF8F3]/85 to-[#FBF3E1]/65 p-7 shadow-[0_24px_50px_-26px_rgba(15,81,50,0.28)] sm:p-9">
                  <div className="bg-gradient-to-r from-[#0F5132] via-[#D4A24C] to-[#0F5132] absolute inset-x-0 top-0 h-1" />
                  <div className="grid items-start gap-6 sm:grid-cols-[auto_1fr] sm:gap-8">
                    <div className="text-6xl sm:text-7xl">🇬🇧</div>
                    <div>
                      <Badge variant="gold" className="mb-3">
                        Primary Focus
                      </Badge>
                      <h3 className="font-heading text-2xl font-bold text-[#1A1F2C] sm:text-3xl">
                        United Kingdom
                      </h3>
                      <p className="mt-3 text-[15px] leading-[1.85] text-[#1A1F2C]/70 sm:text-base">
                        Our main specialization. From Oxford, Cambridge, Imperial College London and
                        LSE to dozens of world-class universities, the UK offers prestige, rich
                        culture and excellent post-study work opportunities via the Graduate Route
                        visa.
                      </p>
                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        {[
                          "Home to 4 of the world's top 10 universities",
                          "2-year post-study work visa for all graduates",
                          "English-speaking environment for easier adaptation",
                          "Diverse programs and strong industry connections",
                        ].map((p) => (
                          <p
                            key={p}
                            className="flex items-start gap-2 text-sm text-[#1A1F2C]/75"
                          >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0F5132]" />
                            <span>{p}</span>
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-10 text-center text-sm text-[#1A1F2C]/65">
                We also provide expert guidance for the following destinations:
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {countries
                  .filter((c) => c.code !== "UK")
                  .map((country) => (
                    <div
                      key={country.code}
                      className="card-lift flex flex-col items-center justify-center gap-2 rounded-2xl border border-[#0F5132]/10 bg-white px-3 py-5 text-center shadow-sm"
                    >
                      <div className="text-3xl">{country.flag}</div>
                      <div className="text-xs font-semibold text-[#1A1F2C]/85 sm:text-sm">
                        {country.name}
                      </div>
                    </div>
                  ))}
              </div>

              <div className="mt-12 grid gap-5 md:grid-cols-2">
                {countryHighlights.map((h) => (
                  <div
                    key={h.title}
                    className="card-lift rounded-2xl border border-[#0F5132]/10 bg-white p-6 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{h.flags}</span>
                      <h4 className="font-heading text-lg font-semibold text-[#1A1F2C]">
                        {h.title}
                      </h4>
                    </div>
                    <div className="mt-3 h-px w-10 bg-gradient-to-r from-[#D4A24C] to-transparent" />
                    <p className="mt-3 text-sm leading-6 text-[#1A1F2C]/65">{h.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SERVICES */}
          <section className="relative overflow-hidden py-20 sm:py-24">
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#FAF8F3]/60 via-white to-[#FAF8F3]/60" />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <Badge variant="gold" className="mb-5">
                  Our Services
                </Badge>
                <h2 className="font-heading text-3xl font-bold tracking-tight text-[#1A1F2C] sm:text-[2.5rem]">
                  Everything you need in <span className="italic text-emerald-shine">one place</span>
                </h2>
                <div className="mx-auto mt-5 h-px w-32 bg-gradient-to-r from-transparent via-[#D4A24C] to-transparent" />
                <p className="mt-5 text-base leading-7 text-[#1A1F2C]/65 sm:text-lg">
                  From planning your study path to boarding your flight.
                </p>
              </div>

              <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => {
                  const Icon = service.icon
                  return (
                    <article
                      key={service.title}
                      className="card-lift rounded-2xl border border-[#0F5132]/10 bg-white p-6 shadow-[0_1px_2px_rgba(15,81,50,0.04),0_12px_32px_-16px_rgba(15,81,50,0.16)]"
                    >
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#0F5132] to-[#14593a] text-white shadow-[0_8px_18px_-8px_rgba(15,81,50,0.55)] ring-1 ring-[#D4A24C]/25">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-heading text-lg font-semibold text-[#1A1F2C]">
                        {service.title}
                      </h3>
                      <div className="mt-3 h-px w-10 bg-gradient-to-r from-[#D4A24C] to-transparent" />
                      <p className="mt-3 text-sm leading-6 text-[#1A1F2C]/65">
                        {service.description}
                      </p>
                    </article>
                  )
                })}
              </div>
            </div>
          </section>

          {/* SUCCESS STATS */}
          <section className="relative overflow-hidden py-20 sm:py-24">
            <div className="absolute inset-0 -z-10 bg-white" />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <Badge variant="emerald" className="mb-5">
                  Real Outcomes
                </Badge>
                <h2 className="font-heading text-3xl font-bold tracking-tight text-[#1A1F2C] sm:text-[2.5rem]">
                  Our success in <span className="italic text-emerald-shine">numbers</span>
                </h2>
                <div className="mx-auto mt-5 h-px w-32 bg-gradient-to-r from-transparent via-[#D4A24C] to-transparent" />
                <p className="mt-5 text-base leading-7 text-[#1A1F2C]/65 sm:text-lg">
                  Real journeys, real visas, real students building real futures abroad.
                </p>
              </div>
              <div className="mt-12">
                <StudyAbroadStatsGrid />
              </div>
            </div>
          </section>

          {/* FINAL CTA */}
          <section
            id="consultation"
            className="relative overflow-hidden py-20 sm:py-24"
          >
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#FAF8F3]/70 to-white" />
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <div className="glass-card relative overflow-hidden rounded-3xl p-8 text-center sm:p-12">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#0F5132]/8 blur-3xl"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-[#D4A24C]/20 blur-3xl"
                />
                <Badge variant="gold" className="mx-auto mb-5">
                  Free Consultation
                </Badge>
                <h2 className="font-heading text-3xl font-bold tracking-tight text-[#1A1F2C] sm:text-[2.5rem]">
                  Your future starts with a <span className="italic text-emerald-shine">single decision</span>
                </h2>
                <div className="mx-auto mt-5 h-px w-32 bg-gradient-to-r from-transparent via-[#D4A24C] to-transparent" />
                <p className="mx-auto mt-6 max-w-2xl text-balance text-[15px] leading-7 text-[#1A1F2C]/70 sm:text-base">
                  Book a free consultation with Ucchash Global Education. We&apos;ll listen to your
                  goals, assess your profile and suggest practical study destinations, courses and
                  timelines that truly fit you.
                </p>

                <div className="mx-auto mt-8 flex max-w-xl flex-col items-stretch justify-center gap-3 sm:flex-row">
                  <Button asChild size="xl" className="group">
                    <a
                      href="https://wa.me/8801611549962"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Book Free Consultation
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </Button>
                  <Button asChild size="xl" variant="outline">
                    <a href="mailto:priyankaprava6@gmail.com">Email Your Questions</a>
                  </Button>
                </div>

                <p className="mx-auto mt-6 max-w-md text-xs italic text-[#1A1F2C]/55">
                  A 20-minute honest discussion can save months of trial and error.
                </p>
              </div>
            </div>
          </section>
        </div>

        <Footer />
        <FloatingWhatsapp />
      </main>
    </>
  )
}
