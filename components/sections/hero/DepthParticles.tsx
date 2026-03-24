'use client'

import React from 'react'

export function DepthParticles() {
  const particles = [
    { left: '12%', top: '24%', size: '20px', hasDot: true, id: 0 },
    { left: '80%', top: '15%', size: '45px', hasDot: false, id: 1 },
    { left: '45%', top: '60%', size: '15px', hasDot: true, id: 2 },
    { left: '70%', top: '80%', size: '55px', hasDot: false, id: 3 },
    { left: '25%', top: '75%', size: '30px', hasDot: true, id: 4 },
    { left: '85%', top: '45%', size: '25px', hasDot: false, id: 5 },
    { left: '30%', top: '10%', size: '40px', hasDot: true, id: 6 },
    { left: '60%', top: '25%', size: '10px', hasDot: false, id: 7 },
    { left: '15%', top: '85%', size: '50px', hasDot: true, id: 8 },
    { left: '90%', top: '90%', size: '22px', hasDot: false, id: 9 },
    { left: '50%', top: '40%', size: '35px', hasDot: true, id: 10 },
    { left: '5%', top: '50%', size: '18px', hasDot: false, id: 11 },
  ]

  return (
    <div className="absolute inset-0 h-full w-full preserve-3d pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="depth-particle absolute border border-white/20 bg-white/5 backdrop-blur-sm shadow-glass"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            transform: 'translateZ(200px) scale(0)',
          }}
        >
          {particle.hasDot ? (
            <div className="absolute top-1 flex gap-1" style={{ insetInlineStart: '0.25rem' }}>
              <div className="h-1 w-1 rounded-full bg-white/40" />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  )
}
