import {
  Heart,
  Sun,
  Palette,
  Music,
  Flower2,
  Wine,
  MapPin,
} from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { weddingData } from '../data/weddingData'

const iconMap = { Heart, Sun, Palette, Music, Flower2, Wine }

function EventCard({ ev }) {
  const [ref, visible] = useScrollReveal()
  const Icon = iconMap[ev.icon] || Heart

  return (
    <article
      ref={ref}
      className={`group glass-card rounded-3xl p-6 sm:p-8 border border-white/70 hover:border-champagne/40 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-maroon/10 to-blush-soft flex items-center justify-center text-maroon group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-7 h-7" />
        </div>
        <span className="text-xs uppercase tracking-wider text-champagne font-medium">{ev.date}</span>
      </div>
      <h3 className="font-display text-2xl sm:text-3xl text-maroon mb-2">{ev.name}</h3>
      <p className="text-sm text-maroon/60 mb-4 flex items-center gap-2">
        <span className="font-medium text-maroon/80">{ev.time}</span>
      </p>
      <p className="text-sm text-maroon/75 flex items-start gap-2 mb-4 leading-relaxed">
        <MapPin className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
        {ev.venue}
      </p>
      <p className="text-sm text-maroon/65 leading-relaxed mb-6">{ev.desc}</p>
      <a
        href="#venue"
        className="inline-flex items-center justify-center w-full rounded-full border border-maroon/20 bg-white/50 py-2.5 text-sm font-medium text-maroon hover:bg-maroon hover:text-ivory hover:border-maroon transition-colors"
      >
        View Location
      </a>
    </article>
  )
}

export default function Events() {
  return (
    <section id="events" className="py-20 sm:py-28 px-4 bg-gradient-to-b from-ivory via-beige/50 to-ivory">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 sm:mb-20">
          <p className="text-champagne uppercase tracking-[0.3em] text-sm mb-3">Celebrations</p>
          <h2 className="font-display text-4xl sm:text-5xl text-maroon italic mb-4">Moments we’ll cherish together</h2>
          <p className="text-maroon/65 max-w-2xl mx-auto text-balance">
            From haldi hues to sangeet sparkle — each event is woven with warmth. We can’t wait to celebrate with you.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {weddingData.events.map((ev) => (
            <EventCard key={ev.name} ev={ev} />
          ))}
        </div>
      </div>
    </section>
  )
}
