"use client"

import {
  CheckCircle2,
  FileText,
  Target,
  MessageCircle,
  Plane,
  BookOpen,
  Users,
  Award,
  Clock,
  Globe2,
  Lightbulb,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

const offerings = [
  {
    icon: CheckCircle2,
    title: "Flexible Learning Options",
    description:
      "Choose between online and offline classes based on your convenience. Both modes deliver the same high-quality instruction.",
  },
  {
    icon: Target,
    title: "Comprehensive Assessment",
    description:
      "Real growth comes from understanding your progress. 10 full mock tests provide authentic practice and detailed feedback.",
  },
  {
    icon: FileText,
    title: "Curated Learning Materials",
    description:
      "Expert-crafted materials and comprehensive notes ensure you receive well-structured knowledge that builds lasting skills.",
  },
  {
    icon: MessageCircle,
    title: "Continuous Mentorship",
    description:
      "Unlimited support extends beyond the classroom — guidance throughout your educational journey, online and offline.",
  },
  {
    icon: Plane,
    title: "Study Abroad Pathways",
    description:
      "Guidance for the UK, Australia, New Zealand and Schengen Europe — aligned with your budget, profile and long-term career goals.",
  },
  {
    icon: BookOpen,
    title: "Personalized Pathways",
    description:
      "Every learner is unique. Customized study plans adapt to your learning style, pace and goals for maximum efficiency.",
  },
  {
    icon: Users,
    title: "Peer Learning &amp; Study Groups",
    description:
      "Join study groups with fellow learners in-person or online to practice, share insights and build lasting connections.",
  },
  {
    icon: Award,
    title: "Achievement Recognition",
    description:
      "Every milestone matters. We celebrate your progress and achievements, building motivation through honest recognition.",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description:
      "Flexible class schedules and time-management guidance help you balance learning with work, family and personal life.",
  },
  {
    icon: Globe2,
    title: "Global Perspectives",
    description:
      "Studying abroad builds independence, networks and real-world skills. We help you understand scholarships and work routes.",
  },
  {
    icon: Lightbulb,
    title: "Innovation in Learning",
    description:
      "Innovative teaching methods, interactive tools and cutting-edge resources keep learning engaging and effective.",
  },
]

export function WhatWeOfferSection() {
  return (
    <section
      id="what-we-offer"
      className="relative overflow-hidden py-20 sm:py-24"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#FAF8F3]/60 via-white to-[#FAF8F3]/40" />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center animate-in-up">
          <Badge variant="gold" className="mb-5">
            What We Offer
          </Badge>
          <h2 className="text-balance font-heading text-3xl font-bold tracking-tight text-[#1A1F2C] sm:text-[2.5rem]">
            A complete <span className="text-emerald-shine">educational ecosystem</span>
            <span className="block italic text-[#1A1F2C]/85">built for success.</span>
          </h2>
          <div className="mx-auto mt-5 h-px w-32 bg-gradient-to-r from-transparent via-[#D4A24C] to-transparent" />
          <p className="mx-auto mt-5 max-w-2xl text-balance text-base leading-7 text-[#1A1F2C]/65 sm:text-lg">
            More than IELTS preparation — a comprehensive learning experience that builds skills,
            confidence and global perspectives for lifelong success.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {offerings.map((offer, idx) => {
            const Icon = offer.icon
            return (
              <article
                key={offer.title}
                className="group/offer card-lift relative overflow-hidden rounded-2xl border border-[#0F5132]/10 bg-white p-6 shadow-[0_1px_2px_rgba(15,81,50,0.04),0_12px_32px_-16px_rgba(15,81,50,0.16)]"
                style={{ animationDelay: `${(idx % 6) * 60}ms` }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-[#D4A24C]/10 transition-transform duration-500 group-hover/offer:scale-150"
                />
                <div className="relative">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#0F5132] to-[#14593a] text-white shadow-[0_8px_18px_-8px_rgba(15,81,50,0.55)] ring-1 ring-[#D4A24C]/25">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold leading-tight text-[#1A1F2C]">
                    {offer.title}
                  </h3>
                  <div className="mt-3 h-px w-10 bg-gradient-to-r from-[#D4A24C] to-transparent" />
                  <p
                    className="mt-3 text-sm leading-6 text-[#1A1F2C]/65"
                    dangerouslySetInnerHTML={{ __html: offer.description }}
                  />
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
