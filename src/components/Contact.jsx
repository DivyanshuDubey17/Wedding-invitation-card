import { Phone, User } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { weddingData } from '../data/weddingData'

export default function Contact() {
  const [ref, visible] = useScrollReveal()

  return (
    <section id="contact" className="py-20 sm:py-28 px-4 bg-maroon text-ivory">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center mb-12">
          <p className="text-champagne-light uppercase tracking-[0.3em] text-sm mb-3">We’re here for you</p>
          <h2 className="font-display text-4xl sm:text-5xl italic">Contact &amp; help</h2>
          <p className="text-ivory/65 mt-4 max-w-lg mx-auto text-sm">
            Lost on the way? Dietary concern? Can&apos;t find your table? Call — we&apos;d rather hear from you than
            worry.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {weddingData.contacts.map((c) => (
            <a
              key={c.phone}
              href={`tel:${c.phone.replace(/\s/g, '')}`}
              className="group rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-6 hover:bg-white/10 hover:border-champagne/40 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-champagne/20 flex items-center justify-center text-champagne-light mb-4 group-hover:scale-110 transition-transform">
                <User className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl text-ivory mb-1">{c.name}</h3>
              <p className="text-xs uppercase tracking-wider text-ivory/50 mb-4">{c.role}</p>
              <span className="inline-flex items-center gap-2 text-champagne-light font-medium">
                <Phone className="w-4 h-4" />
                {c.phone}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
