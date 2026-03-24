'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLocale } from '@/lib/i18n/context'
import { WindowIcon } from '@/components/window-icon'
import { MobileMenu } from './MobileMenu'

export function Navbar() {
  const { locale, setLocale, dict } = useLocale()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    let ticking = false

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'border-b border-white/[0.06] bg-[#0a0a0f]/80 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8 lg:px-12">
          <Link href="/" className="inline-flex items-center gap-3 text-white transition-colors hover:text-white/80">
            <WindowIcon size={20} />
            <span className="text-[15px] font-medium tracking-[0.2em] uppercase">{dict.nav.brand}</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/#services"
              className="text-[13px] uppercase tracking-[0.04em] text-white/65 transition-colors hover:text-white"
            >
              {dict.nav.services}
            </Link>
            <Link
              href="/#about"
              className="text-[13px] uppercase tracking-[0.04em] text-white/65 transition-colors hover:text-white"
            >
              {dict.nav.about}
            </Link>
          </div>

          <div className="hidden items-center gap-4 md:flex md:gap-6">
            <button
              type="button"
              onClick={() => setLocale(locale === 'ar' ? 'en' : 'ar')}
              className="text-[11px] uppercase tracking-[0.14em] text-white/70 transition-colors hover:text-white"
            >
              {locale === 'ar' ? 'EN' : 'AR'}
            </button>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/[0.12] px-5 py-2.5 text-[11px] uppercase tracking-[0.14em] text-white transition-colors hover:border-white/[0.24] hover:bg-white hover:text-black"
            >
              {dict.nav.startProject}
            </Link>
          </div>

          <button
            type="button"
            aria-label={dict.nav.openMenu}
            onClick={() => setMenuOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.1] text-white transition-colors hover:border-white/[0.2] md:hidden"
          >
            <span className="flex flex-col gap-1">
              <span className="h-px w-4 bg-current" />
              <span className="h-px w-4 bg-current" />
              <span className="h-px w-4 bg-current" />
            </span>
          </button>
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
