"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useLocale } from "@/lib/i18n/context"
import { SectionReveal } from "@/components/motion/SectionReveal"
import { SurfaceReveal } from "@/components/motion/SurfaceReveal"
import { WindowFrame } from "@/components/ui/WindowFrame"

export function ProcessSection() {
  const { dict } = useLocale()
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
      <motion.div style={{ y: bgY }} className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]">
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

        <div className="relative mx-auto mt-16 max-w-4xl md:mt-20">
          <motion.div
            className="absolute top-0 bottom-0 w-px origin-top bg-white/[0.08]"
            style={{ insetInlineStart: '1rem', scaleY: lineScale }}
          />

          <div className="space-y-8 md:space-y-10">
            {dict.process.steps.map((step, idx) => (
              <SurfaceReveal key={idx} delay={0.08 * idx}>
                <div className="relative ps-12 md:ps-20">
                  <div
                    className="absolute top-8 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-white/[0.12] bg-[#111118] font-mono text-[11px] text-white/55"
                    style={{ insetInlineStart: '1rem' }}
                  >
                    0{idx + 1}
                  </div>

                  <WindowFrame className="p-8 md:p-10">
                    <h3 className="text-[22px] font-normal text-white md:text-[28px]">{step.title}</h3>
                    <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/60 md:text-[16px]">
                      {step.description}
                    </p>
                  </WindowFrame>
                </div>
              </SurfaceReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
