'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { springMicro } from '@/lib/physics'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export function CustomCursor() {
  const [isOverInteractive, setIsOverInteractive] = useState(false)
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
      setIsOverInteractive(Boolean(target?.closest('a, button, input, textarea, select, label')))
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

  return (
    <>
      <motion.div
        className="fixed top-0 z-[100] h-16 w-16 rounded-full pointer-events-none"
        animate={{
          opacity: isOverInteractive ? 0 : 1,
          scale: isOverInteractive ? 0.85 : 1,
        }}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          pointerEvents: 'none',
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="h-full w-full rounded-full border border-white/10 bg-white/5 backdrop-blur-[4px] shadow-[0_0_20px_rgba(255,255,255,0.1)]" />
      </motion.div>

      <motion.div
        className="fixed z-[100] h-2 w-2 rounded-full bg-white pointer-events-none mix-blend-difference"
        animate={{ scale: isOverInteractive ? 1.2 : 1 }}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          pointerEvents: 'none',
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  )
}
