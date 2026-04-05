import { useRef, useState, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

/** Replace with your own royalty-free track in /public/wedding-ambient.mp3 */
const AUDIO_SRC = '/wedding-ambient.mp3'

export default function MusicToggle() {
  const audioRef = useRef(null)
  const [on, setOn] = useState(false)
  const [canPlay, setCanPlay] = useState(true)

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    a.volume = 0.25
    if (on) {
      const p = a.play()
      if (p !== undefined) {
        p.catch(() => {
          setCanPlay(false)
          setOn(false)
        })
      }
    } else {
      a.pause()
    }
  }, [on])

  return (
    <>
      <audio ref={audioRef} src={AUDIO_SRC} loop preload="none" />
      <button
        type="button"
        onClick={() => {
          setCanPlay(true)
          setOn((v) => !v)
        }}
        className={`fixed bottom-6 left-6 z-[90] flex items-center gap-2 rounded-full px-4 py-3 shadow-xl border transition-all duration-300 ${
          on
            ? 'bg-maroon text-ivory border-champagne/40 scale-105'
            : 'glass-card text-maroon border-white/60 hover:border-champagne/50'
        }`}
        aria-pressed={on}
        aria-label={on ? 'Mute wedding ambience' : 'Play wedding ambience'}
        title={canPlay ? 'Toggle soft background music' : 'Add wedding-ambient.mp3 to the public folder to enable audio'}
      >
        {on ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        <span className="text-sm font-medium hidden sm:inline">{on ? 'Music on' : 'Music'}</span>
      </button>
    </>
  )
}
