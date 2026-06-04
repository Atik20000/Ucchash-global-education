import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FloatingWhatsapp } from "@/components/floating-whatsapp"
import { PublicPageHero } from "@/components/public-page-hero"

export const metadata: Metadata = {
  title: "Privacy Policy | Ucchash Global Education",
  description:
    "Learn how Ucchash Global Education collects, uses, and protects your personal information.",
  alternates: { canonical: "https://ucchash.com/privacy" },
}

const sections = [
  {
    title: "Information We Collect",
    body: (
      <>
        <p>We may collect the following information when you use our platform or contact us:</p>
        <ul>
          <li>Full name, email address and phone number provided during registration or inquiry.</li>
          <li>Academic background and language proficiency details shared during consultations.</li>
          <li>Payment information processed through secure third-party payment gateways.</li>
          <li>Usage data such as pages visited and features used within our platform.</li>
        </ul>
      </>
    ),
  },
  {
    title: "How We Use Your Information",
    body: (
      <ul>
        <li>To process enrollments, payments and deliver course content.</li>
        <li>To provide personalized study abroad and IELTS/PTE preparation guidance.</li>
        <li>To send updates about classes, schedules, results and new offerings.</li>
        <li>To improve our services based on usage patterns and feedback.</li>
        <li>To comply with legal or regulatory obligations.</li>
      </ul>
    ),
  },
  {
    title: "Data Sharing",
    body: (
      <p>
        We do not sell, rent or trade your personal information to third parties. We may share data
        with trusted partners (such as payment processors and educational institutions) strictly as
        required to deliver our services, and only under confidentiality agreements.
      </p>
    ),
  },
  {
    title: "Data Security",
    body: (
      <p>
        We implement industry-standard security measures to protect your personal data from
        unauthorized access, alteration, disclosure or destruction. However, no method of
        transmission over the internet is 100% secure, and we cannot guarantee absolute security.
      </p>
    ),
  },
  {
    title: "Cookies",
    body: (
      <p>
        Our website may use cookies to enhance user experience and gather analytics. You can choose
        to disable cookies through your browser settings, though this may affect some functionality
        of our platform.
      </p>
    ),
  },
  {
    title: "Your Rights",
    body: (
      <ul>
        <li>You may request access to the personal data we hold about you.</li>
        <li>You may request correction or deletion of inaccurate data.</li>
        <li>You may opt out of marketing communications at any time by contacting us.</li>
      </ul>
    ),
  },
  {
    title: "Third-Party Links",
    body: (
      <p>
        Our website may contain links to external sites. We are not responsible for the privacy
        practices or content of those sites and encourage you to review their privacy policies
        independently.
      </p>
    ),
  },
  {
    title: "Changes to This Policy",
    body: (
      <p>
        We may update this Privacy Policy from time to time. Changes will be posted on this page
        with a revised date. Continued use of our services after updates constitutes acceptance of
        the revised policy.
      </p>
    ),
  },
  {
    title: "Contact Us",
    body: (
      <p>
        If you have any questions about this Privacy Policy, please contact us at{" "}
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

export default function PrivacyPage() {
  return (
    <main className="relative flex min-h-screen flex-col">
      <Navigation />
      <div className="relative z-10 flex-1">
        <PublicPageHero
          badge="Legal · Privacy"
          title="Privacy Policy"
          description="Your privacy matters. This policy explains what data we collect, how we use it and the choices you have."
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
