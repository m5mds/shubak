'use client'

import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { revealViewport, surfaceRevealStates, surfaceRevealTransition } from '@/lib/motion'

interface SurfaceRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function SurfaceReveal({ children, className, delay = 0 }: SurfaceRevealProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }
  return (
    <motion.div
      className={className}
      initial={surfaceRevealStates.hidden}
      whileInView={surfaceRevealStates.visible}
      viewport={revealViewport}
      transition={{ ...surfaceRevealTransition, delay }}
    >
      {children}
    </motion.div>
  )
}
