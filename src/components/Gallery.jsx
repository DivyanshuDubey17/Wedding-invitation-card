import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { weddingData } from '../data/weddingData'

export default function Gallery() {
  const [ref, visible] = useScrollReveal()
  const [active, setActive] = useState(null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setActive(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = active !== null ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [active])

  return (
    <section id="gallery" className="py-20 sm:py-28 px-4 bg-ivory">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-champagne uppercase tracking-[0.3em] text-sm mb-3">Memories</p>
          <h2 className="font-display text-4xl sm:text-5xl text-maroon italic">A glimpse of us</h2>
          <p className="text-maroon/60 mt-3 max-w-xl mx-auto text-sm">
            Placeholder frames for your pre-wedding and celebration photos — tap to preview.
          </p>
        </div>

        <div
          ref={ref}
          className={`columns-2 md:columns-3 gap-4 space-y-4 transition-all duration-700 ${
            visible ? 'opacity-100' : 'opacity-0 translate-y-8'
          }`}
        >
          {weddingData.gallery.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(img)}
              className="break-inside-avoid w-full rounded-2xl overflow-hidden border border-white/80 shadow-lg group focus:outline-none focus:ring-2 focus:ring-champagne focus:ring-offset-2"
            >
              <div
                className="relative aspect-[3/4] sm:aspect-auto sm:min-h-[200px] bg-beige-warm bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${img.src})` }}
              >
                <span className="sr-only">{img.alt}</span>
                <div className="absolute inset-0 bg-maroon/0 group-hover:bg-maroon/10 transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-maroon-deep/90 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-ivory hover:bg-white/20 transition-colors"
            aria-label="Close"
            onClick={(e) => {
              e.stopPropagation()
              setActive(null)
            }}
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={active.src}
            alt={active.alt}
            className="max-h-[90vh] max-w-full object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
