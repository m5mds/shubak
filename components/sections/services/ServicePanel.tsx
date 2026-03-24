"use client"

import type { CSSProperties, FocusEvent, PointerEvent } from 'react'
import Link from 'next/link'
import { WindowFrame } from '@/components/ui/WindowFrame'
import { useLocale } from '@/lib/i18n/context'
import { cn } from '@/lib/utils'

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
        'flex h-[70vh] w-[85vw] max-w-4xl flex-shrink-0 items-center justify-center p-4 transition-[transform,opacity] duration-500 ease-[var(--ease-out-expo)]',
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
        <WindowFrame className="h-full w-full border-white/[0.08] bg-[#0e1016]/90 shadow-[var(--service-shadow)] transition-[transform,border-color,box-shadow] duration-500 ease-[var(--ease-out-expo)] group-hover/service:-translate-y-1 group-hover/service:border-white/[0.18] group-focus-visible/service:-translate-y-1 group-focus-visible/service:border-white/[0.18] group-focus-visible/service:shadow-[0_34px_80px_rgba(0,0,0,0.42)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-[var(--ease-out-expo)] group-hover/service:opacity-100 group-focus-visible/service:opacity-100"
            style={{
              background:
                'radial-gradient(var(--service-spotlight-size) circle at var(--spotlight-x) var(--spotlight-y), rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.08) 16%, rgba(255,255,255,0) 56%)',
            }}
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-6 bottom-6 top-6 rounded-[10px] border border-white/[0.04] opacity-0 transition-opacity duration-500 ease-[var(--ease-out-expo)] group-hover/service:opacity-100 group-focus-visible/service:opacity-100"
          />

          <div className="flex h-full flex-col justify-between p-8 md:p-12">
            <div className="flex items-start justify-between gap-6">
              <span className="select-none font-mono text-4xl text-white/25 transition-[color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover/service:-translate-y-1 group-hover/service:text-white/42 group-focus-visible/service:-translate-y-1 group-focus-visible/service:text-white/42 md:text-6xl">
                {service.id}
              </span>
              <p className="max-w-md text-sm leading-relaxed text-white/45 transition-colors duration-500 ease-[var(--ease-out-expo)] group-hover/service:text-white/58 group-focus-visible/service:text-white/58">
                {service.description}
              </p>
            </div>

            <div className="mt-auto space-y-8 pt-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h3 className="text-3xl font-medium tracking-tight text-white !leading-tight transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/service:-translate-y-1 group-focus-visible/service:-translate-y-1 md:text-5xl">
                  {service.title}
                </h3>
                <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/35 transition-[color,transform,opacity] duration-500 ease-[var(--ease-out-expo)] group-hover/service:translate-x-1 group-hover/service:text-white/62 group-focus-visible/service:translate-x-1 group-focus-visible/service:text-white/62">
                  {dict.services.cardAction}
                  <span aria-hidden="true">-&gt;</span>
                </span>
              </div>

              <div className="space-y-6 border-t border-white/10 pt-8 transition-colors duration-500 ease-[var(--ease-out-expo)] group-hover/service:border-white/18 group-focus-visible/service:border-white/18">
                <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {service.subs.map((sub, i) => (
                    <li
                      key={i}
                      className="flex items-center text-white/62 transition-[transform,color] duration-500 ease-[var(--ease-out-expo)] group-hover/service:translate-x-1 group-hover/service:text-white/78 group-focus-visible/service:translate-x-1 group-focus-visible/service:text-white/78"
                    >
                      <span className="me-3 h-[2px] w-4 rounded-full bg-white/20 transition-colors duration-500 ease-[var(--ease-out-expo)] group-hover/service:bg-white/45 group-focus-visible/service:bg-white/45" />
                      <span className="text-sm md:text-base">{sub}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {service.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-white/45 transition-colors duration-500 ease-[var(--ease-out-expo)] group-hover/service:border-white/18 group-hover/service:text-white/62 group-focus-visible/service:border-white/18 group-focus-visible/service:text-white/62"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </WindowFrame>
      </Link>
    </div>
  )
}
