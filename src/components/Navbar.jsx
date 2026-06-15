import { useEffect, useState } from 'react'
import { Menu, X, Heart } from 'lucide-react'
import { useCouple } from '../hooks/useCouple'

const links = [
  { href: '#couple', label: 'Couple' },
  { href: '#events', label: 'Events' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#venue', label: 'Venue' },
  { href: '#rsvp', label: 'RSVP' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const { couple } = useCouple()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled ? 'bg-ivory/85 backdrop-blur-md shadow-maroon-xs py-2' : 'bg-transparent py-4'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        <a
          href="#hero"
          className="flex items-center gap-2 font-display text-lg sm:text-xl text-maroon tracking-wide group"
          onClick={close}
        >
          <Heart className="w-5 h-5 text-blush fill-blush-soft group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">
            {couple.groomName} <span className="text-champagne">&amp;</span> {couple.brideName}
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-1 xl:gap-2">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="px-3 py-2 text-sm text-maroon/80 hover:text-maroon rounded-full hover:bg-blush-soft/50 transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#rsvp"
            className="hidden sm:inline-flex items-center rounded-full bg-maroon text-ivory text-sm font-medium px-4 py-2 hover:bg-maroon-deep transition-colors shadow-maroon-sm"
            onClick={close}
          >
            RSVP
          </a>
          <button
            type="button"
            className="lg:hidden p-2 rounded-full border border-maroon/15 bg-white/50 text-maroon"
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-out ${
          open ? 'max-h-[480px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-6 pt-2 bg-ivory/95 backdrop-blur-lg border-t border-beige-warm/80">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="block py-3 px-4 rounded-xl text-maroon border border-transparent hover:bg-beige/80 hover:border-champagne/20 transition-colors"
                  onClick={close}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#rsvp"
                className="block mt-2 text-center rounded-full bg-maroon text-ivory py-3 font-medium"
                onClick={close}
              >
                RSVP Now
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
