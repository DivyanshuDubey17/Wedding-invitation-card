import { Gift, Heart } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Gifts() {
  const [ref, visible] = useScrollReveal()

  return (
    <section id="gifts" className="py-20 sm:py-28 px-4 bg-gradient-to-b from-beige to-ivory">
      <div
        ref={ref}
        className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blush-soft/80 text-maroon mb-6">
          <Heart className="w-8 h-8" />
        </div>
        <h2 className="font-display text-3xl sm:text-4xl text-maroon italic mb-6">Gifts &amp; blessings</h2>
        <p className="text-maroon/80 leading-relaxed text-lg mb-10 text-balance">
          Your presence at our wedding is the greatest gift we could ask for. If you wish to bless us further, your love
          and good wishes mean the world — and a little something for our new beginning is cherished with gratitude, never
          expected.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 text-left">
          <div className="glass-card rounded-2xl p-6 border border-white/70 flex gap-4">
            <Gift className="w-10 h-10 text-champagne shrink-0" />
            <div>
              <h3 className="font-display text-xl text-maroon mb-2">Registry (optional)</h3>
              <p className="text-sm text-maroon/65 mb-3">
                We&apos;re setting up a small registry for those who&apos;d like a gentle nudge — link to be shared via
                family.
              </p>
              <span className="text-xs uppercase tracking-wider text-champagne">Placeholder: yourregistry.com/aarav-siya</span>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6 border border-white/70 flex gap-4">
            <Gift className="w-10 h-10 text-blush shrink-0" />
            <div>
              <h3 className="font-display text-xl text-maroon mb-2">Blessing envelope</h3>
              <p className="text-sm text-maroon/65">
                Traditional shagun envelopes will be gratefully received at the reception desk — no fuss, all heart.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
