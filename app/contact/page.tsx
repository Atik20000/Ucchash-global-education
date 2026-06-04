import type { Metadata } from "next"
import { ContactSection } from "@/components/contact-section"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FloatingWhatsapp } from "@/components/floating-whatsapp"
import { PublicPageHero } from "@/components/public-page-hero"

export const metadata: Metadata = {
  title: "Contact Us | Ucchash Global Education",
  description:
    "Get in touch with Ucchash Global Education for IELTS, PTE course enrollment and study abroad consultancy. Call us or fill out the form to join now.",
  openGraph: {
    title: "Contact Us | Ucchash Global Education",
    description:
      "Enroll in IELTS & PTE courses or get study abroad consultancy. Contact Ucchash Global Education today.",
    url: "https://ucchash.com/contact",
  },
  alternates: {
    canonical: "https://ucchash.com/contact",
  },
}

export default function ContactPage() {
  return (
    <main className="relative flex min-h-screen flex-col">
      <Navigation />
      <div className="relative z-10 flex-1">
        <PublicPageHero
          badge="Contact"
          title="Talk to Ucchash Global Education"
          description="Reach our team for IELTS, PTE and study abroad guidance. We respond fast — and we listen first."
        />
        <ContactSection />
      </div>
      <Footer />
      <FloatingWhatsapp />
    </main>
  )
}
