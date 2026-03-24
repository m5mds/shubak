'use client'

import Link from 'next/link'
import { useLocale } from '@/lib/i18n/context'
import { WindowFrame } from '@/components/ui/WindowFrame'

export default function NotFound() {
  const { dict } = useLocale()

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] px-6 py-24">
      <div className="w-full max-w-xl">
        <WindowFrame className="p-10 md:p-12">
          <div className="text-center">
            <div className="mb-6 text-[clamp(80px,18vw,160px)] font-serif leading-none text-white/15">
              {dict.notFound.code}
            </div>
            <p className="mb-4 text-[24px] text-white">{dict.notFound.title}</p>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-white/12 px-6 py-3 text-[11px] uppercase tracking-[0.15em] text-white/60 transition-colors hover:border-white/25 hover:text-white"
            >
              {dict.notFound.backHome}
            </Link>
          </div>
        </WindowFrame>
      </div>
    </div>
  )
}
