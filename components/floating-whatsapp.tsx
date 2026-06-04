"use client"

import { useEffect, useRef, useState } from "react"
import { Mail, Facebook, MessageCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"

const channels = [
  {
    name: "WhatsApp",
    href: "https://wa.me/8801611549962",
    ariaLabel: "Chat on WhatsApp",
    external: true,
    bg: "bg-[#25D366] hover:bg-[#1ebe5a]",
    glow: "shadow-[0_14px_30px_-12px_rgba(37,211,102,0.55)]",
    Icon: (
      <svg viewBox="0 0 32 32" className="h-5 w-5" fill="currentColor" aria-hidden>
        <path d="M16.004 3C9.378 3 4 8.378 4 15.004c0 2.385.69 4.605 1.886 6.475L4 28l6.7-1.756a12.05 12.05 0 0 0 5.304 1.243h.005c6.625 0 12.003-5.378 12.003-12.003C28.012 8.378 22.629 3 16.004 3Zm0 21.99h-.004a9.98 9.98 0 0 1-5.087-1.394l-.365-.217-3.974 1.042 1.06-3.872-.238-.397a9.974 9.974 0 0 1-1.53-5.148c0-5.514 4.486-10 10.001-10 5.515 0 9.992 4.486 9.992 10.001 0 5.514-4.482 9.985-9.855 9.985Zm5.493-7.486c-.301-.151-1.781-.879-2.058-.979-.276-.1-.477-.151-.677.151-.2.302-.776.979-.952 1.18-.175.2-.351.226-.652.075-.301-.151-1.272-.469-2.422-1.494-.895-.798-1.5-1.784-1.676-2.086-.176-.302-.019-.465.132-.616.135-.135.301-.351.452-.527.151-.176.2-.302.301-.503.1-.2.05-.377-.025-.527-.075-.151-.677-1.633-.928-2.236-.245-.587-.494-.508-.677-.518-.176-.008-.377-.01-.578-.01-.2 0-.527.075-.803.377-.276.302-1.054 1.03-1.054 2.512s1.079 2.913 1.229 3.114c.151.201 2.123 3.243 5.146 4.547.72.31 1.281.495 1.719.633.722.229 1.379.197 1.899.12.579-.087 1.781-.728 2.034-1.43.251-.703.251-1.305.176-1.43-.075-.126-.276-.201-.577-.352Z" />
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto:priyankaprava6@gmail.com",
    ariaLabel: "Send us an email",
    external: false,
    bg: "bg-[#EA4335] hover:bg-[#d2362a]",
    glow: "shadow-[0_14px_30px_-12px_rgba(234,67,53,0.55)]",
    Icon: <Mail className="h-5 w-5" strokeWidth={2.2} />,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61582057299621",
    ariaLabel: "Visit our Facebook page",
    external: true,
    bg: "bg-[#1877F2] hover:bg-[#1666d4]",
    glow: "shadow-[0_14px_30px_-12px_rgba(24,119,242,0.55)]",
    Icon: <Facebook className="h-5 w-5 fill-current" />,
  },
]

export function FloatingWhatsapp() {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Close on Esc
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [open])

  return (
    <div
      ref={wrapperRef}
      className="fixed bottom-5 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6"
    >
      {/* Expanded options (stacked above main button) */}
      <div
        className={cn(
          "flex flex-col items-end gap-3 transition-all duration-300 ease-out",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0",
        )}
      >
        {channels.map((c, idx) => (
          <a
            key={c.name}
            href={c.href}
            {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            aria-label={c.ariaLabel}
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            className={cn(
              "group/item flex items-center gap-2 transition-transform duration-300",
              open ? "translate-y-0" : "translate-y-4",
            )}
            style={{ transitionDelay: open ? `${idx * 60}ms` : "0ms" }}
          >
            {/* Label chip */}
            <span className="hidden whitespace-nowrap rounded-full bg-[#1A1F2C] px-3 py-1.5 text-xs font-semibold text-white shadow-md sm:inline-block">
              {c.name}
            </span>

            {/* Icon button */}
            <span
              className={cn(
                "inline-flex h-12 w-12 items-center justify-center rounded-full text-white ring-2 ring-white/90 transition-all duration-300",
                "hover:-translate-y-0.5 hover:scale-105",
                c.bg,
                c.glow,
              )}
            >
              {c.Icon}
            </span>
          </a>
        ))}
      </div>

      {/* Main toggle button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close contact menu" : "Open contact menu"}
        aria-expanded={open}
        className={cn(
          "relative inline-flex h-14 w-14 items-center justify-center rounded-full text-white",
          "ring-2 ring-white/90 transition-all duration-300 ease-out",
          "hover:-translate-y-0.5 hover:scale-105",
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#D4A24C]/65",
          open
            ? "rotate-90 bg-gradient-to-br from-[#1A1F2C] to-[#0a3a23] shadow-[0_18px_36px_-12px_rgba(15,81,50,0.55)]"
            : "bg-gradient-to-br from-[#14593a] to-[#0F5132] shadow-[0_18px_36px_-12px_rgba(15,81,50,0.55)]",
        )}
      >
        {/* Pulse only when closed */}
        {!open && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 animate-ping rounded-full bg-[#D4A24C]/35"
            style={{ animationDuration: "2.4s" }}
          />
        )}
        <span className="transition-transform duration-300">
          {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </span>
      </button>
    </div>
  )
}
