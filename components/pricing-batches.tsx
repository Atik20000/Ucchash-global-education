"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Clock,
  Award,
  BookOpen,
  Users,
  Wifi,
  MapPin,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"

const batches = [
  {
    id: "jhotpot",
    name: "IELTS Jhotpot",
    subtitle: "7-Day Crash Course",
    duration: "7 Days",
    offlinePrice: null,
    onlinePrice: "৳2,999",
    classes: 5,
    classHours: "2 hours each",
    mockTests: 3,
    onlineOnly: true,
    popular: false,
    accent: "Quick Win",
    features: [
      "5 intensive classes",
      "2 hours per class",
      "Quick preparation strategy",
      "Expert tips &amp; tricks",
      "Online platform access",
      "Study materials included",
      "Doubt-clearing sessions",
      "3 FREE mock tests",
    ],
  },
  {
    id: "crush",
    name: "IELTS Crush Batch",
    subtitle: "Focused 1.5-Month Sprint",
    duration: "1.5 Months",
    offlinePrice: "৳7,499",
    onlinePrice: "৳5,499",
    classes: 15,
    mockTests: 10,
    popular: false,
    accent: "Most Booked",
    features: [
      "15 intensive classes",
      "10 FREE real mock exams",
      "Expert trainers",
      "Speaking practice sessions",
      "Writing feedback",
      "Reading &amp; Listening strategies",
      "Study materials included",
      "Lifetime support group",
    ],
  },
  {
    id: "regular",
    name: "Regular Batch",
    subtitle: "Comprehensive 4-Month Program",
    duration: "4 Months",
    offlinePrice: "৳14,999",
    onlinePrice: "৳12,999",
    classes: 32,
    mockTests: 20,
    popular: true,
    accent: "Most Popular",
    features: [
      "32 comprehensive classes",
      "20 FREE real mock exams",
      "Personal mentor assigned",
      "Weekly speaking sessions",
      "Detailed writing feedback",
      "Grammar workshops",
      "Vocabulary building sessions",
      "Progress tracking",
      "Certificate upon completion",
      "Job interview preparation",
    ],
  },
  {
    id: "pte",
    name: "PTE Exam Prep",
    subtitle: "Computer-Based Test Mastery",
    duration: "4 Months",
    offlinePrice: "৳14,999",
    onlinePrice: "৳12,999",
    classes: 32,
    mockTests: 20,
    popular: false,
    accent: "PTE",
    features: [
      "32 PTE-focused classes",
      "20 FREE mock tests",
      "PTE scoring strategies",
      "Speaking &amp; writing templates",
      "Listening practice modules",
      "Reading comprehension tips",
      "Computer-based test training",
      "Expert guidance",
      "Study materials included",
    ],
  },
  {
    id: "grammar",
    name: "Basic Grammar Course",
    subtitle: "Foundation to Advanced",
    duration: "2 Months",
    offlinePrice: "৳5,999",
    onlinePrice: "৳3,999",
    classes: 16,
    mockTests: 0,
    popular: false,
    accent: "Foundation",
    features: [
      "16 grammar classes",
      "Foundation to advanced",
      "Interactive exercises",
      "Common mistake corrections",
      "Sentence structure mastery",
      "Tense practice sessions",
      "Writing improvement",
      "Progress assessments",
    ],
  },
]

