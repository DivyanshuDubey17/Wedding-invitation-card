import { Instagram, Share2 } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Hashtag() {
  const [ref, visible] = useScrollReveal()
  const tag = '#AaravWedsSiya'

  return (
    <section id="hashtag" className="py-16 sm:py-20 px-4 bg-ivory relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,169,98,0.12)_0%,_transparent_65%)]" />
      <div
        ref={ref}
        className={`max-w-2xl mx-auto text-center relative z-10 transition-all duration-700 ${
          visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <Share2 className="w-10 h-10 text-champagne mx-auto mb-4 opacity-80" />
        <p className="text-maroon/60 text-sm uppercase tracking-[0.25em] mb-3">Share the joy</p>
        <h2 className="font-display text-3xl sm:text-4xl text-maroon italic mb-2">Our wedding hashtag</h2>
        <p
          className="font-display text-2xl sm:text-3xl text-champagne tracking-wide mb-6 select-all cursor-text"
          onClick={() => navigator.clipboard?.writeText(tag)}
        >
          {tag}
        </p>
        <p className="text-maroon/70 text-sm leading-relaxed mb-6">
          Tag your photos, reels, and stories — we&apos;re collecting every smile, thumka, and happy tear to relive for
          years to come.
        </p>
        <a
          href={`https://www.instagram.com/explore/tags/${tag.replace('#', '')}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border-2 border-maroon/20 px-6 py-2.5 text-maroon text-sm font-medium hover:bg-maroon hover:text-ivory hover:border-maroon transition-colors"
        >
          <Instagram className="w-5 h-5" />
          See posts on Instagram
        </a>
      </div>
    </section>
  )
}
