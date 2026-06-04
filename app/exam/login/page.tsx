"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, CheckCircle2, ShieldCheck, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { loginToVocavolt, getStoredPortalToken, setStoredPortalToken } from "@/lib/vocavolt-api"
import { BrandLogo } from "@/components/brand-logo"

export default function StudentLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (getStoredPortalToken()) {
      router.replace("/exam/dashboard")
    }
  }, [router])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const token = await loginToVocavolt(email, password)
      setStoredPortalToken(token)
      router.push("/exam/dashboard")
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#FAF8F3] via-white to-[#FAF8F3]" />
      <div className="absolute inset-0 -z-10 bg-grid-emerald opacity-30" />
      <div className="absolute -left-32 top-16 -z-10 h-80 w-80 rounded-full bg-[#0F5132]/10 blur-[110px]" />
      <div className="absolute -right-32 top-10 -z-10 h-80 w-80 rounded-full bg-[#D4A24C]/18 blur-[110px]" />

      {/* Top gold accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4A24C]/60 to-transparent" />

      <div className="mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid w-full gap-10 lg:grid-cols-2 lg:gap-14">
          {/* LEFT: brand + value props */}
          <div className="flex flex-col justify-center">
            <Link href="/" className="mb-6 w-fit">
              <BrandLogo compact />
            </Link>

            <Badge variant="gold" className="mb-5 w-fit">
              <Sparkles className="h-3 w-3" />
              Student Portal
            </Badge>

            <h1 className="font-heading text-4xl font-bold tracking-tight text-[#1A1F2C] sm:text-5xl">
              Sign in to your <span className="italic text-emerald-shine">IELTS dashboard</span>
            </h1>
            <div className="mt-5 h-px w-24 bg-gradient-to-r from-[#D4A24C] to-transparent" />
            <p className="mt-5 max-w-xl text-[15px] leading-[1.85] text-[#1A1F2C]/70 sm:text-base">
              Use your student portal credentials to access mock tests, start an exam and view your
              results — all in one place.
            </p>

            <div className="mt-8 space-y-3">
              {[
                { Icon: CheckCircle2, text: "Secure student account login" },
                { Icon: CheckCircle2, text: "Access your exams and results instantly" },
                { Icon: ShieldCheck, text: "Your credentials are protected and private" },
              ].map(({ Icon, text }) => (
                <p
                  key={text}
                  className="flex items-center gap-3 text-sm font-medium text-[#1A1F2C]/75"
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#0F5132]/8 text-[#0F5132]">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  {text}
                </p>
              ))}
            </div>

            <div className="mt-9 flex gap-3">
              <Link href="/">
                <Button variant="outline">Back to Home</Button>
              </Link>
            </div>
          </div>

          {/* RIGHT: login card */}
          <Card className="card-lift w-full max-w-xl">
            <div className="h-1 w-full bg-gradient-to-r from-[#0F5132] via-[#D4A24C] to-[#0F5132]" />
            <CardHeader className="pt-7">
              <Badge variant="emerald" className="w-fit">
                Login
              </Badge>
              <CardTitle className="mt-2 font-heading text-2xl">Welcome back</CardTitle>
              <CardDescription>
                Enter the email and password provided for your student portal.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[#1A1F2C]/65"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-2xl border border-[#0F5132]/15 bg-white px-4 py-3.5 text-[15px] outline-none transition focus:border-[#0F5132]/35 focus:ring-2 focus:ring-[#D4A24C]/30"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[#1A1F2C]/65"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      className="w-full rounded-2xl border border-[#0F5132]/15 bg-white px-4 py-3.5 pr-12 text-[15px] outline-none transition focus:border-[#0F5132]/35 focus:ring-2 focus:ring-[#D4A24C]/30"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute inset-y-0 right-0 flex items-center px-4 text-[#1A1F2C]/55 transition hover:text-[#0F5132]"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="rounded-2xl border border-red-200 bg-red-50/85 px-4 py-3 text-sm text-red-700">
                    {error}
                  </p>
                )}

                <Button type="submit" size="lg" className="w-full group" disabled={loading}>
                  {loading ? "Signing in…" : "Sign In"}
                  {!loading && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
                </Button>

                <p className="text-center text-xs text-[#1A1F2C]/55">
                  Trouble signing in?{" "}
                  <a
                    href="https://wa.me/8801611549962"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#0F5132] underline"
                  >
                    Contact support
                  </a>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
