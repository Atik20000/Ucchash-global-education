"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Calendar,
  Laptop,
  Mic,
  Speaker,
  Gift,
  Zap,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"

const examPackages = [
  { id: "3-exam", name: "3 Exams", price: "৳1,199", exams: 3, popular: false, accent: "Starter" },
  { id: "5-exam", name: "5 Exams", price: "৳1,899", exams: 5, popular: false, accent: "Growth" },
  { id: "10-exam", name: "10 Exams", price: "৳3,499", exams: 10, popular: true, accent: "Best Value" },
  { id: "15-exam", name: "15 Exams", price: "৳4,499", exams: 15, popular: false, accent: "Pro" },
  { id: "20-exam", name: "20 Exams", price: "৳5,999", exams: 20, popular: false, accent: "Mastery" },
]

const commonFeatures = [
  { icon: Calendar, text: "1 year validity", description: "Use exams anytime within one year" },
  { icon: Clock, text: "Flexible scheduling", description: "Take tests at your preferred time" },
  { icon: Laptop, text: "Computer/Laptop", description: "Any desktop or laptop device" },
  { icon: Mic, text: "Microphone needed", description: "For speaking test section" },
  { icon: Speaker, text: "Speaker/Headphones", description: "For listening test section" },
  { icon: Zap, text: "Results in 48 hours", description: "Detailed evaluation per answer" },
  { icon: Gift, text: "7.5+ Band Gift", description: "Attractive gift for high achievers" },
]

export function PricingExams() {
  return (
    <section
      id="exam-packages"
      className="relative overflow-hidden py-20 sm:py-24"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-[#FAF8F3]/60 to-white" />
      <div className="absolute -right-24 top-1/4 -z-10 h-72 w-72 rounded-full bg-[#D4A24C]/15 blur-[100px]" />
      <div className="absolute -left-24 bottom-1/4 -z-10 h-72 w-72 rounded-full bg-[#0F5132]/8 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center animate-in-up">
          <Badge variant="gold" className="mb-5">
            <Sparkles className="h-3 w-3" />
            Mock Exam Packages
          </Badge>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[#1A1F2C] sm:text-[2.5rem]">
            Practice with <span className="text-emerald-shine">AI-evaluated</span>
            <span className="block italic text-[#1A1F2C]/85">mock exams.</span>
          </h2>
          <div className="mx-auto mt-5 h-px w-32 bg-gradient-to-r from-transparent via-[#D4A24C] to-transparent" />
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#1A1F2C]/65 sm:text-lg">
            Purchase mock exams and practice anytime, anywhere. Detailed AI evaluation within
            48 hours.
          </p>
        </div>

        {/* Exam packages */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {examPackages.map((pkg, idx) => {
            const perExam = Math.round(parseInt(pkg.price.replace(/[^\d]/g, "")) / pkg.exams)
            return (
              <Card
                key={pkg.id}
                className={cn(
                  "card-lift flex h-full flex-col overflow-hidden animate-in-up",
                  pkg.popular && "ring-2 ring-[#D4A24C]/40",
                )}
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                {pkg.popular && (
                  <div className="bg-gradient-to-r from-[#0F5132] via-[#14593a] to-[#0F5132] py-2 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-[#E6BD78]">
                    ★ Best Value
                  </div>
                )}
                <div className="h-1 w-full bg-gradient-to-r from-[#0F5132] via-[#D4A24C] to-[#0F5132]" />

                <CardContent className="flex h-full flex-col gap-5 p-6">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-heading text-xl font-semibold text-[#1A1F2C]">
                        {pkg.name}
                      </h3>
                      <Badge variant={pkg.popular ? "gold" : "emerald"} className="text-[10px]">
                        {pkg.accent}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-[#1A1F2C]/55">
                      {pkg.exams} full mock exams · 1 year validity
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#0F5132]/10 bg-gradient-to-b from-[#FAF8F3]/80 to-white p-5 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1A1F2C]/55">
                      Total Price
                    </p>
                    <p className="mt-2 font-heading text-4xl font-bold text-[#0F5132]">{pkg.price}</p>
                    <p className="mt-2 text-xs text-[#1A1F2C]/60">
                      ≈ ৳{perExam} <span className="text-[#1A1F2C]/45">per exam</span>
                    </p>
                  </div>

                  <div className="mt-auto">
                    <Button asChild size="lg" className="w-full" variant={pkg.popular ? "default" : "outline"}>
                      <a
                        href={`https://wa.me/8801611549962?text=${encodeURIComponent(
                          `Hello! I want to buy the ${pkg.name} mock exam package. Please guide me.`,
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Buy Now
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Features grid */}
        <div className="mx-auto mt-16 max-w-5xl">
          <h3 className="text-center font-heading text-2xl font-semibold text-[#1A1F2C]">
            What you get with <span className="italic text-[#B2823A]">every package</span>
          </h3>
          <div className="mx-auto mt-3 h-px w-24 bg-gradient-to-r from-transparent via-[#D4A24C] to-transparent" />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {commonFeatures.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.text}
                  className="card-lift rounded-2xl border border-[#0F5132]/10 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0F5132] to-[#14593a] text-white ring-1 ring-[#D4A24C]/25">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <h4 className="font-heading text-sm font-semibold text-[#1A1F2C]">
                        {feature.text}
                      </h4>
                      <p className="mt-1 text-xs leading-5 text-[#1A1F2C]/60">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Speaking test info */}
        <div className="mx-auto mt-14 max-w-3xl">
          <div className="glass-card rounded-2xl p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#0F5132] to-[#14593a] text-white ring-1 ring-[#D4A24C]/25">
                <Mic className="h-4 w-4" />
              </span>
              <h3 className="font-heading text-lg font-semibold text-[#1A1F2C]">
                Speaking Test Information
              </h3>
            </div>
            <div className="space-y-2.5 pl-13 text-sm leading-6 text-[#1A1F2C]/75">
              <p className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#0F5132]" />
                <span>
                  Speaking test requires <strong>slot booking</strong> — schedule at a convenient time
                </span>
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#0F5132]" />
                <span>
                  All other sections can be taken <strong>anytime without booking</strong>
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Gift card */}
        <div className="mx-auto mt-8 max-w-2xl text-center">
          <div className="relative overflow-hidden rounded-2xl border-2 border-[#D4A24C]/40 bg-gradient-to-br from-[#FBF3E1] via-[#FAF8F3] to-[#F6E6C0] p-7 shadow-[0_18px_40px_-22px_rgba(178,130,58,0.35)]">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#D4A24C]/20 blur-2xl"
            />
            <div className="relative">
              <div className="mb-3 flex items-center justify-center gap-3">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-b from-[#E6BD78] to-[#B2823A] text-white shadow-lg">
                  <Gift className="h-6 w-6" />
                </span>
                <h3 className="font-heading text-2xl font-bold text-[#7A5320]">
                  Special Gift!
                </h3>
              </div>
              <p className="text-base font-medium text-[#1A1F2C]/80">
                Score 7.5+ Band? Get an{" "}
                <span className="font-bold italic text-[#0F5132]">attractive gift</span> from us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
