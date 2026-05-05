import { useEffect, useState } from 'react'
import { weddingData } from '../data/weddingData'

export default function LoadingScreen() {
  const [done, setDone] = useState(false)
  const [hide, setHide] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setDone(true), 1800)
    const t2 = setTimeout(() => setHide(true), 2400)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  if (hide) return null

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-gradient-to-br from-maroon via-maroon-deep to-maroon transition-opacity duration-700 ${
        done ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-hidden={done}
    >
      <div className="text-center px-6">
        <p className="font-display text-champagne-light/90 text-sm tracking-[0.4em] uppercase mb-4 animate-pulse">
          With love
        </p>
        <h1 className="font-display text-4xl sm:text-5xl text-ivory italic mb-2">
          {weddingData.couple.groomName} &amp; {weddingData.couple.brideName}
        </h1>
        <div className="mx-auto mt-8 h-0.5 w-24 bg-gradient-to-r from-transparent via-champagne to-transparent rounded-full overflow-hidden">
          <div
            className="h-full w-1/3 bg-champagne-light rounded-full animate-[shimmer_1.2s_ease-in-out_infinite]"
            style={{ animation: 'loadBar 1.5s ease-in-out infinite' }}
          />
        </div>
      </div>
      <style>{`
        @keyframes loadBar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  )
}
