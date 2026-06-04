"use client"

import { useEffect, useRef, useState } from "react"

type StatItem = {
  label: string
  target: number
  suffix: string
}

const stats: StatItem[] = [
  { label: "Students Placed", target: 500, suffix: "+" },
  { label: "Visa Success Rate", target: 95, suffix: "%" },
  { label: "Partner Universities", target: 100, suffix: "+" },
  { label: "Study Destinations", target: 6, suffix: "+" },
]

function StatCounter({ item, shouldStart }: { item: StatItem; shouldStart: boolean }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!shouldStart) return
    let frameId = 0
    const duration = 2200
    const startTime = performance.now()
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const next = Math.round(item.target * eased)
      setValue(next)
      if (progress < 1) frameId = requestAnimationFrame(animate)
    }
    frameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameId)
  }, [item.target, shouldStart])

  return (
    <div className="group/stat card-lift relative overflow-hidden rounded-2xl border border-[#0F5132]/10 bg-white px-4 py-6 text-center shadow-[0_1px_2px_rgba(15,81,50,0.04),0_12px_28px_-16px_rgba(15,81,50,0.16)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[#D4A24C]/60 to-transparent opacity-60 transition-opacity duration-500 group-hover/stat:opacity-100"
      />
      <p className="font-heading text-3xl font-bold tabular-nums text-[#0F5132] sm:text-4xl">
        {value}
        <span className="text-[#B2823A]">{item.suffix}</span>
      </p>
      <div className="mx-auto mt-2 h-px w-10 bg-gradient-to-r from-transparent via-[#D4A24C] to-transparent" />
      <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1A1F2C]/60 sm:text-xs">
        {item.label}
      </p>
    </div>
  )
}

export function StudyAbroadStatsGrid() {
  const [shouldStart, setShouldStart] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldStart(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
      {stats.map((item) => (
        <StatCounter key={item.label} item={item} shouldStart={shouldStart} />
      ))}
    </div>
  )
}
