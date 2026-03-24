import type { Transition } from 'framer-motion'

export const revealEase = [0.16, 1, 0.3, 1] as const

export const revealViewport = {
  once: true,
  amount: 0.2,
  margin: '0px 0px -12% 0px',
} as const

export const contentRevealTransition = {
  duration: 0.9,
  ease: revealEase,
} satisfies Transition

export const surfaceRevealTransition = {
  duration: 1.05,
  ease: revealEase,
} satisfies Transition

export const sectionRevealStates = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
  },
} as const

export const surfaceRevealStates = {
  hidden: {
    opacity: 0,
    y: 32,
    scale: 0.985,
    filter: 'blur(14px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
  },
} as const
