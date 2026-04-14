"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useLocale } from "@/lib/i18n/context"
import { useIsRTL } from "@/hooks/useIsRTL"
import { SectionReveal } from "@/components/motion/SectionReveal"
import { SurfaceReveal } from "@/components/motion/SurfaceReveal"
import { WindowFrame } from "@/components/ui/WindowFrame"
import { springMacro } from "@/lib/physics"

export function ProcessSection() {
  const { dict } = useLocale()
  const isRTL = useIsRTL()
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])
  const lineScale = useTransform(scrollYProgress, [0.1, 0.9], [0, 1])

  return (
    <section
      id="process"
      ref={sectionRef}
      className="homepage-section homepage-section--process relative overflow-hidden bg-[#0a0a0f]"
      style={{ paddingTop: 'clamp(80px, 12vh, 140px)', paddingBottom: 'clamp(80px, 12vh, 140px)' }}
    >
      {/* Background grid parallax */}
      <motion.div style={{ y: bgY }} className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]">
        <div
          className="absolute inset-0 h-[200%] w-full max-h-[200%]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-12">
        <SectionReveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/50 md:text-[13px]">
            {dict.process.sectionTag}
          </p>
          <h2 className="mt-6 max-w-[14ch] text-[clamp(34px,4.6vw,56px)] leading-[1.05] tracking-tight text-white">
            {dict.process.sectionHeading}
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/60 md:text-[17px]">
            {dict.process.summary}
          </p>
        </SectionReveal>

        {/* Timeline container */}
        <div className="relative mx-auto mt-16 max-w-4xl md:mt-20">
          {/* Vertical timeline line — centered on desktop */}
          <motion.div
            className="absolute top-0 bottom-0 hidden w-px origin-top md:block"
            style={{
              insetInlineStart: '50%',
              scaleY: lineScale,
              background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0.15) 80%, transparent 100%)',
            }}
          />
          {/* Vertical timeline line — start edge on mobile */}
          <motion.div
            className="absolute top-0 bottom-0 w-px origin-top md:hidden"
            style={{
              insetInlineStart: '1rem',
              scaleY: lineScale,
              background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0.15) 80%, transparent 100%)',
            }}
          />

          <div className="space-y-8 md:space-y-12">
            {dict.process.steps.map((step, idx) => {
              // Alternating sides: idx 0,2 → end side; idx 1,3 → start side
              // RTL-aware: x direction inverts based on reading direction
              const isEndSide = idx % 2 === 0
              const xOffset = isEndSide
                ? (isRTL ? -88 : 88)
                : (isRTL ? 88 : -88)

              return (
                <div key={idx} className="relative">
                  {/* ── Mobile layout: single column with start-edge timeline ── */}
                  <div className="ps-12 md:hidden">
                    <div className="absolute top-8" style={{ insetInlineStart: '1rem', transform: 'translateX(-50%)' }}>
                      <motion.div
                        className="absolute inset-0 rounded-full border border-white/20"
                        whileInView={{ scale: [1, 2], opacity: [0.5, 0] }}
                        viewport={{ once: true, amount: 0.8 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />
                      <motion.div
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.12] bg-[#111118] font-mono text-[11px] text-white/55"
                        whileInView={{ scale: [1, 1.4, 1] }}
                        viewport={{ once: true, amount: 0.8 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                      >
                        0{idx + 1}
                      </motion.div>
                    </div>
                    <SurfaceReveal delay={0.08 * idx}>
                      <WindowFrame className="p-8">
                        <h3 className="text-[20px] font-normal text-white">{step.title}</h3>
                        <p className="mt-3 text-[14px] leading-relaxed text-white/60">{step.description}</p>
                      </WindowFrame>
                    </SurfaceReveal>
                  </div>

                  {/* ── Desktop layout: alternating sides ── */}
                  <div className="hidden md:flex md:items-start">
                    {/* Center dot */}
                    <div className="absolute top-8 z-10" style={{ insetInlineStart: 'calc(50% - 1rem)' }}>
                      <motion.div
                        className="absolute inset-0 rounded-full border border-white/20"
                        whileInView={{ scale: [1, 2], opacity: [0.5, 0] }}
                        viewport={{ once: true, amount: 0.8 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />
                      <motion.div
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.12] bg-[#111118] font-mono text-[11px] text-white/55"
                        whileInView={{ scale: [1, 1.4, 1] }}
                        viewport={{ once: true, amount: 0.8 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                      >
                        0{idx + 1}
                      </motion.div>
                    </div>

                    {isEndSide ? (
                      <>
                        {/* Spacer for start side */}
                        <div className="w-1/2 pe-10" />
                        {/* Card on end side */}
                        <div className="w-1/2 ps-10">
                          <motion.div
                            className="group"
                            initial={{ opacity: 0, x: xOffset, filter: 'blur(6px)' }}
                            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05, filter: { duration: 0.5 } }}
                          >
                            <WindowFrame className="p-8 md:p-10">
                              <motion.div
                                initial={{ scale: 1.3, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ type: 'spring', ...springMacro }}
                                className="mb-4 text-[clamp(48px,6vw,72px)] font-bold leading-none text-white/[0.30] transition-colors duration-300 group-hover:text-white/[0.45]"
                              >
                                0{idx + 1}
                              </motion.div>
                              <h3 className="text-[22px] font-normal text-white md:text-[26px]">{step.title}</h3>
                              <p className="mt-4 text-[15px] leading-relaxed text-white/60">{step.description}</p>
                            </WindowFrame>
                          </motion.div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Card on start side */}
                        <div className="w-1/2 pe-10">
                          <motion.div
                            className="group"
                            initial={{ opacity: 0, x: xOffset, filter: 'blur(6px)' }}
                            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05, filter: { duration: 0.5 } }}
                          >
                            <WindowFrame className="p-8 md:p-10">
                              <motion.div
                                initial={{ scale: 1.3, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ type: 'spring', ...springMacro }}
                                className="mb-4 text-[clamp(48px,6vw,72px)] font-bold leading-none text-white/[0.30] transition-colors duration-300 group-hover:text-white/[0.45]"
                              >
                                0{idx + 1}
                              </motion.div>
                              <h3 className="text-[22px] font-normal text-white md:text-[26px]">{step.title}</h3>
                              <p className="mt-4 text-[15px] leading-relaxed text-white/60">{step.description}</p>
                            </WindowFrame>
                          </motion.div>
                        </div>
                        {/* Spacer for end side */}
                        <div className="w-1/2 ps-10" />
                      </>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
