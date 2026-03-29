"use client"

import type { CSSProperties, FocusEvent, PointerEvent } from 'react'
import Link from 'next/link'
import { WindowFrame } from '@/components/ui/WindowFrame'
import { useLocale } from '@/lib/i18n/context'
import { cn } from '@/lib/utils'

// macOS-style traffic-light dots for service card title bars
function MacosDots() {
  return (
    <div className="flex items-center gap-1.5">
      <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
      <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
      <div className="h-3 w-3 rounded-full bg-[#28c840]" />
    </div>
  )
}

function ServiceAnimation({ slug }: { slug: string }) {
  if (slug === 'web-mobile') {
    return (
      <div aria-hidden="true" className="pointer-events-none" style={{ animation: 'svc-float 4s ease-in-out infinite' }}>
        <svg width="22" height="36" viewBox="0 0 22 36" fill="none" opacity="0.25">
          <rect x="1" y="1" width="20" height="34" rx="3" stroke="currentColor" strokeWidth="1.5" />
          <line x1="8" y1="31" x2="14" y2="31" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="7" y1="6" x2="15" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    )
  }
  if (slug === 'ai-solutions') {
    return (
      <div aria-hidden="true" className="pointer-events-none relative h-9 w-9">
        <div className="absolute inset-0 rounded-full border border-white/20" style={{ animation: 'svc-pulse-ring 2s ease-out infinite' }} />
        <div className="absolute inset-0 rounded-full border border-white/15" style={{ animation: 'svc-pulse-ring 2s ease-out infinite 0.7s' }} />
        <div className="absolute inset-[30%] rounded-full bg-white/20" />
      </div>
    )
  }
  if (slug === 'automation-devops') {
    return (
      <div aria-hidden="true" className="pointer-events-none" style={{ animation: 'svc-rotate 8s linear infinite' }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" opacity="0.22">
          <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="1.5" />
          <path d="M16 4v4M16 24v4M4 16h4M24 16h4M7.03 7.03l2.83 2.83M22.14 22.14l2.83 2.83M7.03 24.97l2.83-2.83M22.14 9.86l2.83-2.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    )
  }
  if (slug === 'ui-ux-design') {
    return (
      <div aria-hidden="true" className="pointer-events-none" style={{ animation: 'svc-cursor 3.5s ease-in-out infinite' }}>
        <svg width="20" height="24" viewBox="0 0 20 24" fill="none" opacity="0.25">
          <path d="M3 2L17 10L10 12L7 19L3 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </div>
    )
  }
  return null
}

interface ServicePanelProps {
  service: {
    id: string
    slug: string
    title: string
    description: string
    subs: string[]
    tools: string[]
  }
  className?: string
  isActive?: boolean
  hasActiveSibling?: boolean
  onActivate?: () => void
  onDeactivate?: () => void
}

export function ServicePanel({
  service,
  className,
  isActive = false,
  hasActiveSibling = false,
  onActivate,
  onDeactivate,
}: ServicePanelProps) {
  const { dict } = useLocale()
  const isMuted = hasActiveSibling && !isActive

  const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType === 'touch') {
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100

    event.currentTarget.style.setProperty('--spotlight-x', `${x}%`)
    event.currentTarget.style.setProperty('--spotlight-y', `${y}%`)
  }

  const handleFocus = (_event: FocusEvent<HTMLAnchorElement>) => {
    onActivate?.()
  }

  const handleBlur = (_event: FocusEvent<HTMLAnchorElement>) => {
    onDeactivate?.()
  }

  return (
    <div
      className={cn(
        'flex h-[70vh] w-[400px] min-w-[380px] flex-shrink-0 items-center justify-center p-4 transition-[transform,opacity] duration-500 ease-[var(--ease-out-expo)]',
        isMuted && 'scale-[0.985] opacity-60',
        className
      )}
    >
      <Link
        href={`/services/${service.slug}`}
        aria-label={`${dict.services.cardAction}: ${service.title}`}
        className="group/service block h-full w-full"
        style={
          {
            '--spotlight-x': '50%',
            '--spotlight-y': '32%',
          } as CSSProperties
        }
        onFocus={handleFocus}
        onBlur={handleBlur}
        onPointerEnter={onActivate}
        onPointerLeave={onDeactivate}
        onPointerMove={handlePointerMove}
      >
        <WindowFrame
          hideTitleBar
          className="relative h-full w-full border-white/[0.08] bg-[#0e1016]/90 shadow-[var(--service-shadow)] transition-[transform,border-color,box-shadow] duration-500 ease-[var(--ease-out-expo)] group-hover/service:-translate-y-1 group-hover/service:border-white/[0.18] group-focus-visible/service:-translate-y-1 group-focus-visible/service:border-white/[0.18] group-focus-visible/service:shadow-[0_34px_80px_rgba(0,0,0,0.42)]"
        >
          {/* Spotlight radial gradient on hover */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 ease-[var(--ease-out-expo)] group-hover/service:opacity-100 group-focus-visible/service:opacity-100"
            style={{
              background:
                'radial-gradient(var(--service-spotlight-size) circle at var(--spotlight-x) var(--spotlight-y), rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.08) 16%, rgba(255,255,255,0) 56%)',
            }}
          />

          {/* Number watermark — faint ghost, z-0, never affects layout */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-3 start-4 z-0 select-none text-8xl font-bold leading-none"
            style={{ color: 'rgba(255,255,255,0.015)' }}
          >
            {service.id}
          </span>

          <div className="relative z-10 flex h-full flex-col">

            {/* Area 1 — macOS title bar, dots always at inline-start */}
            <div className="flex h-10 shrink-0 items-center justify-start border-b border-white/10 bg-white/[0.02] px-4">
              <MacosDots />
            </div>

            {/* Area 2 — Visual canvas: fixed 160px, icon centered, overflow-hidden clips the slide-up overlay */}
            <div className="relative h-[160px] shrink-0 overflow-hidden border-b border-white/5">
              {/* Centered icon */}
              <div className="flex h-full items-center justify-center">
                <ServiceAnimation slug={service.slug} />
              </div>

              {/* Tech stack overlay — absolute inset-0 so it covers ONLY this 160px canvas area */}
              <div
                aria-hidden="true"
                className="absolute inset-0 z-10 hidden flex-wrap content-center items-center justify-center gap-2 bg-[#0e1016]/92 p-4 opacity-0 backdrop-blur-md transition-[opacity,transform] duration-300 ease-out translate-y-3 [@media(hover:hover)]:flex group-hover/service:opacity-100 group-hover/service:translate-y-0 group-focus-visible/service:opacity-100 group-focus-visible/service:translate-y-0"
              >
                {service.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-white/15 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-white/65"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Area 3 — Content: title + description only */}
            <div className="relative z-10 flex flex-1 flex-col gap-4 p-8">
              <h3 className="text-xl font-bold leading-snug tracking-tight text-white">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/45 transition-colors duration-500 ease-[var(--ease-out-expo)] group-hover/service:text-white/60 group-focus-visible/service:text-white/60">
                {service.description}
              </p>
            </div>

          </div>
        </WindowFrame>
      </Link>
    </div>
  )
}
