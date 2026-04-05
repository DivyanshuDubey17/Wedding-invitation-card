import { useScrollReveal } from '../hooks/useScrollReveal'
import { Quote } from 'lucide-react'

export default function CoupleIntro() {
  const [refA, visA] = useScrollReveal()
  const [refB, visB] = useScrollReveal()

  return (
    <section id="couple" className="relative py-20 sm:py-28 px-4 bg-gradient-to-b from-beige to-ivory">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-champagne uppercase tracking-[0.3em] text-sm mb-3">Meet the couple</p>
          <h2 className="font-display text-4xl sm:text-5xl text-maroon italic">A match written in the stars</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
          <article
            ref={refA}
            className={`glass-card rounded-3xl p-8 text-center transition-all duration-700 ${
              visA ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative mx-auto w-40 h-40 sm:w-48 sm:h-48 mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blush to-champagne-light opacity-40 animate-pulse" />
              <div
                className="relative w-full h-full rounded-full border-4 border-white shadow-lg overflow-hidden bg-beige-warm"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                role="img"
                aria-label="Bride portrait placeholder"
              />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-maroon text-ivory text-xs uppercase tracking-wider px-4 py-1 rounded-full">
                Bride
              </div>
            </div>
            <h3 className="font-display text-3xl text-maroon mb-2">Siya</h3>
            <p className="text-maroon/70 leading-relaxed text-sm sm:text-base">
              Believes in chai, poetry, and slow Sundays. Finds joy in little rituals and big dreams — and in Aarav&apos;s
              terrible puns that still make her laugh.
            </p>
          </article>

          <article
            ref={refB}
            className={`glass-card rounded-3xl p-8 text-center transition-all duration-700 delay-150 ${
              visB ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative mx-auto w-40 h-40 sm:w-48 sm:h-48 mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-champagne-light to-blush-soft opacity-50" />
              <div
                className="relative w-full h-full rounded-full border-4 border-white shadow-lg overflow-hidden bg-beige-warm"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                role="img"
                aria-label="Groom portrait placeholder"
              />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-maroon text-ivory text-xs uppercase tracking-wider px-4 py-1 rounded-full">
                Groom
              </div>
            </div>
            <h3 className="font-display text-3xl text-maroon mb-2">Aarav</h3>
            <p className="text-maroon/70 leading-relaxed text-sm sm:text-base">
              A Lucknow boy with a passport full of stamps and a heart full of home. Known for surprise flowers,
              dependable hugs, and never letting Siya win at board games — except when it matters.
            </p>
          </article>
        </div>

        <div
          className="mt-14 max-w-2xl mx-auto glass-card rounded-2xl px-8 py-6 flex gap-4 items-start border-l-4 border-champagne"
        >
          <Quote className="w-10 h-10 text-blush shrink-0 mt-1" />
          <p className="font-display text-lg sm:text-xl italic text-maroon/85 leading-relaxed">
            &ldquo;We didn&apos;t know we were looking for each other until we found us — and every day since has felt
            like coming home.&rdquo;
          </p>
        </div>
      </div>
    </section>
  )
}
