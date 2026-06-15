import { useRef, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useCouple } from '../hooks/useCouple'
import { getEditPin } from '../utils/editPin'
import { Quote, Settings2, Check, Lock, RotateCcw, ImagePlus } from 'lucide-react'

const EDIT_PIN = getEditPin()

function PersonEditor({ label, prefix, couple, updateCouple, setImageFromFile, onMessage }) {
  const fileRef = useRef(null)
  const nameKey = `${prefix}Name`
  const roleKey = `${prefix}Role`
  const bioKey = `${prefix}Bio`
  const imageKey = `${prefix}Image`

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const result = await setImageFromFile(imageKey, file)
    onMessage(result.ok ? { type: 'ok', text: `${label} photo updated.` } : { type: 'err', text: result.error })
    e.target.value = ''
  }

  return (
    <div className="rounded-2xl border border-maroon/10 bg-ivory/80 p-4 sm:p-5 space-y-3">
      <h4 className="font-display text-lg text-maroon italic">{label}</h4>
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div
          className="w-20 h-20 rounded-full bg-beige-warm bg-cover bg-center shrink-0 border-2 border-white shadow"
          style={{ backgroundImage: `url(${couple[imageKey]})` }}
        />
        <div className="flex-1 space-y-2 w-full min-w-0">
          <input
            type="text"
            value={couple[nameKey]}
            onChange={(e) => updateCouple({ [nameKey]: e.target.value })}
            placeholder="Name"
            className="w-full rounded-lg border border-maroon/10 px-3 py-2 text-sm text-maroon bg-white focus:outline-none focus:ring-2 focus:ring-champagne/40"
          />
          <input
            type="text"
            value={couple[roleKey]}
            onChange={(e) => updateCouple({ [roleKey]: e.target.value })}
            placeholder="Role label, e.g. Bride"
            className="w-full rounded-lg border border-maroon/10 px-3 py-2 text-sm text-maroon bg-white focus:outline-none focus:ring-2 focus:ring-champagne/40"
          />
        </div>
      </div>
      <textarea
        value={couple[bioKey]}
        onChange={(e) => updateCouple({ [bioKey]: e.target.value })}
        placeholder="Short bio"
        rows={3}
        className="w-full rounded-lg border border-maroon/10 px-3 py-2 text-sm text-maroon bg-white focus:outline-none focus:ring-2 focus:ring-champagne/40 resize-y"
      />
      <div className="flex flex-wrap gap-2">
        <input
          type="text"
          value={couple[imageKey]}
          onChange={(e) => updateCouple({ [imageKey]: e.target.value })}
          placeholder="Photo URL or /path.jpg"
          className="flex-1 min-w-[12rem] rounded-lg border border-maroon/10 px-3 py-2 text-xs text-maroon bg-white focus:outline-none focus:ring-2 focus:ring-champagne/40"
        />
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="inline-flex items-center gap-1.5 rounded-lg border border-maroon/15 bg-beige/50 px-3 py-2 text-xs text-maroon hover:bg-beige transition-colors"
        >
          <ImagePlus className="w-3.5 h-3.5" />
          Upload
        </button>
      </div>
    </div>
  )
}

