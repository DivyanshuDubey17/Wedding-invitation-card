import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/couple', label: 'Couple' },
  { to: '/events', label: 'Events' },
  { to: '/schedule', label: 'Schedule' },
  { to: '/venue', label: 'Venue' },
  { to: '/rsvp', label: 'RSVP' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/family', label: 'Family' },
  { to: '/dress-code', label: 'Dress Code' },
  { to: '/gifts', label: 'Gifts' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

export default function DashboardNav() {
  return (
    <header className="sticky top-0 z-[120] bg-ivory/90 backdrop-blur-md border-b border-beige-warm/80">
      <nav className="max-w-7xl mx-auto px-3 sm:px-4 py-3">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-maroon text-ivory'
                    : 'bg-white/70 text-maroon border border-maroon/10 hover:border-champagne/40'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}
