"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Target,
  Award,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Globe2,
} from "lucide-react"

export function HeroSection() {
  const scrollToContact = () => {
    const element = document.getElementById("contact")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F3] via-[#FAF8F3]/90 to-white" />
        <div className="absolute -left-20 top-16 h-56 w-56 rounded-full bg-[#0F5132]/12 blur-[100px] sm:-left-32 sm:top-24 sm:h-80 sm:w-80" />
        <div className="absolute -right-20 top-4 h-56 w-56 rounded-full bg-[#D4A24C]/20 blur-[100px] sm:-right-32 sm:top-10 sm:h-80 sm:w-80" />
        <div className="absolute bottom-0 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-[#0F5132]/8 blur-[120px]" />
        <div className="absolute inset-0 bg-grid-emerald opacity-40" />
      </div>

      {/* Gold top accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4A24C]/60 to-transparent" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:gap-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-8">
        {/* LEFT — Headline */}
        <div className="max-w-3xl animate-in-up">
          <Badge variant="gold" className="mb-5 max-w-full whitespace-normal text-left leading-tight sm:mb-6">
            <Sparkles className="h-3 w-3 shrink-0" />
            <span>Premium IELTS &amp; Study Abroad Coaching</span>
          </Badge>

          <h1 className="font-heading text-[2.15rem] font-bold leading-[1.08] tracking-tight text-[#1A1F2C] xs:text-[2.5rem] sm:text-5xl lg:text-[3.75rem]">
            Master IELTS and English with
            <span className="relative mx-1.5 inline-block sm:mx-2">
              <span className="text-emerald-shine">clear guidance</span>
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-gradient-to-r from-[#D4A24C]/0 via-[#D4A24C] to-[#D4A24C]/0"
              />
            </span>
            <span className="mt-3 block font-heading italic text-[#1A1F2C]/85">
              Study abroad with confidence.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-[15px] leading-[1.8] text-[#1A1F2C]/70 sm:mt-7 sm:text-[17px] sm:leading-[1.85]">
            Ucchash Global Education helps students prepare for IELTS, improve English skills,
            and plan the next step with practical support, honest advice, and simple learning paths.
          </p>

          <div className="mt-9 flex flex-col gap-3 animate-in-up stagger-1 sm:flex-row">
            <Button
              onClick={scrollToContact}
              size="xl"
              variant="default"
              className="group"
            >
              Book Free Consultation
              <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>

            <Button asChild size="xl" variant="outline">
              <a
                href="https://wa.me/8801611549962"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            </Button>
          </div>

          {/* Quick proof points */}
          <div className="mt-10 grid gap-3 text-sm text-[#1A1F2C]/75 animate-in-up stagger-2 sm:grid-cols-2">
            {[
              "Clean study plans for every level",
              "Online and offline support available",
              "AI-powered mock exam feedback",
              "Trusted by 500+ students worldwide",
            ].map((point) => (
              <div
                key={point}
                className="flex items-center gap-3 rounded-2xl border border-[#0F5132]/8 bg-white/85 px-4 py-3 shadow-[0_4px_18px_-10px_rgba(15,81,50,0.15)] backdrop-blur-sm"
              >
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0F5132] to-[#14593a] text-white shadow-inner">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                <span className="font-medium">{point}</span>
              </div>
            ))}
          </div>

          {/* Trust strip */}
          <div className="mt-10 grid grid-cols-3 items-start gap-4 border-t border-[#0F5132]/10 pt-6 animate-in-up stagger-3 sm:flex sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-4">
            <div>
              <p className="font-heading text-2xl font-bold text-[#0F5132] sm:text-3xl">4.9</p>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#1A1F2C]/55 sm:text-xs sm:tracking-[0.18em]">
                Avg. Rating
              </p>
            </div>
            <div className="hidden h-10 w-px bg-[#0F5132]/15 sm:block" />
            <div>
              <p className="font-heading text-2xl font-bold text-[#0F5132] sm:text-3xl">500+</p>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#1A1F2C]/55 sm:text-xs sm:tracking-[0.18em]">
                Placed
              </p>
            </div>
            <div className="hidden h-10 w-px bg-[#0F5132]/15 sm:block" />
            <div>
              <p className="font-heading text-2xl font-bold text-[#0F5132] sm:text-3xl">95%</p>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#1A1F2C]/55 sm:text-xs sm:tracking-[0.18em]">
                Visa Success
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT — Feature cards */}
        <div className="relative animate-in-up stagger-2">
          {/* Floating gold ribbon */}
          <div
            aria-hidden
            className="absolute -top-6 -right-4 hidden rotate-[8deg] rounded-full border border-[#D4A24C]/30 bg-gradient-to-r from-[#F6E6C0] to-[#FBF3E1] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#7A5320] shadow-md sm:block"
          >
            ★ Premium Coaching
          </div>

          <div className="glass-card rounded-3xl p-6 lg:p-8">
            <div className="mb-5 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#0F5132]/80">
                <Globe2 className="h-4 w-4 text-[#D4A24C]" />
                What We Offer
              </div>
              <span className="font-heading text-xs italic text-[#1A1F2C]/60">
                Ucchash Way
              </span>
            </div>

            <div className="grid gap-4">
              {[
                {
                  Icon: BookOpen,
                  title: "IELTS Preparation",
                  body: "Structured lessons, mock tests, and feedback that stay easy to follow.",
                  delay: "0s",
                },
                {
                  Icon: Target,
                  title: "Study Abroad Guidance",
                  body: "Support for university selection, application steps, and the next move.",
                  delay: "0.4s",
                },
                {
                  Icon: Award,
                  title: "Simple, Consistent Progress",
                  body: "Keep the focus on learning, not on distraction-heavy visuals.",
                  delay: "0.8s",
                },
              ].map(({ Icon, title, body, delay }) => (
                <div
                  key={title}
                  className="card-lift group/feature relative overflow-hidden rounded-2xl border border-[#0F5132]/8 bg-white p-5"
                  style={{ animationDelay: delay }}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#D4A24C]/0 transition-colors duration-500 group-hover/feature:bg-[#D4A24C]/15"
                  />
                  <div className="relative flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0F5132] to-[#14593a] text-white shadow-[0_8px_18px_-8px_rgba(15,81,50,0.5)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-heading text-base font-semibold text-[#1A1F2C]">
                        {title}
                      </p>
                      <p className="mt-1.5 text-sm leading-6 text-[#1A1F2C]/65">
                        {body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative gold dot strip */}
            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="h-1 w-12 rounded-full bg-[#D4A24C]/60" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4A24C]" />
              <span className="h-1 w-12 rounded-full bg-[#D4A24C]/60" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
