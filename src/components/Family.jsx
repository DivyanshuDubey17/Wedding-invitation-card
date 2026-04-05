import { useScrollReveal } from '../hooks/useScrollReveal'

const brideSide = ['Mr. & Mrs. Rajesh Sharma', 'With love from the Sharma & Kapoor families']
const groomSide = ['Mr. & Mrs. Vikram Verma', 'With blessings from the Verma & Agarwal families']

export default function Family() {
  const [ref, visible] = useScrollReveal()

  return (
    <section id="family" className="py-20 sm:py-28 px-4 bg-gradient-to-b from-ivory to-beige relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne/40 to-transparent" />
      <div
        ref={ref}
        className={`max-w-4xl mx-auto text-center transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <p className="text-champagne uppercase tracking-[0.35em] text-sm mb-4">Families</p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-maroon italic mb-12 leading-tight">
          With blessings from our families
        </h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="glass-card rounded-3xl p-8 sm:p-10 border border-white/70">
            <p className="text-xs uppercase tracking-[0.25em] text-blush mb-4">Bride&apos;s family</p>
            <p className="font-display text-2xl sm:text-3xl text-maroon mb-4">{brideSide[0]}</p>
            <p className="text-maroon/65 text-sm leading-relaxed">{brideSide[1]}</p>
          </div>
          <div className="glass-card rounded-3xl p-8 sm:p-10 border border-white/70">
            <p className="text-xs uppercase tracking-[0.25em] text-champagne mb-4">Groom&apos;s family</p>
            <p className="font-display text-2xl sm:text-3xl text-maroon mb-4">{groomSide[0]}</p>
            <p className="text-maroon/65 text-sm leading-relaxed">{groomSide[1]}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
