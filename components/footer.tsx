"use client"

import Link from "next/link"
import { BrandLogo } from "@/components/brand-logo"
import {
  Facebook,
  MessageCircle,
  Mail,
  Phone,
  Send,
  Globe2,
  ArrowUpRight,
} from "lucide-react"

const linkSections = {
  explore: {
    title: "Explore",
    items: [
      { href: "/", label: "Home" },
      { href: "/courses", label: "Course Batches" },
      { href: "/courses#exam-packages", label: "Exam Packages" },
      { href: "/study-abroad", label: "Study Abroad" },
    ],
  },
  legal: {
    title: "Legal &amp; Help",
    items: [
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact Us" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms &amp; Conditions" },
    ],
  },
}

const socialLinks = [
  {
    href: "https://www.facebook.com/ucchashglobal",
    label: "Facebook",
    Icon: Facebook,
  },
  {
    href: "https://wa.me/8801611549962",
    label: "WhatsApp",
    Icon: MessageCircle,
  },
  {
    href: "mailto:priyankaprava6@gmail.com",
    label: "Email",
    Icon: Mail,
  },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 overflow-hidden bg-gradient-to-br from-[#0a3a23] via-[#0F5132] to-[#0a3a23] text-white">
      {/* Top gold accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4A24C] to-transparent" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 20%, rgba(212,162,76,0.45) 0px, transparent 35%), radial-gradient(circle at 90% 80%, rgba(212,162,76,0.4) 0px, transparent 35%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,162,76,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(212,162,76,0.18) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* Top CTA strip */}
        <div className="mb-12 grid gap-6 rounded-3xl border border-[#D4A24C]/20 bg-white/5 p-7 backdrop-blur md:grid-cols-[1.4fr_1fr] md:items-center md:p-8 lg:mb-16">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#E6BD78]">
              Take the next step
            </p>
            <h3 className="mt-2 font-heading text-2xl font-semibold leading-tight text-white sm:text-3xl">
              Ready to begin your <span className="italic text-[#E6BD78]">global journey?</span>
            </h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-white/75">
              Book a free 1-to-1 consultation with our team. We&apos;ll guide you through IELTS prep,
              applications and visa pathways — no charge, no pressure.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
            <a
              href="https://wa.me/8801611549962"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#E6BD78] to-[#B2823A] px-6 py-3 text-sm font-semibold text-[#2A1D08] shadow-[0_12px_28px_-14px_rgba(178,130,58,0.7)] transition-all duration-300 hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/15"
            >
              Contact Us
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Brand + columns */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:gap-12">
          <div>
            <Link href="/" aria-label="Ucchash Global Education">
              <BrandLogo showTagline dark />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-6 text-white/75">
              IELTS coaching, AI-powered exam practice and study abroad support — clear, practical
              and student-first.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D4A24C]/30 bg-white/5 text-white/85 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D4A24C] hover:bg-[#D4A24C]/15 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(linkSections).map(([key, section]) => (
            <div key={key}>
              <h4
                className="font-heading text-sm font-bold uppercase tracking-[0.22em] text-[#E6BD78]"
                dangerouslySetInnerHTML={{ __html: section.title }}
              />
              <span className="mt-3 block h-px w-10 bg-gradient-to-r from-[#D4A24C] to-transparent" />
              <ul className="mt-5 space-y-3">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-1.5 text-sm text-white/85 transition-colors hover:text-white"
                    >
                      <span
                        dangerouslySetInnerHTML={{ __html: item.label }}
                      />
                      <ArrowUpRight className="h-3.5 w-3.5 -translate-y-px opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-[0.22em] text-[#E6BD78]">
              Get in Touch
            </h4>
            <span className="mt-3 block h-px w-10 bg-gradient-to-r from-[#D4A24C] to-transparent" />
            <ul className="mt-5 space-y-3 text-sm text-white/85">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#E6BD78]" />
                <a href="tel:+8801611549962" className="hover:text-white">
                  +880 1611 549962
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#E6BD78]" />
                <a href="mailto:priyankaprava6@gmail.com" className="hover:text-white break-all">
                  priyankaprava6@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Globe2 className="mt-0.5 h-4 w-4 shrink-0 text-[#E6BD78]" />
                Bangladesh · Online Worldwide
              </li>
              <li className="flex items-start gap-3">
                <Send className="mt-0.5 h-4 w-4 shrink-0 text-[#E6BD78]" />
                Response within 24 hours
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center gap-3 border-t border-white/15 pt-6 sm:flex-row sm:justify-between">
          <p className="text-center text-xs font-medium text-white/75 sm:text-left sm:text-sm">
            &copy; {year} Ucchash Global Education. All rights reserved.
          </p>
          <p className="text-center text-[11px] font-medium text-white/65 sm:text-right">
            Crafted in Bangladesh · For a global future.
          </p>
        </div>
      </div>
    </footer>
  )
}
