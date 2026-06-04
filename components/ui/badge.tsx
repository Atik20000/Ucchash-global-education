import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A24C]/60 focus-visible:ring-offset-1",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#0F5132] text-white hover:bg-[#14593a]",
        gold:
          "border-[#D4A24C]/40 bg-gradient-to-r from-[#FBF3E1] to-[#F6E6C0] text-[#7A5320]",
        emerald:
          "border-[#0F5132]/20 bg-[#0F5132]/8 text-[#0F5132]",
        ivory:
          "border-[#1A1F2C]/10 bg-[#FAF8F3] text-[#1A1F2C]",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "border-[#0F5132]/30 bg-white/70 text-[#0F5132]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
