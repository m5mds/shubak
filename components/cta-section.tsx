'use client'

import { useState, useCallback, useEffect } from 'react'
import { useLocale } from '@/lib/i18n/context'
import { SectionReveal } from '@/components/motion/SectionReveal'
import { SurfaceReveal } from '@/components/motion/SurfaceReveal'
import { WindowFrame } from '@/components/ui/WindowFrame'

const COOLDOWN_SECONDS = 60

export default function CtaSection() {
  const { dict } = useLocale()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorKey, setErrorKey] = useState<'requiredFields' | 'invalidEmail' | 'errorMessage' | null>(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [cooldown, setCooldown] = useState(0)

  useEffect(() => {
    if (cooldown <= 0) return
    const id = setTimeout(() => setCooldown((c) => c - 1), 1000)
    return () => clearTimeout(id)
  }, [cooldown])

  const startCooldown = useCallback(() => setCooldown(COOLDOWN_SECONDS), [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    }

    if (!payload.name || !payload.email || !payload.message) {
      setErrorKey('requiredFields')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      setErrorKey('invalidEmail')
      return
    }

    setLoading(true)
    setErrorKey(null)

    try {
      const subject = encodeURIComponent(`New inquiry from ${payload.name}`)
      const body = encodeURIComponent(
        `Name: ${payload.name}\nEmail: ${payload.email}\n\nProject Idea:\n${payload.message}`
      )
      window.location.href = `mailto:hello@shubak.ai?subject=${subject}&body=${body}`
      setSubmitted(true)
      setForm({ name: '', email: '', message: '' })
      startCooldown()
    } catch {
      setErrorKey('errorMessage')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="contact"
      className="homepage-section homepage-section--cta relative overflow-hidden bg-[#0a0a0f]"
      style={{ paddingTop: 'clamp(80px, 12vh, 140px)', paddingBottom: 'clamp(80px, 12vh, 140px)' }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[360px]"
        style={{
          background: 'radial-gradient(ellipse 60% 46% at 50% 10%, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 36%, transparent 74%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-2xl px-5 lg:px-10">
        <SectionReveal className="mb-10 text-center">
          <span className="mb-4 block font-mono text-sm uppercase tracking-[0.25em] text-white/50">
            {dict.contact.title}
          </span>
          <h2 className="text-[clamp(28px,3.8vw,48px)] font-medium tracking-tight text-white">
            {dict.contact.subtitle}
          </h2>
        </SectionReveal>

        <SurfaceReveal delay={0.1}>
          <WindowFrame variant="glass" className="overflow-hidden border-white/[0.08]">
            <div className="px-7 py-8 md:px-10 md:py-10">
              {submitted ? (
                <div className="py-8 text-center">
                  <p className="text-[17px] text-white/80">{dict.contact.successMessage}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-7">
                  {errorKey && (
                    <div
                      role="alert"
                      aria-live="polite"
                      className="rounded-[10px] border border-white/[0.1] bg-white/[0.03] p-4 text-[14px] text-white/65"
                    >
                      <p>{dict.contact[errorKey]}</p>
                      <button
                        type="button"
                        onClick={() => setErrorKey(null)}
                        className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/50 transition-colors hover:text-white"
                      >
                        {dict.contact.retry}
                      </button>
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="cta-name"
                      className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-white/40"
                    >
                      {dict.contact.name}
                    </label>
                    <input
                      id="cta-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      dir="auto"
                      value={form.name}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, name: e.target.value }))
                        setErrorKey(null)
                      }}
                      placeholder={dict.contact.name}
                      className="w-full rounded-none border-b border-white/[0.1] bg-transparent py-3 text-[15px] text-white outline-none transition-colors placeholder:text-white/25 hover:border-white/[0.2] focus:border-white/[0.3]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="cta-email"
                      className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-white/40"
                    >
                      {dict.contact.email}
                    </label>
                    <input
                      id="cta-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      spellCheck={false}
                      dir="ltr"
                      value={form.email}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, email: e.target.value }))
                        setErrorKey(null)
                      }}
                      placeholder={dict.contact.email}
                      className="w-full rounded-none border-b border-white/[0.1] bg-transparent py-3 text-[15px] text-white outline-none transition-colors placeholder:text-white/25 hover:border-white/[0.2] focus:border-white/[0.3]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="cta-message"
                      className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-white/40"
                    >
                      {dict.contact.message}
                    </label>
                    <textarea
                      id="cta-message"
                      name="message"
                      required
                      rows={4}
                      dir="auto"
                      value={form.message}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, message: e.target.value }))
                        setErrorKey(null)
                      }}
                      placeholder={dict.contact.message}
                      className="w-full resize-none rounded-none border-b border-white/[0.1] bg-transparent py-3 text-[15px] text-white outline-none transition-colors placeholder:text-white/25 hover:border-white/[0.2] focus:border-white/[0.3]"
                    />
                  </div>

                  <div className="flex flex-col items-start gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={loading || cooldown > 0}
                      className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-b from-white to-white/92 px-8 text-[13px] font-medium uppercase tracking-[0.14em] text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_1px_3px_rgba(0,0,0,0.3)] transition-[transform,box-shadow,opacity] duration-300 ease-[var(--ease-out-expo)] hover:scale-[1.01] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_16px_rgba(255,255,255,0.15)] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {cooldown > 0 ? `${dict.contact.submit} (${cooldown}s)` : dict.contact.submit}
                    </button>
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/35">
                      {dict.cta.trustLine}
                    </p>
                  </div>
                </form>
              )}
            </div>
          </WindowFrame>
        </SurfaceReveal>
      </div>
    </section>
  )
}
