'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useLocale } from '@/lib/i18n/context'
import { SectionReveal } from '@/components/motion/SectionReveal'
import { SurfaceReveal } from '@/components/motion/SurfaceReveal'
import { WindowFrame } from './ui/WindowFrame'

function Word({ children, progress, range }: { children: string; progress: any; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <span className="mb-2 me-2 md:me-3 lg:me-4">{children}</span>
  }

  return (
    <span className="relative mb-2 me-2 inline-block md:me-3 lg:me-4">
      <span className="absolute opacity-[0.15]">{children}</span>
      <motion.span style={{ opacity }} className="text-white">
        {children}
      </motion.span>
    </span>
  )
}

export default function AboutSection() {
  const { dict } = useLocale()
  const containerRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 767px)')
  const isSmallMobile = useMediaQuery('(max-width: 479px)')

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.7', 'center 0.4'],
  })
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.35],
    ['inset(52% 52% 52% 52% round 12px)', 'inset(0% 0% 0% 0% round 12px)']
  )
  const ghostY = useTransform(scrollYProgress, [0, 1], ['-1%', isSmallMobile ? '0%' : isMobile ? '1.5%' : '3%'])

  const words = dict.about.statement.split(' ')

  return (
    <section
      id="about"
      ref={containerRef}
      className="homepage-section homepage-section--about relative overflow-hidden bg-[#0a0a0f]"
      style={{ paddingTop: 'clamp(80px, 12vh, 140px)', paddingBottom: 'clamp(80px, 12vh, 140px)' }}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-16 hidden rounded-[12px] border border-white/[0.04] lg:block"
        style={{
          top: 'clamp(72px, 10vh, 120px)',
          insetInline: '6%',
          y: prefersReducedMotion ? '0%' : ghostY,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-12">
        <SectionReveal className="max-w-4xl">
          <span className="mb-4 block font-mono text-sm uppercase tracking-[0.25em] text-white/50">
            {dict.about.sectionTag}
          </span>
          <h2 className="mb-12 text-[clamp(36px,4.5vw,56px)] font-medium tracking-tight text-white md:mb-16">
            {dict.about.sectionHeading}
          </h2>
        </SectionReveal>

        <SurfaceReveal className="mb-24 max-w-[1200px] md:mb-32">
          <div className="relative overflow-hidden rounded-[20px] border border-white/[0.06] bg-white/[0.02] px-6 py-8 md:px-10 md:py-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 60% 55% at 16% 12%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 42%, transparent 78%)',
              }}
            />
            <motion.div
              className="relative z-10"
              style={{ clipPath: prefersReducedMotion ? 'inset(0% 0% 0% 0% round 12px)' : clipPath }}
            >
              <h3 className="flex flex-wrap text-[clamp(24px,3vw,40px)] font-normal leading-[1.3] tracking-tight">
                {words.map((word: string, i: number) => {
                  const start = i / words.length
                  const end = start + 1 / words.length
                  return (
                  <Word key={i} progress={scrollYProgress} range={[start, end]}>
                    {word}
                  </Word>
                  )
                })}
              </h3>
            </motion.div>
          </div>
        </SurfaceReveal>

        <motion.div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
            {dict.about.points.map((point, i) => (
              <SurfaceReveal key={i} delay={0.1 * i}>
                <WindowFrame variant="minimal" className="h-full p-8 md:p-10">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">0{i + 1}</div>
                  <h3 className="mt-8 text-[20px] font-normal text-white md:text-[24px]">{point.title}</h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-white/60">{point.description}</p>
                </WindowFrame>
              </SurfaceReveal>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
