'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLocale } from '@/lib/i18n/context'
import { contentRevealTransition } from '@/lib/motion'
import { ShubakLogo } from '@/components/ui/ShubakLogo'

export function HeroContent() {
  const { dict } = useLocale()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.14,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: contentRevealTransition,
    },
  }

  return (
    <motion.div
      className="flex h-full w-full flex-col items-center justify-center gap-6 px-6 py-8 text-center md:px-10 lg:px-14"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex items-center justify-center" aria-label={dict.site.brand}>
        <ShubakLogo className="w-[clamp(56px,10vw,88px)] text-white" aria-hidden="true" />
      </motion.div>

      <motion.p
        variants={itemVariants}
        className="mx-auto max-w-2xl text-[17px] leading-relaxed text-white/60 md:text-xl"
      >
        {dict.hero.description}
      </motion.p>

      <motion.div variants={itemVariants} className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-white to-white/92 px-8 py-3 text-sm font-medium uppercase tracking-[0.14em] text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_1px_3px_rgba(0,0,0,0.3)] transition-[transform,box-shadow,background-color] duration-300 ease-[var(--ease-out-expo)] hover:scale-[1.01] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_16px_rgba(255,255,255,0.15)] focus-visible:scale-[1.01]"
        >
          {dict.hero.ctaPrimary}
        </Link>
        <Link
          href="/#services"
          className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-3 text-sm font-medium uppercase tracking-[0.14em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm transition-[transform,border-color,background-color] duration-300 ease-[var(--ease-out-expo)] hover:scale-[1.01] hover:border-white/22 hover:bg-white/10 focus-visible:scale-[1.01]"
        >
          {dict.hero.ctaSecondary}
        </Link>
      </motion.div>
    </motion.div>
  )
}
