import { Heart } from 'lucide-react'
import { weddingData } from '../data/weddingData'

export default function Footer() {
  return (
    <footer className="relative py-14 px-4 bg-maroon-deep text-ivory overflow-hidden">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_0%,#5C1A1B,transparent_60%)]" />
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-4">
          <Heart className="w-8 h-8 text-blush fill-blush/30" />
        </div>
        <p className="font-display text-3xl sm:text-4xl italic text-ivory mb-2">
          {weddingData.couple.groomName} &amp; {weddingData.couple.brideName}
        </p>
        <p className="text-champagne-light/90 text-sm tracking-widest uppercase mb-6">
          {weddingData.wedding.dateLabel} · {weddingData.wedding.city}
        </p>
        <p className="text-ivory/75 text-sm leading-relaxed mb-8">
          From the bottom of our hearts — thank you for being part of our story. We can’t wait to hug you, feed you, and
          dance with you.
        </p>
        <p className="text-ivory/45 text-xs tracking-[0.2em] uppercase">
          Made with love · {weddingData.couple.groomName} &amp; {weddingData.couple.brideName}
        </p>
      </div>
    </footer>
  )
}
