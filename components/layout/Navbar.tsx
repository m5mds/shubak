'use client'

import Link from 'next/link'
import { ShubakLogo } from '@/components/ui/ShubakLogo'
import { useLocale } from '@/lib/i18n/context'

function NavSeparator() {
  return (
    <span
      aria-hidden="true"
      className="h-5 w-px shrink-0 bg-white/10"
    />
  )
}

export function Navbar() {
  const { locale, setLocale, dict } = useLocale()

  return (
    <header
      className="fixed top-6 left-1/2 z-[100] -translate-x-1/2"
      style={{ width: 'max-content', maxWidth: 'calc(100vw - 32px)' }}
    >
      <nav
        className="flex items-center gap-4 rounded-full border border-white/[0.08] px-4 py-2"
        style={{
          background: 'rgba(15, 17, 21, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        {/* Logo — links to home */}
        <Link
          href="/"
          aria-label={dict.site.brand}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-white/70 transition-colors hover:text-white"
        >
          <ShubakLogo className="h-4 w-4" aria-hidden="true" />
        </Link>

        <NavSeparator />

        {/* Nav links — pure text, no decorative icons */}
        <Link
          href="/#about"
          className="flex min-h-[44px] items-center text-[14px] font-medium text-[#a0a0a0] transition-colors hover:text-white"
        >
          <span className="hidden md:inline">{dict.nav.about}</span>
        </Link>

        <Link
          href="/work"
          className="flex min-h-[44px] items-center text-[14px] font-medium text-[#a0a0a0] transition-colors hover:text-white"
        >
          <span className="hidden md:inline">{dict.nav.work}</span>
        </Link>

        <Link
          href="/#services"
          className="flex min-h-[44px] items-center text-[14px] font-medium text-[#a0a0a0] transition-colors hover:text-white"
        >
          <span className="hidden md:inline">{dict.nav.services}</span>
        </Link>

        <Link
          href="/contact"
          className="flex min-h-[44px] items-center text-[14px] font-medium text-[#a0a0a0] transition-colors hover:text-white"
        >
          <span className="hidden md:inline">{dict.nav.contact}</span>
        </Link>

        <NavSeparator />

        {/* Language toggle */}
        <button
          type="button"
          onClick={() => setLocale(locale === 'ar' ? 'en' : 'ar')}
          className="min-h-[44px] min-w-[44px] text-[14px] font-medium text-[#a0a0a0] transition-colors hover:text-white"
        >
          {locale === 'ar' ? 'EN' : 'AR'}
        </button>
      </nav>
    </header>
  )
}
