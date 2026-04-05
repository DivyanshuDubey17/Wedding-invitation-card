import { MapPin, Navigation, Train, Car } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const venues = [
  {
    name: 'Heritage Lawns — Wedding Ceremony',
    address: 'Plot 42, Amar Shaheed Path, Near SGPGI, Lucknow, Uttar Pradesh 226014',
    mapQuery: 'Heritage+Lawns+Lucknow',
  },
  {
    name: 'Imperial Banquets — Reception',
    address: '4th Floor, Janpath Market, Hazratganj, Lucknow, Uttar Pradesh 226001',
    mapQuery: 'Imperial+Banquets+Hazratganj+Lucknow',
  },
  {
    name: 'Renaissance Lucknow — Sangeet',
    address: 'Vipin Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010',
    mapQuery: 'Renaissance+Hotel+Lucknow',
  },
]

function VenueCard({ v }) {
  const [ref, visible] = useScrollReveal()
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${v.mapQuery}`

  return (
    <article
      ref={ref}
      className={`glass-card rounded-2xl p-6 border border-white/60 bg-white/50 transition-all duration-600 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="flex items-start gap-3 mb-3">
        <MapPin className="w-6 h-6 text-champagne shrink-0 mt-0.5" />
        <div>
          <h3 className="font-display text-xl text-maroon">{v.name}</h3>
          <p className="text-sm text-maroon/70 mt-2 leading-relaxed">{v.address}</p>
        </div>
      </div>
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-maroon text-ivory px-5 py-2.5 text-sm font-medium hover:bg-maroon-deep transition-colors"
      >
        <Navigation className="w-4 h-4" />
        Open in Google Maps
      </a>
    </article>
  )
}

export default function Venue() {
  return (
    <section id="venue" className="py-20 sm:py-28 px-4 bg-gradient-to-b from-beige to-ivory">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-champagne uppercase tracking-[0.3em] text-sm mb-3">Venue &amp; directions</p>
          <h2 className="font-display text-4xl sm:text-5xl text-maroon italic">Find us in Lucknow</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {venues.map((v) => (
            <VenueCard key={v.name} v={v} />
          ))}
        </div>

        <div className="glass-card rounded-3xl overflow-hidden border border-white/70 mb-10">
          <div className="aspect-[21/9] min-h-[200px] bg-gradient-to-br from-beige-warm via-blush-soft/40 to-champagne-light/30 flex items-center justify-center relative">
            <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=60')] bg-cover bg-center" />
            <p className="relative z-10 font-display text-2xl text-maroon/50 italic">Map preview</p>
          </div>
          <div className="p-6 bg-white/40">
            <p className="text-sm text-maroon/75 leading-relaxed">
              <span className="font-semibold text-maroon">Embedded map:</span> Replace this block with a Google Maps
              embed iframe for your exact venue pin — copy the embed code from Google Maps → Share → Embed map.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-champagne/25 bg-white/40 p-6">
            <div className="flex items-center gap-2 text-maroon font-display text-xl mb-3">
              <Car className="w-6 h-6 text-champagne" />
              By road
            </div>
            <p className="text-sm text-maroon/70 leading-relaxed">
              Uber and local cabs are readily available. From Chaudhary Charan Singh International Airport, allow
              approximately 45–60 minutes to central Lucknow venues depending on traffic. Valet assistance will be
              available at select locations — details shared closer to the date.
            </p>
          </div>
          <div className="rounded-2xl border border-champagne/25 bg-white/40 p-6">
            <div className="flex items-center gap-2 text-maroon font-display text-xl mb-3">
              <Train className="w-6 h-6 text-champagne" />
              By rail
            </div>
            <p className="text-sm text-maroon/70 leading-relaxed">
              Lucknow Junction and Charbagh are the main railway hubs. Pre-book transfers where possible; our team can
              suggest trusted drivers — see the contact section for coordinator numbers.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
