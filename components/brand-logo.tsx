import { GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"

type BrandLogoProps = {
  showTagline?: boolean
  compact?: boolean
  dark?: boolean
  className?: string
}

export function BrandLogo({ showTagline = false, compact = false, dark = false, className }: BrandLogoProps) {
  return (
    <div className={cn("inline-flex items-center gap-2.5 sm:gap-3", className)}>
      <div
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center rounded-2xl",
          "bg-gradient-to-br from-[#14593a] via-[#0F5132] to-[#0a3a23] text-white",
          "shadow-[0_8px_24px_-12px_rgba(15,81,50,0.55)]",
          "ring-1 ring-[#D4A24C]/30",
          compact ? "h-9 w-9 sm:h-10 sm:w-10" : "h-12 w-12 sm:h-14 sm:w-14",
        )}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/8 to-white/20"
        />
        <GraduationCap className={cn("relative", compact ? "h-4 w-4 sm:h-5 sm:w-5" : "h-6 w-6 sm:h-7 sm:w-7")} />
        <span
          aria-hidden
          className={cn(
            "absolute -bottom-1 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full",
            "bg-gradient-to-r from-transparent via-[#D4A24C] to-transparent",
            "opacity-80",
          )}
        />
      </div>

      <div className="min-w-0 leading-none">
        <p
          className={cn(
            "font-heading tracking-tight",
            compact ? "text-base font-bold sm:text-lg" : "text-2xl font-bold sm:text-3xl",
            dark ? "text-white" : "text-[#0F5132]",
          )}
        >
          Ucchash
          <span className={cn("ml-1.5 font-medium italic", dark ? "text-[#E6BD78]" : "text-[#B2823A]")}>
            Global
          </span>
        </p>
        <p
          className={cn(
            "font-body font-semibold uppercase",
            compact
              ? "mt-1 text-[9px] tracking-[0.16em] sm:text-[10px] sm:tracking-[0.18em]"
              : "mt-1.5 text-[10px] tracking-[0.2em] sm:text-xs sm:tracking-[0.22em]",
            dark ? "text-white/85" : "text-[#1A1F2C]/70",
          )}
        >
          Education
        </p>
        {showTagline ? (
          <p
            className={cn(
              "mt-2 max-w-[18rem] font-body text-[11px] font-medium italic leading-relaxed sm:text-xs",
              dark ? "text-white/80" : "text-[#1A1F2C]/65",
            )}
          >
            With Ucchash Global Education —{" "}
            <span className={cn("not-italic font-semibold", dark ? "text-[#E6BD78]" : "text-[#0F5132]")}>
              IELTS Experts. Abroad Guidance. Proven Success.
            </span>
          </p>
        ) : null}
      </div>
    </div>
  )
}
