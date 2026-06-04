"use client";

import Image from "next/image";
import Link from "next/link";
import { HeroSection } from "@/components/hero-section";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { FloatingWhatsapp } from "@/components/floating-whatsapp";
import { WhyChooseSection } from "@/components/why-choose-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { QuoteSection } from "@/components/quote-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, HelpCircle, MessageCircle } from "lucide-react";
import Script from "next/script";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": "https://ucchash.com/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://ucchash.com"
          }
        ]
      },
      {
        "@type": "EducationalOrganization",
        "@id": "https://ucchash.com/#organization",
        "name": "Ucchash Global Education",
        "alternateName": "Ucchash IELTS",
        "url": "https://ucchash.com",
        "logo": "https://ucchash.com/ucchash-logo.png",
        "description": "Leading IELTS, PTE, and English coaching center with study abroad consultancy services in Bangladesh",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "BD",
          "addressLocality": "Bangladesh"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+880-1611-549962",
          "contactType": "Admissions",
          "availableLanguage": ["English", "Bengali"]
        },
        "sameAs": [
          "https://www.facebook.com/ucchashglobal",
          "https://www.instagram.com/ucchashglobal",
          "https://wa.me/8801611549962",
          "https://www.linkedin.com/company/ucchash-global-education"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "500",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://ucchash.com/#website",
        "url": "https://ucchash.com",
        "name": "Ucchash Global Education",
        "publisher": {
          "@id": "https://ucchash.com/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://ucchash.com/?s={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Course",
        "name": "IELTS Preparation Course",
        "description": "Comprehensive IELTS training with expert instructors, mock exams, and AI-powered evaluation",
        "provider": {
          "@id": "https://ucchash.com/#organization"
        },
        "courseMode": ["online", "offline"],
        "educationalCredentialAwarded": "IELTS Band 7+ Preparation"
      },
      {
        "@type": "Course",
        "name": "PTE Preparation Course",
        "description": "PTE exam preparation with computer-based test training and expert guidance",
        "provider": {
          "@id": "https://ucchash.com/#organization"
        },
        "courseMode": ["online", "offline"],
        "educationalCredentialAwarded": "PTE Score Enhancement"
      },
      {
        "@type": "Service",
        "name": "Study Abroad Consultancy",
        "description": "Expert guidance for studying in UK, Australia, New Zealand, and Europe (Schengen countries)",
        "provider": {
          "@id": "https://ucchash.com/#organization"
        },
        "areaServed": "BD",
        "serviceType": "Educational Consultancy"
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the duration of IELTS preparation courses?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We offer flexible durations: IELTS Jhotpot (7 days crash course), IELTS Crush Batch (1.5 months), and Regular Batch (4 months). Choose based on your timeline and preparation needs."
            }
          },
          {
            "@type": "Question",
            "name": "Are classes available online and offline?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! All our courses are available in both online and offline modes. Online enrollment saves you ৳2,000. The IELTS Jhotpot 7-day course is available online only."
            }
          },
          {
            "@type": "Question",
            "name": "How many mock exams are included in the courses?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The IELTS Crush Batch includes 5 mock exams, Regular Batch includes 20 FREE mock exams, and PTE course includes 20 mock tests. All mock exams are evaluated with AI-powered feedback."
            }
          },
          {
            "@type": "Question",
            "name": "Which countries do you provide study abroad consultancy for?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We provide expert study abroad consultancy for the UK, Australia, New Zealand, and Europe (Schengen countries). Our services include university selection, application support, visa processing, and scholarship guidance."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take to get exam results?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You'll receive detailed AI-powered evaluation and results within 48 hours (2 days) of completing your mock exam."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="relative flex min-h-screen flex-col">
        <Navigation />
        <div className="relative z-10 flex-1">
          <HeroSection />

          <section className="relative overflow-hidden py-20 sm:py-24">
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-[#FAF8F3]/60 to-white" />
            <div className="absolute -left-24 top-1/3 -z-10 h-72 w-72 rounded-full bg-[#0F5132]/8 blur-[100px]" />
            <div className="absolute -right-24 bottom-10 -z-10 h-72 w-72 rounded-full bg-[#D4A24C]/15 blur-[100px]" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#D4A24C]/35 bg-gradient-to-r from-[#FBF3E1] to-[#F6E6C0] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#7A5320]">
                  Founder&apos;s Note
                </span>
                <h2 className="mt-5 font-heading text-3xl font-bold tracking-tight text-[#1A1F2C] sm:text-[2.5rem]">
                  A Message from Our <span className="italic text-emerald-shine">Founder &amp; CEO</span>
                </h2>
                <p className="mt-4 text-base leading-7 text-[#1A1F2C]/65 sm:text-lg">
                  A personal word from Priyangka Prava about your journey to success.
                </p>
                <div className="mx-auto mt-6 h-px w-32 bg-gradient-to-r from-transparent via-[#D4A24C] to-transparent" />
              </div>

              <div className="mt-14 grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-start lg:gap-14">
                <div className="relative">
                  <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#0F5132]/8 via-transparent to-[#D4A24C]/15 blur-2xl" />
                  <div className="relative overflow-hidden rounded-3xl border border-[#0F5132]/10 bg-white shadow-[0_30px_60px_-30px_rgba(15,81,50,0.25)]">
                    <Image
                      src="/proyangka.jpeg"
                      alt="Priyangka Prava - Founder and CEO"
                      width={600}
                      height={700}
                      className="h-auto w-full object-cover"
                      priority
                    />
                    <div className="border-t border-[#0F5132]/10 bg-gradient-to-b from-white to-[#FAF8F3]/70 px-6 py-5">
                      <p className="font-heading text-lg font-semibold text-[#1A1F2C]">
                        Priyangka Prava
                      </p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#0F5132]">
                        Founder &amp; CEO
                      </p>
                      <p className="mt-1 text-sm text-[#1A1F2C]/60">
                        Ucchash Global Education
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-2 -top-6 select-none font-heading text-[8rem] leading-none text-[#D4A24C]/25"
                  >
                    “
                  </span>
                  <div className="glass-card relative space-y-5 rounded-3xl p-7 text-[15px] leading-[1.85] text-[#1A1F2C]/80 sm:p-9 sm:text-base">
                    <p className="font-heading text-lg italic text-[#0F5132]">
                      Dear Aspiring Global Learners,
                    </p>
                    <p>
                      The journey to studying abroad begins with a simple yet powerful
                      realization: the world is full of opportunities waiting for those
                      who are prepared to seize them.
                    </p>
                    <p>
                      IELTS is not just an English test. It is your passport to global
                      education, international careers, and life-changing experiences.
                    </p>
                    <p>
                      Studying abroad transforms you with confidence, perspective, and
                      lifelong networks. With proper planning and the right guidance,
                      your goals become achievable.
                    </p>
                    <div className="flex items-center gap-3 pt-2">
                      <span className="h-px flex-1 bg-gradient-to-r from-[#D4A24C]/0 via-[#D4A24C]/60 to-[#D4A24C]/0" />
                      <span className="font-heading text-xs italic uppercase tracking-[0.22em] text-[#0F5132]">
                        — Priyangka
                      </span>
                      <span className="h-px flex-1 bg-gradient-to-r from-[#D4A24C]/0 via-[#D4A24C]/60 to-[#D4A24C]/0" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden py-20 sm:py-24">
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white to-[#FAF8F3]" />
            <div className="absolute inset-0 -z-10 bg-grid-emerald opacity-50" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid gap-10 md:grid-cols-2 md:items-end lg:gap-14">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#0F5132]/15 bg-[#0F5132]/8 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0F5132]">
                    Our Philosophy
                  </span>
                  <h2 className="mt-5 font-heading text-3xl font-bold leading-[1.1] tracking-tight text-[#1A1F2C] sm:text-[2.75rem]">
                    Education that <span className="text-emerald-shine">empowers</span>
                    <br />
                    and <span className="italic text-[#B2823A]">transforms</span> lives.
                  </h2>
                  <div className="mt-5 h-px w-24 bg-gradient-to-r from-[#D4A24C] to-transparent" />
                  <p className="mt-6 max-w-xl text-base leading-[1.9] text-[#1A1F2C]/70 sm:text-[17px]">
                    We believe in the transformative power of education. Every learner
                    deserves access to quality instruction that builds language skills,
                    confidence, critical thinking, and global citizenship.
                  </p>
                </div>

                <div className="relative">
                  <div className="glass-card relative rounded-3xl p-7 sm:p-9">
                    <h3 className="font-heading text-2xl font-semibold leading-tight text-[#1A1F2C] sm:text-3xl">
                      A complete educational ecosystem
                      <span className="block italic text-[#0F5132]">for lifelong success.</span>
                    </h3>
                    <div className="mt-5 h-px w-20 bg-gradient-to-r from-[#D4A24C] to-transparent" />
                    <p className="mt-5 text-[15px] leading-[1.9] text-[#1A1F2C]/75">
                      We provide more than IELTS preparation. We offer a complete learning
                      experience that builds skills, confidence, and global perspectives
                      for lifelong success.
                    </p>
                    <div className="mt-7 grid grid-cols-1 gap-2.5 xs:grid-cols-3 xs:gap-3">
                      {[
                        { k: "Coaching", v: "IELTS · PTE" },
                        { k: "Mock Tests", v: "AI-Powered" },
                        { k: "Consultancy", v: "UK · AU · NZ" },
                      ].map((it) => (
                        <div
                          key={it.k}
                          className="flex items-center justify-between gap-3 rounded-2xl border border-[#0F5132]/10 bg-white/90 px-3.5 py-2.5 shadow-sm xs:flex-col xs:items-center xs:justify-center xs:gap-1.5 xs:px-3 xs:py-3 xs:text-center"
                        >
                          <p className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.16em] text-[#1A1F2C]/55">
                            {it.k}
                          </p>
                          <p className="whitespace-nowrap font-heading text-sm font-semibold text-[#0F5132]">
                            {it.v}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <WhyChooseSection />
          <QuoteSection />
          <TestimonialsSection />

          {/* Slim home CTA — pushes deep content to dedicated pages */}
          <section className="relative overflow-hidden py-16 sm:py-20">
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-[#FAF8F3]/60 to-white" />
            <div className="absolute -left-24 top-10 -z-10 h-64 w-64 rounded-full bg-[#0F5132]/8 blur-[100px]" />
            <div className="absolute -right-24 bottom-0 -z-10 h-64 w-64 rounded-full bg-[#D4A24C]/18 blur-[100px]" />

            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <div className="grid gap-5 sm:grid-cols-2">
                {/* FAQ card */}
                <Link
                  href="/faq"
                  className="card-lift group/cta relative overflow-hidden rounded-3xl border border-[#0F5132]/10 bg-white p-7 shadow-[0_1px_2px_rgba(15,81,50,0.04),0_18px_40px_-22px_rgba(15,81,50,0.18)]"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#0F5132]/8 blur-2xl transition-transform duration-500 group-hover/cta:scale-150"
                  />
                  <div className="relative">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#0F5132] to-[#14593a] text-white shadow-[0_8px_18px_-8px_rgba(15,81,50,0.55)] ring-1 ring-[#D4A24C]/25">
                      <HelpCircle className="h-5 w-5" />
                    </span>
                    <Badge variant="emerald" className="ml-3 align-middle">
                      Support
                    </Badge>
                    <h3 className="mt-5 font-heading text-xl font-semibold text-[#1A1F2C] sm:text-2xl">
                      Frequently asked questions
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#1A1F2C]/65">
                      Course durations, mock exam packages, refunds, study abroad timelines — all in
                      one place.
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#0F5132] transition-colors group-hover/cta:text-[#14593a]">
                      Read all answers
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5" />
                    </span>
                  </div>
                </Link>

                {/* Contact card */}
                <Link
                  href="/contact"
                  className="card-lift group/cta relative overflow-hidden rounded-3xl border border-[#D4A24C]/30 bg-gradient-to-br from-[#FBF3E1]/70 via-white to-[#F6E6C0]/55 p-7 shadow-[0_1px_2px_rgba(178,130,58,0.06),0_18px_40px_-22px_rgba(178,130,58,0.25)]"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#D4A24C]/20 blur-2xl transition-transform duration-500 group-hover/cta:scale-150"
                  />
                  <div className="relative">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-b from-[#E6BD78] to-[#B2823A] text-white shadow-[0_8px_18px_-8px_rgba(178,130,58,0.55)]">
                      <MessageCircle className="h-5 w-5" />
                    </span>
                    <Badge variant="gold" className="ml-3 align-middle">
                      Free Consultation
                    </Badge>
                    <h3 className="mt-5 font-heading text-xl font-semibold text-[#1A1F2C] sm:text-2xl">
                      Book your free counseling
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#1A1F2C]/65">
                      Talk one-to-one about IELTS, university selection and visa paths. No charge,
                      no pressure.
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#7A5320] transition-colors group-hover/cta:text-[#B2823A]">
                      Get in touch
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </section>
        </div>
        <Footer />
        <FloatingWhatsapp />
      </main>
    </>
  );
}
