'use client'

import React from 'react'
import { WindowFrame } from '@/components/ui/WindowFrame'

interface HeroWindowFrameProps {
  children: React.ReactNode
}

export function HeroWindowFrame({ children }: HeroWindowFrameProps) {
  return (
    <WindowFrame className="relative mx-auto w-full max-w-[min(88vw,1200px)] aspect-[4/5] sm:aspect-[4/3] md:aspect-[16/10] lg:aspect-[16/9] bg-[#111118]/95">
      <div className="h-full w-full">
        {children}
      </div>
    </WindowFrame>
  )
}
