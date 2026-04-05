import { useScrollReveal } from '../hooks/useScrollReveal'

const styles = [
  {
    event: 'Haldi & Mehendi',
    tip: 'Bright florals, breathable cottons, and colours that celebrate joy. Yellows, greens, and pinks photograph beautifully.',
    swatches: ['#F4D03F', '#2ECC71', '#E8B4B8', '#FDF8F3'],
  },
  {
    event: 'Sangeet',
    tip: 'Glamorous Indian wear — sequins, silks, and statement jewellery. Think festive, twirl-ready, and dance-floor ready.',
    swatches: ['#5C1A1B', '#C9A962', '#1a1a2e', '#E8D5A3'],
  },
  {
    event: 'Wedding Ceremony',
    tip: 'Traditional attire appreciated. Guests often choose maroon, ivory, gold, or jewel tones. Please avoid all-white or all-red ensembles.',
    swatches: ['#5C1A1B', '#FDF8F3', '#C9A962', '#6B2D5C'],
  },
  {
    event: 'Reception',
    tip: 'Black-tie optional meets Indian elegance — bandhgalas, anarkalis, gowns, or sharp suits. Shine a little; it’s a party.',
    swatches: ['#0f0f0f', '#C9A962', '#E8B4B8', '#F0E6DC'],
  },
]

export default function DressCode() {
  const [ref, visible] = useScrollReveal()

  return (
    <section id="dress-code" className="py-20 sm:py-28 px-4 bg-maroon text-ivory">
      <div
        ref={ref}
        className={`max-w-5xl mx-auto transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center mb-14">
          <p className="text-champagne-light uppercase tracking-[0.3em] text-sm mb-3">Dress code</p>
          <h2 className="font-display text-4xl sm:text-5xl italic">Dress like the celebration you are</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {styles.map((s) => (
            <div
              key={s.event}
              className="rounded-3xl border border-white/15 bg-white/5 backdrop-blur-md p-6 sm:p-8 hover:bg-white/10 transition-colors"
            >
              <h3 className="font-display text-2xl text-champagne-light mb-3">{s.event}</h3>
              <p className="text-ivory/75 text-sm leading-relaxed mb-6">{s.tip}</p>
              <div className="flex flex-wrap gap-3">
                {s.swatches.map((c) => (
                  <span
                    key={c}
                    className="w-12 h-12 rounded-full border-2 border-white/30 shadow-inner shrink-0"
                    style={{ backgroundColor: c }}
                    title={c}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
