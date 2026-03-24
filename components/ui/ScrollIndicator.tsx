"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useLocale } from '@/lib/i18n/context'

export function ScrollIndicator() {
  const { dir } = useLocale()

  return (
    <div className="flex flex-col items-center gap-3 text-white/50 text-xs font-mono tracking-widest uppercase">
      {/* 20px WindowFrame replica */}
      <div className="relative flex h-8 w-5 justify-center rounded-[4px] border border-white/[0.06] bg-[#111118] p-[2px]">
        {/* Top bar representation */}
        <div
          className="absolute top-0 flex h-[8px] items-center gap-[1px] border-b border-white/[0.06] px-[2px]"
          style={{
            insetInlineStart: 0,
            insetInlineEnd: 0,
            justifyContent: dir === 'rtl' ? 'flex-end' : 'flex-start',
          }}
        >
          <div className="h-[1.5px] w-[1.5px] rounded-full bg-white/40" />
          <div className="h-[1.5px] w-[1.5px] rounded-full bg-white/40" />
          <div className="h-[1.5px] w-[1.5px] rounded-full bg-white/40" />
        </div>
        
        {/* Arrow that animates down */}
        <motion.div 
          className="flex flex-col items-center mt-2.5"
          animate={{
            y: [0, 6, 0],
            opacity: [1, 0.5, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-[1.5px] h-2.5 bg-white/60 rounded-full" />
          <div className="w-1.5 h-1.5 border-r-[1.5px] border-b-[1.5px] border-white/60 rotate-45 -mt-[3px]" />
        </motion.div>
      </div>
    </div>
  )
}
