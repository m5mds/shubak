"use client"

import React, { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { PageLoadSequence } from './hero/PageLoadSequence'
import { HeroContent } from './hero/HeroContent'
import { HeroWindowFrame } from './hero/HeroWindowFrame'
import { ScrollIndicator } from '@/components/ui/ScrollIndicator'

export function HeroZpush() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroSceneRef = useRef<HTMLDivElement>(null)
  const [loadComplete, setLoadComplete] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.shubakHeroReady = 'false'

    return () => {
      delete document.documentElement.dataset.shubakHeroReady
    }
  }, [])

  useGSAP(() => {
    if (!loadComplete) return

    const setupScrollExit = ({ y, blur = 0 }: { y: number; blur?: number }) => {
      if (!containerRef.current || !heroSceneRef.current) {
        return
      }

      const applyProgress = (progress: number) => {
        const clampedProgress = Math.max(0, Math.min(1, progress))

        gsap.set(heroSceneRef.current, {
          opacity: 1 - clampedProgress,
          y: y * clampedProgress,
          filter: blur > 0 ? `blur(${(blur * clampedProgress).toFixed(3)}px)` : 'none',
          overwrite: 'auto',
        })
      }

      applyProgress(0)

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          applyProgress(self.progress)
        },
        onRefresh: (self) => {
          applyProgress(self.progress)
        },
        onLeaveBack: () => {
          applyProgress(0)
        },
      })
    }

    const signalHeroReady = () => {
      document.documentElement.dataset.shubakHeroReady = 'true'
      window.dispatchEvent(new Event('shubak:hero-ready'))
    }

    if (!containerRef.current || !heroSceneRef.current) {
      return
    }

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      gsap.fromTo(
        heroSceneRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
      )
      signalHeroReady()
      return
    }

    if (isMobile) {
      gsap.fromTo(
        heroSceneRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          onComplete: () => {
            setupScrollExit({ y: -40 })
            signalHeroReady()
          },
        }
      )
      return
    }

    gsap.fromTo(
      heroSceneRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        onComplete: () => {
          setupScrollExit({ y: -60, blur: 4 })
          signalHeroReady()
        },
      }
    )
  }, { scope: containerRef, dependencies: [loadComplete], revertOnUpdate: true })

  return (
    <>
      <PageLoadSequence onComplete={() => setLoadComplete(true)} />

      <section
        ref={containerRef}
        className="relative flex min-h-screen w-full items-center justify-center bg-[#0a0a0f] pt-20 md:pt-24 lg:pt-28"
      >
        <div data-hero-scene="true" ref={heroSceneRef} className="flex w-full flex-col items-center justify-center px-4 md:px-6 lg:px-8">
          <HeroWindowFrame>
            <HeroContent />
          </HeroWindowFrame>

          <div className="scroll-indicator-wrapper mt-10">
            <ScrollIndicator />
          </div>
        </div>
      </section>
    </>
  )
}
