'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log to error reporting service in production
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] px-6 py-24">
      <div className="w-full max-w-xl rounded-[12px] border border-white/[0.06] bg-[#111118] text-center">
        <div className="flex h-[22px] items-center gap-1.5 border-b border-white/[0.06] px-3">
          <div className="h-[6px] w-[6px] rounded-full bg-white/18" />
          <div className="h-[6px] w-[6px] rounded-full bg-white/18" />
          <div className="h-[6px] w-[6px] rounded-full bg-white/18" />
        </div>

        <div className="px-8 py-12 md:px-12 md:py-14">
          <div className="mb-6 text-[clamp(64px,14vw,140px)] font-serif leading-none text-white/12 select-none">
            Error
          </div>

          <p className="mx-auto mb-10 max-w-sm text-[15px] leading-relaxed text-white/45">
            Something interrupted this window. Try again and we’ll reload the page state.
          </p>

          <button
            onClick={reset}
            className="group inline-flex items-center gap-3 rounded-full border border-white/10 px-6 py-2.5 text-[11px] uppercase tracking-[0.15em] text-white/50 transition-all duration-500 hover:border-white/25 hover:text-white"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="transition-transform duration-700 group-hover:rotate-[-360deg]"
            >
              <path
                d="M1 7a6 6 0 1 1 1.5 3.9"
                stroke="currentColor"
                strokeLinecap="round"
                fill="none"
              />
              <path d="M1 12V8h4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            <span>Try again</span>
          </button>
        </div>
      </div>
    </div>
  )
}
