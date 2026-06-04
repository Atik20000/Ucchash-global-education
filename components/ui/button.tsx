import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-full text-sm font-semibold tracking-tight",
    "transition-all duration-300 ease-out",
    "hover:-translate-y-0.5 active:translate-y-0",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
    "shrink-0 [&_svg]:shrink-0 outline-none",
    "focus-visible:ring-[3px] focus-visible:ring-[#D4A24C]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF8F3]",
    "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  ].join(' '),
  {
    variants: {
      variant: {
        default:
          'bg-[#0F5132] text-white shadow-[0_12px_30px_-12px_rgba(15,81,50,0.55)] hover:bg-[#14593a] hover:shadow-[0_18px_36px_-14px_rgba(15,81,50,0.6)]',
        gold:
          'bg-gradient-to-b from-[#E6BD78] via-[#D4A24C] to-[#B2823A] text-[#2A1D08] shadow-[0_12px_30px_-12px_rgba(178,130,58,0.55)] hover:from-[#EFC78A] hover:to-[#C4922F] hover:shadow-[0_18px_36px_-14px_rgba(178,130,58,0.6)]',
        outline:
          'border border-[#0F5132]/20 bg-white/85 text-[#0F5132] shadow-[0_2px_10px_-4px_rgba(15,81,50,0.18)] backdrop-blur-sm hover:bg-[#0F5132] hover:text-white hover:border-[#0F5132]',
        soft:
          'bg-[#0F5132]/8 text-[#0F5132] hover:bg-[#0F5132]/14',
        ivory:
          'bg-[#FAF8F3] text-[#1A1F2C] border border-[#1A1F2C]/10 shadow-sm hover:bg-white hover:border-[#0F5132]/30',
        destructive:
          'bg-destructive text-white shadow-md hover:bg-destructive/90 focus-visible:ring-destructive/35',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost:
          'text-[#0F5132] hover:bg-[#0F5132]/8',
        link:
          'text-[#0F5132] underline-offset-4 hover:underline rounded-none px-0 hover:translate-y-0',
      },
      size: {
        default: 'h-10 px-5 py-2 has-[>svg]:px-4',
        sm: 'h-8 px-3.5 text-xs has-[>svg]:px-3',
        lg: 'h-12 px-7 text-[15px] has-[>svg]:px-5',
        xl: 'h-14 px-9 text-base has-[>svg]:px-7',
        icon: 'size-10',
        'icon-sm': 'size-8',
        'icon-lg': 'size-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
