"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { BrandLogo } from "@/components/brand-logo"
import { Menu, X, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/study-abroad", label: "Study Abroad" },
  { href: "/courses", label: "Course Batches" },
  { href: "/courses#exam-packages", label: "Exam Packages" },
  { href: "/contact", label: "Contact" },
]

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  return (
    <nav
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-[#0F5132]/8 bg-[#FAF8F3]/90 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(15,81,50,0.12)]"
          : "border-b border-transparent bg-[#FAF8F3]/70 backdrop-blur-md sm:bg-transparent sm:backdrop-blur-none",
      )}
    >
      {/* Top gold accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4A24C]/40 to-transparent" />

      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <Link href="/" className="shrink-0 transition-transform duration-300 hover:scale-[1.01]">
          <BrandLogo compact />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 rounded-full border border-[#0F5132]/8 bg-white/85 px-2 py-1.5 shadow-[0_6px_24px_-12px_rgba(15,81,50,0.18)] backdrop-blur-md lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative rounded-full px-4 py-2 text-sm font-semibold text-[#1A1F2C]/75 transition-colors duration-300 hover:text-[#0F5132]"
            >
              {link.label}
              <span className="pointer-events-none absolute inset-x-4 -bottom-0.5 h-0.5 origin-center scale-x-0 rounded-full bg-gradient-to-r from-[#D4A24C]/0 via-[#D4A24C] to-[#D4A24C]/0 transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button (with text label) */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((v) => !v)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          className="inline-flex items-center gap-2 rounded-full border border-[#0F5132]/12 bg-white/90 px-3.5 py-2 text-sm font-semibold text-[#0F5132] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white sm:px-4 sm:py-2.5 lg:hidden"
        >
          {isMobileMenuOpen ? (
            <>
              <X className="h-4 w-4" />
              <span>Close</span>
            </>
          ) : (
            <>
              <Menu className="h-4 w-4" />
              <span>Menu</span>
            </>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-[#0F5132]/8 bg-[#FAF8F3]/97 backdrop-blur-xl transition-[max-height,opacity] duration-500 ease-out lg:hidden",
          isMobileMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="mx-auto w-full max-w-7xl space-y-1 px-4 py-5 sm:px-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-semibold text-[#1A1F2C]/80 transition-colors hover:bg-[#0F5132]/8 hover:text-[#0F5132]"
            >
              {link.label}
              <ChevronRight className="h-4 w-4 text-[#0F5132]/60" />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