function CoupleEditor({ couple, updateCouple, setImageFromFile, resetToDefaults }) {
  const [message, setMessage] = useState({ type: '', text: '' })

  const showMessage = (next) => {
    setMessage(next)
    if (next.text) window.setTimeout(() => setMessage({ type: '', text: '' }), 4000)
  }

  return (
    <div className="mb-10 rounded-3xl border border-champagne/40 bg-white/80 backdrop-blur-md p-5 sm:p-8 shadow-maroon-xs">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
        <div>
          <h3 className="font-display text-2xl text-maroon italic">Manage couple details</h3>
          <p className="text-maroon/60 text-sm mt-1 max-w-xl">
            Update names, photos, bios, and the quote. Names also update on the home page and footer. Changes save
            automatically in this browser.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Restore the original couple details from the site data?')) {
              resetToDefaults()
              showMessage({ type: 'ok', text: 'Couple details reset to defaults.' })
            }
          }}
          className="inline-flex items-center gap-2 text-sm text-maroon/70 hover:text-maroon border border-maroon/15 rounded-full px-4 py-2 hover:bg-beige/60 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset defaults
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <PersonEditor
          label="Bride"
          prefix="bride"
          couple={couple}
          updateCouple={updateCouple}
          setImageFromFile={setImageFromFile}
          onMessage={showMessage}
        />
        <PersonEditor
          label="Groom"
          prefix="groom"
          couple={couple}
          updateCouple={updateCouple}
          setImageFromFile={setImageFromFile}
          onMessage={showMessage}
        />
      </div>

      <label className="block text-sm text-maroon/70 mb-2">Couple quote</label>
      <textarea
        value={couple.quote}
        onChange={(e) => updateCouple({ quote: e.target.value })}
        rows={3}
        className="w-full rounded-xl border border-maroon/15 bg-ivory px-4 py-3 text-sm text-maroon focus:outline-none focus:ring-2 focus:ring-champagne/50 resize-y"
      />

      {message.text && (
        <p
          className={`mt-4 text-sm rounded-xl px-4 py-2 ${
            message.type === 'err' ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  )
}

export default function CoupleIntro() {
  const [refA, visA] = useScrollReveal()
  const [refB, visB] = useScrollReveal()
  const { couple, updateCouple, setImageFromFile, resetToDefaults } = useCouple()
  const [editing, setEditing] = useState(false)
  const [unlocked, setUnlocked] = useState(!EDIT_PIN)
  const [pinInput, setPinInput] = useState('')
  const [pinError, setPinError] = useState('')

  const openEditor = () => {
    if (EDIT_PIN && !unlocked) {
      setEditing(true)
      return
    }
    setEditing((v) => !v)
  }

  const submitPin = (e) => {
    e.preventDefault()
    if (pinInput === EDIT_PIN) {
      setUnlocked(true)
      setPinError('')
      setPinInput('')
    } else {
      setPinError('Incorrect PIN.')
    }
  }

  return (
    <section id="couple" className="relative py-20 sm:py-28 px-4 bg-gradient-to-b from-beige to-ivory">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-champagne uppercase tracking-[0.3em] text-sm mb-3">Meet the couple</p>
          <h2 className="font-display text-4xl sm:text-5xl text-maroon italic">A match written in the stars</h2>
          <button
            type="button"
            onClick={openEditor}
            className={`mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
              editing
                ? 'border-maroon bg-maroon text-ivory'
                : 'border-maroon/20 text-maroon/80 hover:border-champagne hover:bg-beige/60'
            }`}
          >
            {editing ? <Check className="w-4 h-4" /> : <Settings2 className="w-4 h-4" />}
            {editing ? 'Done editing' : 'Manage couple'}
          </button>
        </div>

        {editing && !unlocked && (
          <form
            onSubmit={submitPin}
            className="mb-10 max-w-md mx-auto rounded-3xl border border-champagne/40 bg-white/80 p-6 text-center shadow-maroon-xs"
          >
            <Lock className="w-8 h-8 text-champagne mx-auto mb-3" />
            <h3 className="font-display text-xl text-maroon mb-2">Enter edit PIN</h3>
            <p className="text-maroon/60 text-sm mb-4">
              Set <code className="text-xs">VITE_SITE_EDIT_PIN</code> in your .env file.
            </p>
            <input
              type="password"
              value={pinInput}
              onChange={(e) => {
                setPinInput(e.target.value)
                setPinError('')
              }}
              placeholder="PIN"
              className="w-full rounded-xl border border-maroon/15 bg-ivory px-4 py-3 text-sm text-maroon mb-3 focus:outline-none focus:ring-2 focus:ring-champagne/50"
            />
            {pinError && <p className="text-red-600 text-sm mb-3">{pinError}</p>}
            <button
              type="submit"
              className="w-full rounded-xl bg-maroon text-ivory py-3 text-sm font-medium hover:bg-maroon-deep transition-colors"
            >
              Unlock editor
            </button>
          </form>
        )}

        {editing && unlocked && (
          <CoupleEditor
            couple={couple}
            updateCouple={updateCouple}
            setImageFromFile={setImageFromFile}
            resetToDefaults={resetToDefaults}
          />
        )}

        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
          <article
            ref={refA}
            className={`glass-card rounded-3xl p-8 text-center transition-all duration-700 ${
              visA ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } ${editing ? 'ring-2 ring-champagne/40' : ''}`}
          >
            <div className="relative mx-auto w-40 h-40 sm:w-48 sm:h-48 mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blush to-champagne-light opacity-40 animate-pulse" />
              <div
                className="relative w-full h-full rounded-full border-4 border-white shadow-lg overflow-hidden bg-beige-warm"
                style={{
                  backgroundImage: `url(${couple.brideImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                role="img"
                aria-label={`${couple.brideRole} portrait`}
              />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-maroon text-ivory text-xs uppercase tracking-wider px-4 py-1 rounded-full">
                {couple.brideRole}
              </div>
            </div>
            <h3 className="font-display text-3xl text-maroon mb-2">{couple.brideName}</h3>
            <p className="text-maroon/70 leading-relaxed text-sm sm:text-base">{couple.brideBio}</p>
          </article>

          <article
            ref={refB}
            className={`glass-card rounded-3xl p-8 text-center transition-all duration-700 delay-150 ${
              visB ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } ${editing ? 'ring-2 ring-champagne/40' : ''}`}
          >
            <div className="relative mx-auto w-40 h-40 sm:w-48 sm:h-48 mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-champagne-light to-blush-soft opacity-50" />
              <div
                className="relative w-full h-full rounded-full border-4 border-white shadow-lg overflow-hidden bg-beige-warm"
                style={{
                  backgroundImage: `url(${couple.groomImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                role="img"
                aria-label={`${couple.groomRole} portrait`}
              />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-maroon text-ivory text-xs uppercase tracking-wider px-4 py-1 rounded-full">
                {couple.groomRole}
              </div>
            </div>
            <h3 className="font-display text-3xl text-maroon mb-2">{couple.groomName}</h3>
            <p className="text-maroon/70 leading-relaxed text-sm sm:text-base">{couple.groomBio}</p>
          </article>
        </div>

        <div className="mt-14 max-w-2xl mx-auto glass-card rounded-2xl px-8 py-6 flex gap-4 items-start border-l-4 border-champagne">
          <Quote className="w-10 h-10 text-blush shrink-0 mt-1" />
          <p className="font-display text-lg sm:text-xl italic text-maroon/85 leading-relaxed">
            &ldquo;{couple.quote}&rdquo;
          </p>
        </div>
      </div>
    </section>
  )
}
