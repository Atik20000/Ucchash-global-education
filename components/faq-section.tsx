"use client"

import { ChevronDown, HelpCircle } from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "What is the duration of IELTS preparation courses?",
    answer:
      "We offer flexible durations: IELTS Jhotpot (7 days crash course), IELTS Crush Batch (1.5 months), and Regular Batch (4 months). Choose based on your timeline and preparation needs.",
  },
  {
    question: "Are classes available online and offline?",
    answer:
      "Yes! All our courses are available in both online and offline modes. Online enrollment saves you ৳2,000. The IELTS Jhotpot 7-day course is available online only.",
  },
  {
    question: "How many mock exams are included in the courses?",
    answer:
      "The IELTS Crush Batch includes 5 mock exams, Regular Batch includes 20 FREE mock exams, and PTE course includes 20 mock tests. All mock exams are evaluated with AI-powered feedback.",
  },
  {
    question: "Which countries do you provide study abroad consultancy for?",
    answer:
      "We provide expert study abroad consultancy for the UK, Australia, New Zealand, and Europe (Schengen countries). Our services include university selection, application support, visa processing, and scholarship guidance.",
  },
  {
    question: "How long does it take to get exam results?",
    answer:
      "You'll receive detailed AI-powered evaluation and results within 48 hours (2 days) of completing your mock exam.",
  },
  {
    question: "Can I purchase just mock exams without enrolling in a course?",
    answer:
      "Yes! We offer standalone exam packages: 3, 5, 10, 15, or 20 exams with 1-year validity. Best value is our 10-exam package at ৳3,499.",
  },
  {
    question: "What is the scoring gift for high achievers?",
    answer:
      "Students who achieve IELTS Band 7.5 or higher receive an attractive gift from Ucchash Global Education as recognition of their excellence!",
  },
  {
    question: "Do you offer refunds or course guarantees?",
    answer:
      "We guarantee results with our proven teaching methodology. All courses include lifetime access to our support community and comprehensive study materials.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const toggleFAQ = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section
      id="faq"
      className="relative overflow-hidden py-20 sm:py-24"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#FAF8F3]/50 via-white to-[#FAF8F3]/30" />
      <div className="absolute -left-20 top-1/3 -z-10 h-72 w-72 rounded-full bg-[#0F5132]/8 blur-[100px]" />
      <div className="absolute -right-20 bottom-1/4 -z-10 h-72 w-72 rounded-full bg-[#D4A24C]/15 blur-[100px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center animate-in-up">
          <Badge variant="gold" className="mb-5">
            <HelpCircle className="h-3 w-3" />
            FAQ
          </Badge>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[#1A1F2C] sm:text-[2.5rem]">
            Frequently Asked <span className="italic text-emerald-shine">Questions</span>
          </h2>
          <div className="mx-auto mt-5 h-px w-32 bg-gradient-to-r from-transparent via-[#D4A24C] to-transparent" />
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#1A1F2C]/65 sm:text-lg">
            Answers to common questions about our courses, exams and study abroad services.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className={cn(
                  "overflow-hidden rounded-2xl border bg-white transition-all duration-300",
                  isOpen
                    ? "border-[#0F5132]/25 shadow-[0_18px_40px_-22px_rgba(15,81,50,0.25)]"
                    : "border-[#0F5132]/10 shadow-[0_2px_8px_-4px_rgba(15,81,50,0.08)]",
                )}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-[#FAF8F3]/60"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={cn(
                        "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-heading text-sm font-semibold transition-colors",
                        isOpen
                          ? "bg-[#0F5132] text-white"
                          : "bg-[#0F5132]/8 text-[#0F5132]",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="pt-1 font-heading text-base font-semibold text-[#1A1F2C] sm:text-lg">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-[#0F5132] transition-transform duration-300",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>

                <div
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-[#0F5132]/8 px-6 pb-6 pt-5 text-[15px] leading-[1.85] text-[#1A1F2C]/70">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
