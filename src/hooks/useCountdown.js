import { useEffect, useState } from 'react'
import { weddingData } from '../data/weddingData'

const WEDDING = new Date(weddingData.wedding.countdownISO)

function pad(n) {
  return String(n).padStart(2, '0')
}

export function useCountdown(targetDate = WEDDING) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  const diff = Math.max(0, targetDate.getTime() - now)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return { days, hours, minutes, seconds, pad, isPast: diff === 0 }
}
