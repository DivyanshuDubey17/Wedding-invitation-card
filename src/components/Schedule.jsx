import { Clock } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { weddingData } from '../data/weddingData'

function DayColumn({ title, subtitle, slots }) {
  const [ref, visible] = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`glass-card rounded-3xl p-6 sm:p-8 border border-white/70 transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-champagne/20">
        <div className="w-12 h-12 rounded-xl bg-maroon/10 flex items-center justify-center text-maroon">
          <Clock className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-display text-2xl text-maroon">{title}</h3>
          <p className="text-xs text-maroon/50 uppercase tracking-wider">{subtitle}</p>
        </div>
      </div>
      <ul className="space-y-0">
        {slots.map((s, i) => (
          <li key={i} className="relative pl-6 pb-6 last:pb-0 border-l-2 border-champagne/30 last:border-l-transparent">
            <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-champagne border-2 border-ivory" />
            <p className="font-display text-lg text-maroon">{s.time}</p>
            <p className="font-medium text-maroon/85">{s.title}</p>
            <p className="text-sm text-maroon/55">{s.note}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Schedule() {
  return (
    <section id="schedule" className="py-20 sm:py-28 px-4 bg-maroon text-ivory relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,#E8B4B8,transparent_50%)]" />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <p className="text-champagne-light uppercase tracking-[0.3em] text-sm mb-3">Itinerary</p>
          <h2 className="font-display text-4xl sm:text-5xl italic text-ivory">Your guide to the festivities</h2>
          <p className="text-ivory/70 mt-4 max-w-xl mx-auto text-sm sm:text-base">
            Timings may shift slightly — please stay close to the coordinators on the day. When in doubt, arrive a little
            early; we’d rather greet you with a smile than rush you in.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <DayColumn
            title={weddingData.schedule.day1Title}
            subtitle={weddingData.schedule.day1Subtitle}
            slots={weddingData.schedule.day1}
          />
          <DayColumn
            title={weddingData.schedule.day2Title}
            subtitle={weddingData.schedule.day2Subtitle}
            slots={weddingData.schedule.day2}
          />
        </div>
      </div>
    </section>
  )
}
