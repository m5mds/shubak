'use client'

import { useLocale } from '@/lib/i18n/context'
import { SectionReveal } from '@/components/motion/SectionReveal'
import { SurfaceReveal } from '@/components/motion/SurfaceReveal'

export default function AboutSection() {
  const { dict } = useLocale()
  const points = dict.about.points.slice(0, 4)

  return (
    <section
      id="about"
      className="homepage-section homepage-section--about relative overflow-hidden bg-[#0a0a0f]"
      style={{ paddingTop: 'clamp(80px, 10vh, 120px)', paddingBottom: 'clamp(80px, 10vh, 120px)' }}
    >
      <div className="relative z-10 mx-auto max-w-4xl px-5 lg:px-12">
        <SectionReveal>
          <span className="mb-4 block font-mono text-sm uppercase tracking-[0.25em] text-white/50">
            {dict.about.sectionTag}
          </span>
          <h2 className="mb-12 text-[clamp(28px,3.5vw,44px)] font-medium tracking-tight text-white">
            {dict.about.sectionHeading}
          </h2>
        </SectionReveal>

        <SurfaceReveal>
          {/* 2×2 window layout — thick metallic frame with dark panes creates the "Shubak" window illusion */}
          <div
            className="spotlight-grid rounded-[24px] p-4"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              background: '#2a2d35',
            }}
          >
            {points.map((point, i) => (
              <div
                key={i}
                className="spotlight-pane rounded-[10px]"
                style={{
                  background: '#0a0a0f',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.04)',
                  padding: 'clamp(24px, 3vw, 40px)',
                  transition: 'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                <p
                  aria-hidden="true"
                  className="font-mono"
                  style={{
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    color: 'rgba(255,255,255,0.22)',
                    marginBottom: '16px',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 style={{ fontSize: '17px', fontWeight: 500, color: '#ededed', marginBottom: '10px', lineHeight: 1.4 }}>
                  {point.title}
                </h3>
                <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'rgba(237, 237, 237, 0.52)' }}>
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </SurfaceReveal>
      </div>
    </section>
  )
}
