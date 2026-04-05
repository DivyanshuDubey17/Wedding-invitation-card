import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const faqs = [
  {
    q: 'What is the dress code?',
    a: 'Festive Indian wear for most events — see our Dress Code section for colour guidance. For the reception, formal or cocktail Indian attire is perfect.',
  },
  {
    q: 'Is parking available?',
    a: 'Yes — complimentary parking is arranged at Heritage Lawns and Imperial Banquets. Valet will be available at select venues; signage will guide you on arrival.',
  },
  {
    q: 'Are kids invited?',
    a: 'We love your little ones! Children are welcome to the haldi, mehendi, and wedding ceremony. The sangeet and reception are adults-only after 9 PM for a relaxed evening.',
  },
  {
    q: 'What time should I arrive?',
    a: 'Please aim to arrive 20–30 minutes before the ceremony start time on the itinerary. It helps us begin on auspicious time and seat everyone comfortably.',
  },
  {
    q: 'Is accommodation available?',
    a: 'We have a small block at partner hotels in Gomti Nagar — details and booking codes will be shared via WhatsApp with confirmed guests. Early booking is recommended.',
  },
  {
    q: 'Who should I contact for help?',
    a: 'Reach out to our wedding coordinators listed in the Contact section for directions, dietary needs, or last-minute changes. We’re here to help.',
  },
]

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
          {faqs.map((item, i) => {
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
