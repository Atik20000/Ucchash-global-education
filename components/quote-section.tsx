"use client"

export function QuoteSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28 md:py-32">
      {/* Layered emerald background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0a3a23] via-[#0F5132] to-[#0a3a23]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 20%, rgba(212,162,76,0.4) 0px, transparent 35%), radial-gradient(circle at 88% 80%, rgba(212,162,76,0.35) 0px, transparent 35%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,162,76,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(212,162,76,0.18) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Gold edges */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4A24C] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4A24C] to-transparent" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <span
          aria-hidden
          className="block select-none font-heading text-[6rem] leading-none text-[#D4A24C]/40 sm:text-[8rem]"
        >
          “
        </span>

        <blockquote className="-mt-6 text-balance font-heading text-2xl font-medium italic leading-[1.45] text-white sm:text-[2rem] md:text-[2.5rem]">
          Education is the most powerful weapon which you can use to change the world.
          <span className="mt-2 block text-[#E6BD78]">
            Language is the bridge that connects us all.
          </span>
        </blockquote>

        <div className="mx-auto mt-8 flex items-center justify-center gap-4">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4A24C]/60" />
          <cite className="font-body text-xs font-semibold uppercase tracking-[0.22em] not-italic text-[#D4A24C]">
            Inspired by Nelson Mandela
          </cite>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4A24C]/60" />
        </div>
      </div>
    </section>
  )
}
