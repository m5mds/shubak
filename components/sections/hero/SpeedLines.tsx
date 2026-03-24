'use client'

import React from 'react'

export function SpeedLines() {
  const lines = [
    { top: '15%', height: '1.5px', opacity: 0.2, id: 0 },
    { top: '28%', height: '2px', opacity: 0.4, id: 1 },
    { top: '42%', height: '1px', opacity: 0.15, id: 2 },
    { top: '56%', height: '2.5px', opacity: 0.35, id: 3 },
    { top: '68%', height: '1.5px', opacity: 0.25, id: 4 },
    { top: '75%', height: '3px', opacity: 0.45, id: 5 },
    { top: '88%', height: '1px', opacity: 0.2, id: 6 },
    { top: '95%', height: '2px', opacity: 0.3, id: 7 },
  ]

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden pointer-events-none">
      {lines.map((line) => (
        <div
          key={line.id}
          className="speed-line absolute w-full"
          style={{
            insetInlineStart: 0,
            top: line.top,
            height: line.height,
            backgroundColor: 'currentColor',
            opacity: line.opacity,
            transform: 'scaleX(0)',
            transformOrigin: 'center',
          }}
        />
      ))}
    </div>
  )
}