export function PricingBatches() {
  return (
    <section
      id="batches"
      className="relative overflow-hidden py-20 sm:py-24"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-[#FAF8F3]/60 to-white" />
      <div className="absolute inset-0 -z-10 bg-grid-emerald opacity-25" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center animate-in-up">
          <Badge variant="gold" className="mb-5">
            <Sparkles className="h-3 w-3" />
            Course Batches
          </Badge>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[#1A1F2C] sm:text-[2.5rem]">
            Choose your <span className="text-emerald-shine">learning path</span>
          </h2>
          <div className="mx-auto mt-5 h-px w-32 bg-gradient-to-r from-transparent via-[#D4A24C] to-transparent" />
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#1A1F2C]/65 sm:text-lg">
            Expert training, proven results. Pick the batch that fits your timeline.
          </p>
        </div>

        <div className="mt-14 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {batches.map((batch, idx) => (
            <Card
              key={batch.id}
              className={cn(
                "card-lift flex h-full flex-col overflow-hidden animate-in-up",
                batch.popular && "ring-2 ring-[#D4A24C]/40",
              )}
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              {batch.popular && (
                <div className="bg-gradient-to-r from-[#0F5132] via-[#14593a] to-[#0F5132] py-2 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-[#E6BD78]">
                  ★ Most Popular Choice
                </div>
              )}
              <div className="h-1 w-full bg-gradient-to-r from-[#0F5132] via-[#D4A24C] to-[#0F5132]" />

              <CardContent className="flex h-full flex-col gap-5 p-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant={batch.onlineOnly ? "gold" : "emerald"}
                      className="px-2.5 py-1 text-[10px]"
                    >
                      {batch.onlineOnly ? (
                        <>
                          <Wifi className="h-3 w-3" />
                          Online Only
                        </>
                      ) : (
                        batch.accent
                      )}
                    </Badge>
                  </div>
                  <h3 className="mt-3 font-heading text-xl font-semibold leading-tight text-[#1A1F2C]">
                    {batch.name}
                  </h3>
                  <p className="mt-1 text-sm italic text-[#1A1F2C]/55">{batch.subtitle}</p>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-[#0F5132]/8 py-3 text-xs text-[#1A1F2C]/70">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-[#D4A24C]" />
                    {batch.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5 text-[#D4A24C]" />
                    {batch.classes} Classes
                  </span>
                  {batch.mockTests > 0 && (
                    <span className="inline-flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5 text-[#D4A24C]" />
                      {batch.mockTests} Mocks
                    </span>
                  )}
                </div>

                {/* Features */}
                <ul className="grid grid-cols-1 gap-1.5">
                  {batch.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-[#1A1F2C]/75"
                    >
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4A24C]" />
                      <span dangerouslySetInnerHTML={{ __html: f }} />
                    </li>
                  ))}
                </ul>

                <div className="mt-auto space-y-3 rounded-2xl border border-[#0F5132]/8 bg-gradient-to-b from-[#FAF8F3]/70 to-white p-4">
                  {batch.onlineOnly ? (
                    <div className="text-center">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1A1F2C]/55">
                        Online
                      </p>
                      <p className="mt-1.5 font-heading text-3xl font-bold text-[#0F5132]">
                        {batch.onlinePrice}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center">
                        <p className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1A1F2C]/55">
                          <MapPin className="h-3 w-3" /> Offline
                        </p>
                        <p className="mt-1.5 font-heading text-xl font-bold text-[#1A1F2C]">
                          {batch.offlinePrice}
                        </p>
                      </div>
                      <div className="text-center border-l border-[#0F5132]/10">
                        <p className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#0F5132]">
                          <Wifi className="h-3 w-3" /> Online
                        </p>
                        <p className="mt-1.5 font-heading text-xl font-bold text-[#0F5132]">
                          {batch.onlinePrice}
                        </p>
                        <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#B2823A]">
                          Save ৳2,000
                        </p>
                      </div>
                    </div>
                  )}

                  <Button asChild size="lg" className="w-full" variant={batch.popular ? "default" : "outline"}>
                    <a
                      href={`https://wa.me/8801611549962?text=${encodeURIComponent(
                        `Hello! I want to enroll in ${batch.name}. Please share details.`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Enroll Now
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom info card */}
        <div className="mx-auto mt-12 max-w-3xl animate-in-up stagger-3">
          <div className="glass-card rounded-2xl p-6">
            <div className="mb-3 flex items-center justify-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#0F5132] to-[#14593a] text-white">
                <Users className="h-4 w-4" />
              </span>
              <h3 className="font-heading text-lg font-semibold text-[#1A1F2C]">
                Why Choose Our Batches?
              </h3>
            </div>
            <p className="text-center text-sm leading-7 text-[#1A1F2C]/70">
              All courses include expert trainers, comprehensive study materials, doubt-clearing
              sessions, and lifetime access to our support community. We guarantee results with our
              proven teaching methodology. All courses available in both online and offline modes
              (save ৳2,000 on online enrollment).
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
