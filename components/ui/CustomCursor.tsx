'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { springMicro } from '@/lib/physics'
import { useMediaQuery } from '@/hooks/useMediaQuery'

type CursorState = 'default' | 'interactive' | 'text'

export function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>('default')
  const hasFinePointer = useMediaQuery('(pointer: fine)')

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const smoothX = useSpring(cursorX, springMicro)
  const smoothY = useSpring(cursorY, springMicro)

  useEffect(() => {
    if (!hasFinePointer) return

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleHoverState = (e: Event) => {
      const target = e.target as HTMLElement | null
      if (target?.closest('input, textarea')) {
        setCursorState('text')
      } else if (target?.closest('a, button, select, label')) {
        setCursorState('interactive')
      } else {
        setCursorState('default')
      }
    }

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseover', handleHoverState)
    document.body.style.cursor = 'none'

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseover', handleHoverState)
      document.body.style.cursor = 'auto'
    }
  }, [cursorX, cursorY, hasFinePointer])

  if (!hasFinePointer) return null

  const isOverInteractive = cursorState === 'interactive' || cursorState === 'text'
  const isText = cursorState === 'text'

  return (
    <>
      {/* Lens ring — 60px circle, brightness magnifier, hides over interactive elements */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[200]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isOverInteractive ? 0 : 1,
          scale: isOverInteractive ? 0.6 : 1,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'brightness(1.15)',
            WebkitBackdropFilter: 'brightness(1.15)',
          }}
        />
      </motion.div>

      {/* Inner dot — instant position. Scales up over interactive elements; becomes I-beam over text inputs */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[201] bg-white"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={
          isText
            ? { width: 1.5, height: 14, borderRadius: 0, scale: 1 }
            : isOverInteractive
              ? { width: 5, height: 5, borderRadius: 9999, scale: 2 }
              : { width: 5, height: 5, borderRadius: 9999, scale: 1 }
        }
        transition={{ duration: 0.15, ease: 'easeOut' }}
      />
    </>
  )
}
