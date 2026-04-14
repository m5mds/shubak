"use client"

import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { gsap } from '@/lib/gsap'
import { useLocale } from '@/lib/i18n/context'

interface PageLoadSequenceProps {
  onComplete: () => void
}

const emptySubscribe = () => () => {}

// Module-level cache so sessionStorage is only read once per JS session
let _hasVisitedCache: boolean | null = null

function getHasVisited(): boolean {
  if (_hasVisitedCache !== null) return _hasVisitedCache
  try {
    _hasVisitedCache = sessionStorage.getItem('shubak_visited') === 'true'
  } catch {
    _hasVisitedCache = false
  }
  return _hasVisitedCache
}

function markVisited(): void {
  _hasVisitedCache = true
  try {
    sessionStorage.setItem('shubak_visited', 'true')
  } catch {
    // sessionStorage unavailable — silently skip persistence
  }
}

export function PageLoadSequence({ onComplete }: PageLoadSequenceProps) {
  const { dir } = useLocale()
  const [show, setShow] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const borderRef = useRef<SVGRectElement>(null)
  const dotsRef = useRef<HTMLDivElement>(null)
  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false)
  const hasVisited = isMounted && getHasVisited()

  useEffect(() => {
    if (hasVisited) {
      onComplete()
      return
    }

    if (!isMounted) return

    const tl = gsap.timeline({
      onComplete: () => {
        markVisited()
        setShow(false)
        onComplete()
      }
    })

    // Setup initial states
    const border = borderRef.current
    if (border) {
      const borderLength = border.getTotalLength()
      gsap.set(border, {
        strokeDasharray: borderLength,
        strokeDashoffset: borderLength,
      })
    }

    gsap.set(frameRef.current, {
      scale: 0.34,
      opacity: 1,
      transformOrigin: '50% 50%',
    })

    const dots = dotsRef.current?.children
    if (dots) {
      gsap.set(dots, { scale: 0, opacity: 0 })
    }

    // Animation sequence
    // 1. Expand the intro frame in the hero's real coordinate space while drawing the border.
    tl.to(frameRef.current, {
      scale: 1,
      duration: 1.45,
      ease: "power2.inOut",
    }, "+=0.15")

    tl.to(border || [], {
      strokeDashoffset: 0,
      duration: 1.45,
      ease: "power2.inOut"
    }, "<")

    // 2. Pop the dots
    if (dots) {
      tl.to(dots, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        stagger: 0.05,
        ease: "back.out(1.7)"
      }, "-=0.15")
    }

    // 3. Keep it on screen for a moment
    tl.to({}, { duration: 0.35 })

    // 4. Fade out the whole container
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.55,
      ease: "power2.inOut"
    })

    return () => {
      tl.kill()
    }
  }, [hasVisited, isMounted, onComplete])

  if (!isMounted) return null
  if (hasVisited) return null
  if (!show) return null

  return (
    <div 
      ref={containerRef}
      data-page-load-sequence="true"
      className="fixed inset-0 z-[101] bg-[#0a0a0f] text-[#f5f0e6]"
    >
      <div className="flex min-h-screen w-full items-center justify-center pt-20 md:pt-24 lg:pt-28">
        <div className="flex w-full flex-col items-center justify-center px-4 md:px-6 lg:px-8">
          <div
            ref={frameRef}
            data-page-load-frame="true"
            className="relative w-full max-w-[min(88vw,1200px)] aspect-[4/5] overflow-hidden rounded-[12px] border border-white/[0.06] bg-[#111118]/98 shadow-[0_40px_120px_rgba(0,0,0,0.55)] sm:aspect-[4/3] md:aspect-[16/9] lg:aspect-[16/9]"
          >
            {/* SVG Border drawing */}
            <svg
              className="absolute inset-0 h-full w-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <rect
                ref={borderRef}
                x="0.35"
                y="0.35"
                width="99.3"
                height="99.3"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.18"
                rx="1.1"
                ry="1.1"
                className="vector-border"
              />
            </svg>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.08),transparent_42%)]" />

            {/* Top bar with dots */}
            <div
              className="absolute top-0 flex h-[22px] items-center border-b border-white/[0.12] bg-white/[0.03] px-3"
              style={{
                insetInlineStart: 0,
                insetInlineEnd: 0,
                justifyContent: dir === 'rtl' ? 'flex-end' : 'flex-start',
              }}
            >
              <div ref={dotsRef} className="flex gap-1.5">
                <div className="h-[6px] w-[6px] rounded-full bg-white/35" />
                <div className="h-[6px] w-[6px] rounded-full bg-white/35" />
                <div className="h-[6px] w-[6px] rounded-full bg-white/35" />
              </div>
            </div>
          </div>

          <div aria-hidden="true" className="mt-10 h-8 w-5 opacity-0" />
        </div>
      </div>
    </div>
  )
}
