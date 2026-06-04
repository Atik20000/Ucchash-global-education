import type React from "react"
import { Badge } from "@/components/ui/badge"

type PublicPageHeroProps = {
  badge?: string
  title: string
  description: string
  children?: React.ReactNode
}

export function PublicPageHero({ badge, title, description, children }: PublicPageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#FAF8F3] via-[#FAF8F3]/85 to-white" />
      <div className="absolute -left-24 top-16 -z-10 h-72 w-72 rounded-full bg-[#0F5132]/12 blur-[100px]" />
      <div className="absolute -right-24 top-10 -z-10 h-72 w-72 rounded-full bg-[#D4A24C]/20 blur-[100px]" />
      <div className="absolute inset-0 -z-10 bg-grid-emerald opacity-30" />

      {/* Top gold accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4A24C]/60 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl animate-in-up">
          {children ? <div className="mb-6">{children}</div> : null}
          {badge ? (
            <Badge variant="gold" className="mb-4 max-w-full whitespace-normal text-left leading-tight sm:mb-5">
              {badge}
            </Badge>
          ) : null}
          <h1 className="text-balance font-heading text-[1.9rem] font-bold leading-[1.1] tracking-tight text-[#1A1F2C] xs:text-[2.25rem] sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <div className="mt-5 h-px w-20 bg-gradient-to-r from-[#D4A24C] to-transparent sm:mt-6 sm:w-24" />
          <p className="mt-5 max-w-3xl text-[15px] leading-[1.8] text-[#1A1F2C]/70 sm:mt-6 sm:text-lg sm:leading-[1.85] md:text-xl">
            {description}
          </p>
        </div>
      </div>
    </section>
  )
}
