'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { useLocale } from '@/lib/i18n/context'
import { contentRevealTransition } from '@/lib/motion'
import { ShubakLogo } from '@/components/ui/ShubakLogo'

export function HeroContent() {
  const { dict } = useLocale()
  const prefersReducedMotion = useReducedMotion()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 32, filter: 'blur(12px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: contentRevealTransition,
    },
  }

  return (
    <motion.div
      className="flex h-full w-full flex-col items-center justify-center gap-5 px-6 py-8 text-center md:px-10 lg:px-14"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Logo + Brand name */}
      <motion.div variants={itemVariants} className="flex flex-col items-center gap-4" aria-label={dict.site.brand}>
        <ShubakLogo className="w-[clamp(56px,10vw,88px)] text-white" aria-hidden="true" />
        <h1 className="text-[clamp(1.75rem,4vw,3.25rem)] font-black tracking-tighter text-white mt-3 mb-1">{dict.site.brand}</h1>
      </motion.div>

      {/* Description */}
      <motion.p
        variants={itemVariants}
        className="mx-auto max-w-lg text-[15px] leading-relaxed text-white/60 md:text-[17px]"
      >
        {dict.hero.description}
      </motion.p>

      {/* CTAs */}
      <motion.div variants={itemVariants} className="mt-2 flex flex-wrap justify-center gap-4">
        <motion.div whileTap={prefersReducedMotion ? {} : { scale: 0.985 }}>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-white to-white/92 px-8 py-3 text-sm font-medium uppercase tracking-[0.14em] text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_1px_3px_rgba(0,0,0,0.3)] transition-[transform,box-shadow,background-color] duration-300 ease-[var(--ease-out-expo)] hover:scale-[1.02] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_16px_rgba(255,255,255,0.15)] focus-visible:scale-[1.02]"
          >
            {dict.hero.ctaPrimary}
          </Link>
        </motion.div>
        <motion.div whileTap={prefersReducedMotion ? {} : { scale: 0.985 }}>
          <Link
            href="/#services"
            className="inline-flex items-center justify-center rounded-full border border-white/[0.16] bg-white/[0.07] px-8 py-3 text-sm font-medium uppercase tracking-[0.14em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm transition-[transform,border-color,background-color] duration-300 ease-[var(--ease-out-expo)] hover:scale-[1.02] hover:border-white/[0.28] hover:bg-white/[0.12] focus-visible:scale-[1.02]"
          >
            {dict.hero.ctaSecondary}
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
