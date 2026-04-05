export default function SectionDivider({ variant = 'floral' }) {
  if (variant === 'minimal') {
    return (
      <div className="flex items-center justify-center gap-4 py-10 px-4" aria-hidden="true">
        <span className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-champagne/50" />
        <span className="text-champagne text-xl">✦</span>
        <span className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-champagne/50" />
      </div>
    )
  }

  return (
    <div className="relative py-12 px-4 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blush-soft/30 to-transparent" />
      <div className="relative flex flex-col items-center gap-3">
        <svg className="w-40 h-8 text-champagne/40" viewBox="0 0 200 40" fill="currentColor">
          <path d="M20 20 Q50 5 100 20 T180 20" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="100" cy="20" r="3" className="text-blush" fill="currentColor" />
        </svg>
        <div className="flex items-center gap-3 text-champagne/70">
          <span className="text-2xl leading-none">🌸</span>
          <span className="font-display text-lg tracking-[0.35em] uppercase">—</span>
          <span className="text-2xl leading-none">🌸</span>
        </div>
      </div>
    </div>
  )
}
