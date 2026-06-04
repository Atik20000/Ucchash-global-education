import type { Metadata } from "next"
import { PricingBatches } from "@/components/pricing-batches"
import { PricingExams } from "@/components/pricing-exams"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FloatingWhatsapp } from "@/components/floating-whatsapp"
import { PublicPageHero } from "@/components/public-page-hero"

export const metadata: Metadata = {
  title: "Courses & Exam Packages | Ucchash Global Education",
  description:
    "Explore IELTS, PTE and English courses with flexible batch options. Online & offline classes, AI-powered mock exams, and expert instructors.",
  openGraph: {
    title: "Courses & Exam Packages | Ucchash Global Education",
    description:
      "IELTS, PTE & English preparation courses with online and offline options. AI-powered evaluation, 20 FREE mock exams included.",
    url: "https://ucchash.com/courses",
  },
  alternates: {
    canonical: "https://ucchash.com/courses",
  },
}

export default function CoursesPage() {
  return (
    <main className="relative flex min-h-screen flex-col">
      <Navigation />
      <div className="relative z-10 flex-1">
        <PublicPageHero
          badge="Programs · Courses · Exam Packages"
          title="Courses & Exam Packages"
          description="Explore IELTS, PTE, English and exam preparation options with clean structure, practical schedules and clear, honest pricing."
        />
        <PricingBatches />
        <PricingExams />
      </div>
      <Footer />
      <FloatingWhatsapp />
    </main>
  )
}
