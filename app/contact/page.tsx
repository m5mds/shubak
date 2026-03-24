'use client'

import { useState, useEffect, useCallback } from 'react'
import { useLocale } from '@/lib/i18n/context'
import { FadeUp } from '@/components/animated-text'
import { WindowFrame } from '@/components/ui/WindowFrame'

type ContactErrorKey = 'requiredFields' | 'invalidEmail' | 'errorMessage' | 'rateLimited'

const COOLDOWN_SECONDS = 60

export default function ContactPage() {
  const { dict } = useLocale()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorKey, setErrorKey] = useState<ContactErrorKey | null>(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [cooldown, setCooldown] = useState(0)

  /* Cooldown countdown timer */
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null

        if (data?.error === 'rate_limited') {
          setErrorKey('rateLimited')
          startCooldown()
        } else if (data?.error === 'missing_fields') {
          setErrorKey('requiredFields')
        } else if (data?.error === 'invalid_email') {
          setErrorKey('invalidEmail')
        } else {
          setErrorKey('errorMessage')
        }

        return
      }

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
    <section className="relative min-h-screen pt-28 md:pt-32">
      <div className="relative mx-auto max-w-content px-5 py-20 lg:px-10 lg:py-28">
        <FadeUp className="mx-auto max-w-3xl">
          <WindowFrame className="p-6 md:p-10">
            <div className="mx-auto max-w-2xl">
              <h1 className="mb-5 text-[clamp(36px,4.5vw,52px)] leading-tight text-white">
                {dict.contact.title}
              </h1>
              <p className="mb-12 text-[17px] leading-relaxed text-text-muted">{dict.contact.subtitle}</p>

              {submitted ? (
                <div className="rounded-[12px] border border-white/[0.08] bg-surface p-10">
                  <p className="text-[17px] text-text">{dict.contact.successMessage}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {errorKey ? (
                    <div
                      role="alert"
                      aria-live="polite"
                      className="rounded-[12px] border border-[var(--border-hover)] bg-white/[0.03] p-4 text-[15px] text-white/70"
                    >
                      <p>{dict.contact[errorKey]}</p>
                      <button
                        type="button"
                        onClick={() => setErrorKey(null)}
                        className="mt-3 inline-flex items-center justify-center rounded-full border border-[var(--border)] px-4 py-2 text-[11px] font-mono uppercase tracking-[0.14em] text-white transition-colors hover:border-[var(--border-hover)]"
                      >
                        {dict.contact.retry}
                      </button>
                    </div>
                  ) : null}

                  <div>
                    <label htmlFor="contact-name" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.1em] text-text-muted">
                      {dict.contact.name}
                    </label>
                    <input
                      id="contact-name"
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
                      className="w-full rounded-none border-b border-[var(--border)] bg-transparent py-3 text-[15px] text-text outline-none transition-colors duration-300 placeholder:text-white/[.28] hover:border-[var(--border-hover)] focus:border-[var(--border-hover)]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.1em] text-text-muted">
                      {dict.contact.email}
                    </label>
                    <input
                      id="contact-email"
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
                      className="w-full rounded-none border-b border-[var(--border)] bg-transparent py-3 text-[15px] text-text outline-none transition-colors duration-300 placeholder:text-white/[.28] hover:border-[var(--border-hover)] focus:border-[var(--border-hover)]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.1em] text-text-muted">
                      {dict.contact.message}
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={6}
                      dir="auto"
                      value={form.message}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, message: e.target.value }))
                        setErrorKey(null)
                      }}
                      placeholder={dict.contact.message}
                      className="w-full resize-none rounded-none border-b border-[var(--border)] bg-transparent py-3 text-[15px] text-text outline-none transition-colors duration-300 placeholder:text-white/[.28] hover:border-[var(--border-hover)] focus:border-[var(--border-hover)]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || cooldown > 0}
                    className="inline-flex h-14 items-center justify-center rounded-full bg-accent px-8 text-[15px] font-medium text-bg transition-opacity duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {cooldown > 0
                      ? `${dict.contact.submit} (${cooldown}s)`
                      : dict.contact.submit}
                  </button>
                </form>
              )}
            </div>
          </WindowFrame>
        </FadeUp>
      </div>
    </section>
  )
}
