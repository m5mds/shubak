'use client'

import Link from 'next/link'
import { SectionReveal } from '@/components/motion/SectionReveal'
import { SurfaceReveal } from '@/components/motion/SurfaceReveal'
import { WindowFrame } from '@/components/ui/WindowFrame'
import { useLocale } from '@/lib/i18n/context'

interface CtaSectionProps {
  href?: string
  label?: string
}

export default function CtaSection({ href, label }: CtaSectionProps) {
  const { dict } = useLocale()
  const callToActionHref = href ?? '/contact'
  const callToActionLabel = label ?? dict.cta.primaryAction
  const directEmailHref = `mailto:${dict.cta.button}`
  const isMailto = callToActionHref.startsWith('mailto:')

  return (
    <section
      id="contact"
      className="homepage-section homepage-section--cta relative overflow-hidden bg-[#0a0a0f]"
      style={{ paddingTop: 'clamp(80px, 12vh, 140px)', paddingBottom: 'clamp(80px, 12vh, 140px)' }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
        style={{
          background: 'radial-gradient(ellipse 60% 46% at 50% 10%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 36%, transparent 74%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 lg:px-10">
        <SectionReveal className="mx-auto max-w-3xl text-center">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.25em] text-white/46 md:text-[13px]">
            {dict.cta.eyebrow}
          </p>
        </SectionReveal>

        <SurfaceReveal delay={0.08} className="mt-8">
          <div className="grid gap-3 md:grid-cols-3">
            {dict.cta.proofStrip.map((item) => (
              <div
                key={item.label}
                className="relative overflow-hidden rounded-[18px] border border-white/[0.08] bg-white/[0.03] px-5 py-5 backdrop-blur-[10px]"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent"
                />
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/38">{item.label}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-white/76">{item.value}</p>
              </div>
            ))}
          </div>
        </SurfaceReveal>

        <SurfaceReveal delay={0.14} className="mt-6">
          <WindowFrame variant="glass" className="overflow-hidden border-white/[0.08] bg-[#0f1016]/78">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.22) 20%, rgba(255,255,255,0.22) 80%, rgba(255,255,255,0) 100%)',
              }}
            />

            <div className="grid gap-10 px-8 py-10 md:px-12 md:py-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12">
              <div>
                <h2 className="max-w-[14ch] text-[clamp(34px,5vw,64px)] leading-[1.04] tracking-tight text-white">
                  {dict.cta.heading}
                </h2>
                <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/62 md:text-[19px]">
                  {dict.cta.subtitle}
                </p>
                <p className="mt-8 max-w-2xl font-mono text-[11px] uppercase tracking-[0.16em] text-white/38 md:text-[12px]">
                  {dict.cta.trustLine}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {isMailto ? (
                    <a
                      href={callToActionHref}
                      className="inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-b from-white to-white/92 px-7 text-[14px] font-medium uppercase tracking-[0.12em] text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_1px_3px_rgba(0,0,0,0.3)] transition-[transform,box-shadow,background-color] duration-300 ease-[var(--ease-out-expo)] hover:scale-[1.01] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_16px_rgba(255,255,255,0.15)] focus-visible:scale-[1.01]"
                    >
                      {callToActionLabel}
                    </a>
                  ) : (
                    <Link
                      href={callToActionHref}
                      className="inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-b from-white to-white/92 px-7 text-[14px] font-medium uppercase tracking-[0.12em] text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_1px_3px_rgba(0,0,0,0.3)] transition-[transform,box-shadow,background-color] duration-300 ease-[var(--ease-out-expo)] hover:scale-[1.01] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_16px_rgba(255,255,255,0.15)] focus-visible:scale-[1.01]"
                    >
                      {callToActionLabel}
                    </Link>
                  )}

                  <a
                    href={directEmailHref}
                    className="inline-flex h-14 items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-7 text-[14px] font-medium uppercase tracking-[0.12em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm transition-[transform,border-color,background-color,color] duration-300 ease-[var(--ease-out-expo)] hover:scale-[1.01] hover:border-white/22 hover:bg-white/[0.08] hover:text-white focus-visible:scale-[1.01]"
                  >
                    {dict.cta.secondaryAction}
                  </a>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/35">
                  {dict.cta.storyEyebrow}
                </p>

                <div className="space-y-4">
                  {dict.cta.storyBlocks.map((item) => (
                    <div
                      key={item.title}
                      className="relative overflow-hidden rounded-[18px] border border-white/[0.08] bg-white/[0.02] px-5 py-5"
                    >
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent"
                      />
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">{item.title}</p>
                      <p className="mt-3 text-[15px] leading-relaxed text-white/72">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </WindowFrame>
        </SurfaceReveal>
      </div>
    </section>
  )
}
