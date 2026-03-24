"use client"

import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { useLocale } from '@/lib/i18n/context'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { getLocalizedServiceList } from '@/lib/services-data'
import { SectionReveal } from '@/components/motion/SectionReveal'
import { SurfaceReveal } from '@/components/motion/SurfaceReveal'
import { ServicePanel } from './ServicePanel'
import { cn } from '@/lib/utils'

export function ServicesHorizontalScroll() {
  const { dict, dir, locale } = useLocale()
  const isRTL = dir === 'rtl'
  const serviceList = getLocalizedServiceList(locale)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const shouldStack = isMobile || prefersReducedMotion
  const sectionRef = useRef<HTMLElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const panelsRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  const [scrollProgress, setScrollProgress] = useState(0)
  const [heroReady, setHeroReady] = useState(false)
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null)

  useEffect(() => {
    const markReady = () => setHeroReady(true)

    if (document.documentElement.dataset.shubakHeroReady === 'true') {
      markReady()
      return
    }

    window.addEventListener('shubak:hero-ready', markReady)

    return () => {
      window.removeEventListener('shubak:hero-ready', markReady)
    }
  }, [])

  useGSAP(() => {
    setScrollProgress(0)
    if (progressRef.current) {
      gsap.set(progressRef.current, { width: 0 })
    }

    if (!heroReady) {
      return
    }

    if (prefersReducedMotion) {
      setScrollProgress(0)
      return
    }

    if (isMobile) {
      gsap.fromTo(
        gsap.utils.toArray('.service-panel-mobile'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )
      return
    }

    if (!wrapperRef.current || !panelsRef.current) return

    gsap.set(panelsRef.current, { clearProps: 'transform' })

    const getScrollAmount = () => {
      const panelsWidth = panelsRef.current?.scrollWidth || 0
      const containerWidth = wrapperRef.current?.offsetWidth || 0
      return Math.max(0, panelsWidth - containerWidth)
    }

    const tween = gsap.to(panelsRef.current, {
      x: () => (isRTL ? getScrollAmount() : -getScrollAmount()),
      ease: 'none',
    })

    const st = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: 'top top',
      end: () => `+=${getScrollAmount() * 0.8}`,
      pin: true,
      animation: tween,
      scrub: 1.5,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        setScrollProgress(self.progress * 100)
        gsap.to(progressRef.current, {
          width: `${self.progress * 100}%`,
          duration: 0.1,
          ease: 'none',
        })
      },
    })

    // Panel depth effect — per CLAUDE.md spec
    const desktopPanels = gsap.utils.toArray<HTMLElement>('.service-panel-desktop')
    desktopPanels.forEach((panel) => {
      const panelContent = panel.firstElementChild as HTMLElement | null

      if (!panelContent) {
        return
      }

      gsap.fromTo(
        panelContent,
        { z: -80, opacity: 0.6 },
        {
          z: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tween,
            start: 'left 85%',
            end: 'left 45%',
            scrub: true,
          },
        }
      )
      gsap.to(panelContent, {
        z: -40,
        opacity: 0.7,
        ease: 'none',
        scrollTrigger: {
          trigger: panel,
          containerAnimation: tween,
          start: 'right 55%',
          end: 'right 15%',
          scrub: true,
        },
      })
    })

    const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      cancelAnimationFrame(refreshId)
      st.kill()
      tween.kill()
    }
  }, {
    scope: sectionRef,
    dependencies: [heroReady, isRTL, isMobile, prefersReducedMotion],
    revertOnUpdate: true,
  })

  const trackEdgePadding = 'max(1.25rem, calc((100vw - min(85vw, 56rem)) / 2))'

  return (
    <section
      id="services"
      ref={sectionRef}
      className="homepage-section homepage-section--services relative overflow-hidden bg-[#0a0a0f] py-24 text-white md:py-0"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-12 pt-24 md:px-8 md:pb-14 md:pt-28 lg:px-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionReveal className="max-w-3xl">
            <span className="mb-4 block font-mono text-sm uppercase tracking-[0.25em] text-white/50">
              {dict.services.sectionTag}
            </span>
            <h2 className="text-4xl font-medium tracking-tight md:text-6xl">
              {dict.services.sectionHeading}
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/58 md:text-[17px]">
              {dict.services.summary}
            </p>
          </SectionReveal>

          <div className="mt-8 hidden w-48 flex-col items-end md:flex">
            <span className="mb-2 font-mono text-xs text-white/40">{Math.round(scrollProgress)}%</span>
            <div className="relative h-px w-full overflow-hidden bg-white/10">
              <div
                ref={progressRef}
                className={cn('absolute top-0 bottom-0 h-full w-0 bg-white', isRTL ? 'end-0' : 'start-0')}
              />
            </div>
          </div>
        </div>
      </div>

      {shouldStack ? (
        <div className="relative z-10 flex flex-col gap-8 px-4">
          {serviceList.map((service, index) => (
            <SurfaceReveal key={service.id} className="service-panel-mobile" delay={0.08 * index}>
              <ServicePanel service={service} />
            </SurfaceReveal>
          ))}
        </div>
      ) : (
        <div ref={wrapperRef} className="relative z-10 hidden h-screen items-center overflow-hidden md:flex">
          <div
            ref={panelsRef}
            className="flex h-full items-center gap-8"
            style={{
              width: 'max-content',
              paddingInlineStart: trackEdgePadding,
              paddingInlineEnd: trackEdgePadding,
            }}
          >
            {serviceList.map((service) => (
              <div key={service.id} className="service-panel-desktop" style={{ perspective: '800px' }}>
                <ServicePanel
                  service={service}
                  isActive={activeServiceId === service.id}
                  hasActiveSibling={activeServiceId !== null}
                  onActivate={() => setActiveServiceId(service.id)}
                  onDeactivate={() => setActiveServiceId((current) => (current === service.id ? null : current))}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
