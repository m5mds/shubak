export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] px-6">
      <div className="w-full max-w-sm rounded-[12px] border border-white/[0.06] bg-[#111118]">
        <div className="flex h-[22px] items-center gap-1.5 border-b border-white/[0.06] px-3">
          <div className="h-[6px] w-[6px] animate-pulse rounded-full bg-white/20" />
          <div className="h-[6px] w-[6px] animate-pulse rounded-full bg-white/20" style={{ animationDelay: '120ms' }} />
          <div className="h-[6px] w-[6px] animate-pulse rounded-full bg-white/20" style={{ animationDelay: '240ms' }} />
        </div>
        <div className="flex flex-col items-center gap-5 px-8 py-12 text-center">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-white/30 animate-pulse" />
            <div className="h-1.5 w-1.5 rounded-full bg-white/30 animate-pulse" style={{ animationDelay: '150ms' }} />
            <div className="h-1.5 w-1.5 rounded-full bg-white/30 animate-pulse" style={{ animationDelay: '300ms' }} />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/25">Loading</span>
        </div>
      </div>
    </div>
  )
}
