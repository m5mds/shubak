'use client'

import Link from 'next/link'
import { useLocale } from '@/lib/i18n/context'
import { getServiceBySlug, localise } from '@/lib/services-data'
import { FadeUp } from './animated-text'
import CtaSection from './cta-section'

interface Props {
  slug: string
}

export default function ServiceDetail({ slug }: Props) {
  const { dict, locale, dir } = useLocale()
  const isRTL = dir === 'rtl'
  const service = getServiceBySlug(slug)

  if (!service) return null

  const toolList = service.tools.split(', ')

  return (
    <section>
      <section className="relative overflow-hidden pb-16 pt-32 lg:pb-20 lg:pt-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 70% 40% at 50% -5%, rgba(255,255,255,0.03) 0%, transparent 70%)',
          }}
        />

        <div className="relative mx-auto max-w-content px-5 lg:px-10">
          <Link
            href="/#services"
            className="mb-10 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-text-faint transition-colors duration-300 hover:text-text-muted"
          >
            <span aria-hidden="true">{isRTL ? '←' : '→'}</span>
            {dict.nav.services}
          </Link>

          <FadeUp>
            <span className="mb-5 block font-mono text-[11px] tracking-[0.15em] text-text-faint">
              {service.number}
            </span>

            <h1
              className={`mb-8 text-[clamp(48px,7vw,88px)] leading-[1.1] tracking-tight ${
                locale === 'ar' ? 'font-bold' : 'font-normal'
              }`}
            >
              {localise(service.title, locale)}
            </h1>

            <p className="max-w-2xl text-[18px] text-text-muted" style={{ lineHeight: isRTL ? '1.8' : '1.7' }}>
              {localise(service.description, locale)}
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="border-t border-white/[.06] py-10">
        <div className="mx-auto max-w-content px-5 lg:px-10">
          <FadeUp>
            <div className="flex flex-wrap gap-2">
              {toolList.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-white/[.1] px-4 py-1.5 font-mono text-[12px] text-text-muted transition-colors duration-300 hover:border-white/[.2] hover:text-text"
                >
                  {tool.trim()}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-content px-5 lg:px-10">
          <div>
            {service.subServices.map((sub, i) => (
              <FadeUp key={i} delay={0.06 * i}>
                <div className="flex items-start gap-8 border-t border-white/[.06] py-8 lg:gap-12">
                  <span className="w-6 flex-shrink-0 pt-1.5 font-mono text-[11px] tracking-[0.1em] text-text-faint">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="flex-1 text-[20px] font-medium text-text" style={{ lineHeight: isRTL ? '1.8' : '1.7' }}>
                    {localise(sub, locale)}
                  </p>
                </div>
              </FadeUp>
            ))}
            <div className="border-t border-white/[.06]" />
          </div>
        </div>
      </section>

      <CtaSection />
    </section>
  )
}
