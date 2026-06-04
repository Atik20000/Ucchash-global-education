"use client"

import { Star, Quote } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const testimonials = [
  {
    name: "Fayem A",
    score: "Band 7.5",
    text: "Ucchash didn't just help me pass the exam — they transformed my confidence in English communication. The personalized mentorship and comprehensive approach made me realize that language learning is about connecting with the world, not just scoring points.",
  },
  {
    name: "Fakhar Uddin",
    score: "Band 6.5",
    text: "The flexible learning environment and expert guidance showed me that education adapts to your life, not the other way around. I learned that true mastery comes from understanding, not memorization.",
  },
  {
    name: "Atik Foysal",
    score: "Band 7.0",
    text: "Beyond achieving my target score, Ucchash taught me that language is a tool for global citizenship. The continuous support and quality materials built not just my English skills, but my confidence to pursue international opportunities.",
  },
]

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-20 sm:py-24"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-[#FAF8F3]/40 to-white" />
      <div className="absolute -left-24 bottom-10 -z-10 h-72 w-72 rounded-full bg-[#0F5132]/8 blur-[100px]" />
      <div className="absolute -right-24 top-10 -z-10 h-72 w-72 rounded-full bg-[#D4A24C]/15 blur-[100px]" />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center animate-in-up">
          <Badge variant="gold" className="mb-5">
            Student Stories
          </Badge>
          <h2 className="text-balance font-heading text-3xl font-bold tracking-tight text-[#1A1F2C] sm:text-[2.5rem]">
            Real <span className="text-emerald-shine">transformations</span>,
            <span className="block italic text-[#1A1F2C]/85">life-changing results.</span>
          </h2>
          <div className="mx-auto mt-5 h-px w-32 bg-gradient-to-r from-transparent via-[#D4A24C] to-transparent" />
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#1A1F2C]/65 sm:text-lg">
            Discover how our students transformed their English skills, confidence and opportunities
            through quality education.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <article
              key={t.name}
              className="card-lift group/test relative overflow-hidden rounded-2xl border border-[#0F5132]/10 bg-white p-7 shadow-[0_1px_2px_rgba(15,81,50,0.04),0_18px_40px_-22px_rgba(15,81,50,0.18)] animate-in-up"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <Quote
                aria-hidden
                className="absolute right-5 top-5 h-16 w-16 text-[#D4A24C]/12 transition-transform duration-500 group-hover/test:scale-110"
              />
              <div className="relative">
                <div className="flex gap-0.5 text-[#D4A24C]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-5 text-[15px] italic leading-[1.85] text-[#1A1F2C]/75">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-7 flex items-center gap-4 border-t border-[#0F5132]/10 pt-5">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#0F5132] to-[#14593a] font-heading text-base font-bold text-white ring-1 ring-[#D4A24C]/30">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-heading text-base font-semibold text-[#1A1F2C]">{t.name}</p>
                    <p className="mt-0.5 text-xs font-bold uppercase tracking-[0.15em] text-[#B2823A]">
                      IELTS · {t.score}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
