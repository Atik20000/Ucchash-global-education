"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Mail, Facebook, Phone, MapPin, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

type ContactPoint = {
  Icon: typeof Phone
  label: string
  value: string
  href: string | null
}

const contactPoints: ContactPoint[] = [
  {
    Icon: Phone,
    label: "Call",
    value: "+880 1611 549962",
    href: "tel:+8801611549962",
  },
  {
    Icon: Mail,
    label: "Email",
    value: "priyankaprava6@gmail.com",
    href: "mailto:priyankaprava6@gmail.com",
  },
  {
    Icon: MapPin,
    label: "Region",
    value: "Bangladesh · Online Worldwide",
    href: null,
  },
  {
    Icon: Clock,
    label: "Response",
    value: "Within 24 hours",
    href: null,
  },
]

function ContactCard({ Icon, label, value, href }: ContactPoint) {
  const inner = (
    <div
      className={cn(
        "group/contact card-lift relative flex h-full flex-col items-center gap-3 overflow-hidden rounded-2xl border border-[#0F5132]/10 bg-white/90 p-4 text-center backdrop-blur-sm transition-all sm:p-5",
        href && "hover:border-[#0F5132]/30",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[#D4A24C]/60 to-transparent opacity-0 transition-opacity duration-300 group-hover/contact:opacity-100"
      />
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0F5132] to-[#14593a] text-white shadow-[0_8px_18px_-8px_rgba(15,81,50,0.55)] ring-1 ring-[#D4A24C]/25 sm:h-11 sm:w-11">
        <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1A1F2C]/55">
          {label}
        </p>
        <p className="mt-1.5 break-words text-[13px] font-semibold leading-snug text-[#1A1F2C] sm:text-sm">
          {value}
        </p>
      </div>
    </div>
  )

  if (!href) return inner

  return (
    <a href={href} className="block h-full focus-gold rounded-2xl">
      {inner}
    </a>
  )
}

export function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden py-16 sm:py-20 md:py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-[#FAF8F3]/60 to-white" />
      <div className="absolute -left-24 top-1/3 -z-10 h-72 w-72 rounded-full bg-[#0F5132]/8 blur-[100px]" />
      <div className="absolute -right-24 bottom-10 -z-10 h-72 w-72 rounded-full bg-[#D4A24C]/15 blur-[100px]" />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="glass-card relative overflow-hidden rounded-3xl p-6 text-center sm:p-10 md:p-12 lg:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[#D4A24C] to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#0F5132]/8 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-[#D4A24C]/20 blur-3xl"
            />

            <div className="relative animate-in-up">
              <Badge variant="gold" className="mx-auto mb-5">
                Free Consultation
              </Badge>
              <h2 className="text-balance font-heading text-[1.85rem] font-bold leading-[1.12] tracking-tight text-[#1A1F2C] xs:text-3xl sm:text-[2.25rem] md:text-[2.5rem]">
                Book your <span className="text-emerald-shine">free study abroad &amp; IELTS</span>
                <span className="block italic text-[#1A1F2C]/85">counseling today.</span>
              </h2>
              <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-[#D4A24C] to-transparent sm:w-32" />
              <p className="mx-auto mt-5 max-w-2xl text-balance text-[14px] leading-[1.75] text-[#1A1F2C]/70 sm:mt-6 sm:text-[15px] sm:leading-7 md:text-base">
                Talk one-to-one with our team about IELTS preparation and studying abroad in the UK,
                Australia, New Zealand or Europe (Schengen). We&rsquo;ll assess your profile, explain
                visa and admission pathways, and help you choose the right country, course and
                budget — completely free of charge.
              </p>

              {/* CTAs */}
              <div className="mx-auto mt-7 grid w-full max-w-2xl gap-2.5 sm:mt-9 sm:grid-cols-3 sm:gap-3">
                <Button asChild size="lg" className="w-full">
                  <a href="https://wa.me/8801611549962" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full">
                  <a
                    href="https://www.facebook.com/profile.php?id=61582057299621"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook className="h-4 w-4" />
                    Facebook
                  </a>
                </Button>
                <Button asChild size="lg" variant="ivory" className="w-full">
                  <a href="mailto:priyankaprava6@gmail.com">
                    <Mail className="h-4 w-4" />
                    Email
                  </a>
                </Button>
              </div>

              {/* Contact grid — center-stacked layout, never overflows */}
              <div className="mt-10 grid gap-3 xs:grid-cols-2 sm:mt-12 lg:grid-cols-4">
                {contactPoints.map((point) => (
                  <ContactCard key={point.label} {...point} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
