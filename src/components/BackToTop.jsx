import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!show) return null

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-[90] p-3 rounded-full bg-champagne text-maroon shadow-xl border border-white/40 hover:bg-champagne-light hover:scale-110 transition-all"
      aria-label="Back to top"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  )
}
