import { Sparkles, Calendar, ChevronDown } from 'lucide-react'
import { useCountdown } from '../hooks/useCountdown'
import { weddingData } from '../data/weddingData'

export default function Hero() {
  const { days, hours, minutes, seconds, pad, isPast } = useCountdown()

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-16"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-blush-soft/40 via-ivory to-beige" />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, rgba(232,180,184,0.4) 0%, transparent 45%),
            radial-gradient(circle at 80% 20%, rgba(201,169,98,0.2) 0%, transparent 40%),
            radial-gradient(circle at 50% 80%, rgba(92,26,27,0.08) 0%, transparent 50%)`,
        }}
      />
      <div className="absolute top-24 left-[8%] w-24 h-24 rounded-full bg-champagne/15 blur-2xl animate-float" />
      <div className="absolute bottom-32 right-[10%] w-32 h-32 rounded-full bg-blush/25 blur-3xl animate-float-delayed" />
      <div className="absolute top-1/3 right-[15%] text-6xl opacity-20 animate-float select-none" aria-hidden>
        🌺
      </div>
      <div className="absolute bottom-1/4 left-[12%] text-5xl opacity-15 animate-float-delayed select-none" aria-hidden>
        ✿
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <p className="font-display text-champagne tracking-[0.35em] uppercase text-sm sm:text-base mb-6 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-champagne" />
          The wedding of
          <Sparkles className="w-4 h-4 text-champagne" />
        </p>

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-maroon leading-[1.05] mb-4">
          <span className="block italic text-balance">{weddingData.couple.groomName}</span>
          <span className="block text-3xl sm:text-4xl md:text-5xl my-2 text-champagne font-normal tracking-widest">
            &amp;
          </span>
          <span className="block italic text-balance">{weddingData.couple.brideName}</span>
        </h1>

        <p className="font-display text-xl sm:text-2xl md:text-3xl text-maroon/75 italic max-w-2xl mx-auto text-balance mb-8">
          {weddingData.wedding.tagline} — celebrating love, family, and tradition in {weddingData.wedding.city}.
        </p>

        <div className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2.5 text-maroon mb-10">
          <Calendar className="w-5 h-5 text-champagne shrink-0" />
          <span className="font-medium tracking-wide">{weddingData.wedding.dateLabel}</span>
        </div>

        {/* Countdown */}
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-maroon/50 mb-4">Counting down to our forever</p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {[
              { label: 'Days', value: days },
              { label: 'Hours', value: pad(hours) },
              { label: 'Minutes', value: pad(minutes) },
              { label: 'Seconds', value: pad(seconds) },
            ].map((u) => (
              <div
                key={u.label}
                className="glass-card rounded-2xl px-4 py-3 sm:px-5 sm:py-4 min-w-[72px] sm:min-w-[88px] border border-white/60"
              >
                <div className="font-display text-2xl sm:text-3xl text-maroon tabular-nums">
                  {isPast && u.label === 'Days' ? '♥' : u.value}
                </div>
                <div className="text-[10px] sm:text-xs uppercase tracking-wider text-maroon/50 mt-1">{u.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#events"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-maroon text-ivory px-8 py-3.5 font-medium tracking-wide shadow-maroon hover:bg-maroon-deep hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            View Events
          </a>
          <a
            href="#rsvp"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border-2 border-champagne text-maroon bg-white/30 backdrop-blur-sm px-8 py-3.5 font-medium tracking-wide hover:bg-champagne/10 hover:border-champagne-light transition-all"
          >
            RSVP Now
          </a>
        </div>
      </div>

      <a
        href="#couple"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-maroon/40 hover:text-champagne transition-colors animate-bounce"
        aria-label="Scroll to couple section"
      >
        <span className="text-xs uppercase tracking-widest">Discover</span>
        <ChevronDown className="w-6 h-6" />
      </a>
    </section>
  )
}
