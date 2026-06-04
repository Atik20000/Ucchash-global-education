"use client"

import { Globe, Users, Video, Brain, Heart, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const features = [
  {
    icon: Globe,
    title: "Online & Offline Classes",
    description:
      "Both online and offline IELTS preparation, breaking geographical barriers and providing flexible learning options for everyone.",
  },
  {
    icon: Users,
    title: "Mentorship That Transforms",
    description:
      "Expert instructors don't just teach — they mentor, inspire and guide you through your educational journey in both modes.",
  },
  {
    icon: Video,
    title: "Technology-Enhanced Learning",
    description:
      "Immersive, interactive learning experiences that adapt to your pace and style — online and in-person.",
  },
  {
    icon: Brain,
    title: "Critical Thinking Skills",
    description:
      "Beyond language proficiency — we develop your analytical thinking, creativity and problem-solving for academic excellence.",
  },
  {
    icon: Heart,
    title: "Cultural Awareness",
    description:
      "Language learning is about understanding people. We foster empathy and cultural sensitivity for authentic connection.",
  },
  {
    icon: Shield,
    title: "Confidence & Resilience",
    description:
      "A safe, supportive environment where mistakes are learning opportunities — building confidence that lasts far beyond the exam.",
  },
]

export function WhyChooseSection() {
  return (
    <section
      id="why-choose"
      className="relative overflow-hidden py-20 sm:py-24"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-[#FAF8F3]/50 to-white" />
      <div className="absolute inset-0 -z-10 bg-grid-emerald opacity-30" />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center animate-in-up">
          <Badge variant="emerald" className="mb-5">
            Why Ucchash
          </Badge>
          <h2 className="text-balance font-heading text-3xl font-bold tracking-tight text-[#1A1F2C] sm:text-[2.5rem]">
            Education that <span className="text-emerald-shine">empowers</span>
            <span className="block italic text-[#B2823A]">&amp; transforms.</span>
          </h2>
          <div className="mx-auto mt-5 h-px w-32 bg-gradient-to-r from-transparent via-[#D4A24C] to-transparent" />
          <p className="mx-auto mt-5 max-w-2xl text-balance text-base leading-7 text-[#1A1F2C]/65 sm:text-lg">
            Every learner deserves quality instruction that builds language skills, confidence,
            critical thinking and global citizenship.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <article
                key={feature.title}
                className="group/feat card-lift relative overflow-hidden rounded-2xl border border-[#0F5132]/10 bg-white p-6 shadow-[0_1px_2px_rgba(15,81,50,0.04),0_12px_32px_-16px_rgba(15,81,50,0.16)]"
                style={{ animationDelay: `${(idx % 6) * 60}ms` }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 -top-1 h-px bg-gradient-to-r from-transparent via-[#D4A24C]/60 to-transparent opacity-0 transition-opacity duration-500 group-hover/feat:opacity-100"
                />
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#0F5132] to-[#14593a] text-white shadow-[0_8px_18px_-8px_rgba(15,81,50,0.55)] ring-1 ring-[#D4A24C]/25">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-lg font-semibold leading-tight text-[#1A1F2C]">
                  {feature.title}
                </h3>
                <div className="mt-3 h-px w-10 bg-gradient-to-r from-[#D4A24C] to-transparent" />
                <p className="mt-3 text-sm leading-6 text-[#1A1F2C]/65">{feature.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
