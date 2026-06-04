import type { Metadata } from "next"
import { FAQSection } from "@/components/faq-section"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FloatingWhatsapp } from "@/components/floating-whatsapp"
import { PublicPageHero } from "@/components/public-page-hero"

export const metadata: Metadata = {
  title: "FAQ | Ucchash Global Education",
  description:
    "Frequently asked questions about our IELTS, PTE courses and study abroad consultancy. Find answers about course duration, mock exams, visa success rates and more.",
  openGraph: {
    title: "FAQ | Ucchash Global Education",
    description:
      "Answers to common questions about IELTS & PTE courses, mock exams, study abroad consultancy, and visa processing.",
    url: "https://ucchash.com/faq",
  },
  alternates: {
    canonical: "https://ucchash.com/faq",
  },
}

export default function FAQPage() {
  return (
    <main className="relative flex min-h-screen flex-col">
      <Navigation />
      <div className="relative z-10 flex-1">
        <PublicPageHero
          badge="Support · FAQ"
          title="Frequently Asked Questions"
          description="Straightforward answers about IELTS, our courses, mock exams and study abroad consultancy. If your question isn't here, message us — we reply within hours."
        />
        <FAQSection />
      </div>
      <Footer />
      <FloatingWhatsapp />
    </main>
  )
}
