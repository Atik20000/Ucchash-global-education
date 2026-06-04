import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FloatingWhatsapp } from "@/components/floating-whatsapp"
import { PublicPageHero } from "@/components/public-page-hero"

export const metadata: Metadata = {
  title: "Terms & Conditions | Ucchash Global Education",
  description:
    "Read the terms and conditions governing your use of Ucchash Global Education services, courses, and platform.",
  alternates: { canonical: "https://ucchash.com/terms" },
}

const sections = [
  {
    title: "Acceptance of Terms",
    body: (
      <p>
        By accessing or enrolling in any course, service or program offered by Ucchash Global
        Education, you agree to be bound by these Terms and Conditions. If you do not agree with
        any part of these terms, you must not use our services.
      </p>
    ),
  },
  {
    title: "Services Provided",
    body: (
      <p>
        Ucchash Global Education provides IELTS, PTE and English language preparation courses
        (online and offline), AI-powered mock exam evaluation and study abroad consultancy for
        destinations including the UK, Australia, Canada, New Zealand, Germany, Denmark, Sweden,
        Finland, Belgium and the Netherlands.
      </p>
    ),
  },
  {
    title: "Enrollment and Payments",
    body: (
      <ul>
        <li>All fees must be paid in full before course access is granted unless a payment plan has been arranged.</li>
        <li>Prices listed are in Bangladeshi Taka (BDT) unless otherwise stated.</li>
        <li>Ucchash Global Education reserves the right to revise pricing at any time without prior notice.</li>
        <li>Course fees are non-refundable once course materials have been accessed or classes have started.</li>
      </ul>
    ),
  },
  {
    title: "Code of Conduct",
    body: (
      <>
        <p>Students enrolled are expected to:</p>
        <ul>
          <li>Attend classes punctually and participate respectfully.</li>
          <li>Refrain from sharing course materials, login credentials or recordings with third parties.</li>
          <li>Not reproduce or distribute any proprietary content provided by Ucchash Global Education.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Intellectual Property",
    body: (
      <p>
        All course materials, study guides, video lectures, mock exam papers and written content
        are the intellectual property of Ucchash Global Education. Unauthorized reproduction,
        distribution or use of these materials is strictly prohibited.
      </p>
    ),
  },
  {
    title: "Limitation of Liability",
    body: (
      <p>
        Ucchash Global Education provides guidance and preparation support but cannot guarantee
        specific exam scores, visa approvals or university admission outcomes. Results depend on
        individual effort, study habits and external factors beyond our control.
      </p>
    ),
  },
  {
    title: "Changes to Terms",
    body: (
      <p>
        We reserve the right to update or modify these Terms and Conditions at any time. Continued
        use of our services after changes are posted constitutes acceptance of the revised terms.
      </p>
    ),
  },
  {
    title: "Contact",
    body: (
      <p>
        For any questions regarding these terms, please contact us at{" "}
        <a href="mailto:priyankaprava6@gmail.com" className="font-semibold text-[#0F5132] underline">
          priyankaprava6@gmail.com
        </a>{" "}
        or via WhatsApp at{" "}
        <a
          href="https://wa.me/8801611549962"
          className="font-semibold text-[#0F5132] underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          +880 1611 549962
        </a>
        .
      </p>
    ),
  },
]

export default function TermsPage() {
  return (
    <main className="relative flex min-h-screen flex-col">
      <Navigation />
      <div className="relative z-10 flex-1">
        <PublicPageHero
          badge="Legal · Terms"
          title="Terms & Conditions"
          description="Please read these terms carefully before using our services, enrolling in courses or accessing any part of the platform."
        />

        <section className="relative py-20 sm:py-24">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white to-[#FAF8F3]/40" />
          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="glass-card rounded-3xl p-8 sm:p-12">
              <div className="space-y-10 [&_p]:mt-3 [&_p]:text-[15px] [&_p]:leading-[1.85] [&_p]:text-[#1A1F2C]/75 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_li]:text-[15px] [&_li]:leading-[1.85] [&_li]:text-[#1A1F2C]/75 [&_a]:underline">
                {sections.map((section, idx) => (
                  <article key={section.title}>
                    <div className="flex items-baseline gap-3">
                      <span className="font-heading text-xs font-semibold uppercase tracking-[0.22em] text-[#B2823A]">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <h2 className="font-heading text-xl font-semibold leading-tight text-[#1A1F2C] sm:text-2xl">
                        {section.title}
                      </h2>
                    </div>
                    <div className="mt-3 h-px w-14 bg-gradient-to-r from-[#D4A24C] to-transparent" />
                    <div className="mt-2">{section.body}</div>
                  </article>
                ))}

                <p className="border-t border-[#0F5132]/10 pt-6 text-sm italic text-[#1A1F2C]/55">
                  Last updated: March 2026
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
      <FloatingWhatsapp />
    </main>
  )
}
