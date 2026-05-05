import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { weddingData } from '../data/weddingData'

export default function FAQ() {
  const [ref, visible] = useScrollReveal()
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" className="py-20 sm:py-28 px-4 bg-gradient-to-b from-ivory to-beige">
      <div
        ref={ref}
        className={`max-w-2xl mx-auto transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="text-center mb-12">
          <p className="text-champagne uppercase tracking-[0.3em] text-sm mb-3">FAQ</p>
          <h2 className="font-display text-4xl sm:text-5xl text-maroon italic">Questions, gently answered</h2>
        </div>

        <div className="space-y-3">
          {weddingData.faq.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={i}
                className="rounded-2xl border border-maroon/10 bg-white/50 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  type="button"
                  id={`faq-btn-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 font-medium text-maroon hover:bg-beige/50 transition-colors"
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-champagne shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 pt-0 text-sm text-maroon/75 leading-relaxed border-t border-maroon/5">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
