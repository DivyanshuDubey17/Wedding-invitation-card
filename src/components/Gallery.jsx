import { useEffect, useRef, useState } from 'react'
import {
  X,
  Settings2,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  ImagePlus,
  RotateCcw,
  Check,
  Lock,
} from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useGallery } from '../hooks/useGallery'
import { getEditPin } from '../utils/editPin'

const EDIT_PIN = getEditPin()

function GalleryEditor({ photos, gallery }) {
  const [url, setUrl] = useState('')
  const [alt, setAlt] = useState('')
  const [message, setMessage] = useState({ type: '', text: '' })
  const fileRef = useRef(null)

  const showMessage = (type, text) => {
    setMessage({ type, text })
    window.setTimeout(() => setMessage({ type: '', text: '' }), 4000)
  }

  const handleAddUrl = (e) => {
    e.preventDefault()
    const result = gallery.addFromUrl(url, alt)
    if (result.ok) {
      setUrl('')
      setAlt('')
      showMessage('ok', 'Photo added.')
    } else {
      showMessage('err', result.error)
    }
  }

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const result = await gallery.addFromFile(file, alt)
    if (result.ok) {
      setAlt('')
      showMessage('ok', 'Photo uploaded.')
    } else {
      showMessage('err', result.error)
    }
    e.target.value = ''
  }

  return (
    <div className="mb-10 rounded-3xl border border-champagne/40 bg-white/80 backdrop-blur-md p-5 sm:p-8 shadow-maroon-xs">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
        <div>
          <h3 className="font-display text-2xl text-maroon italic">Manage photos</h3>
          <p className="text-maroon/60 text-sm mt-1 max-w-xl">
            Add images by URL (e.g. <code className="text-xs bg-beige/80 px-1 rounded">/my-photo.jpg</code> from the{' '}
            <code className="text-xs bg-beige/80 px-1 rounded">public</code> folder) or upload a file. Changes save
            automatically in this browser.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Restore the original placeholder photos from the site data?')) {
              gallery.resetToDefaults()
              showMessage('ok', 'Gallery reset to defaults.')
            }
          }}
          className="inline-flex items-center gap-2 text-sm text-maroon/70 hover:text-maroon border border-maroon/15 rounded-full px-4 py-2 hover:bg-beige/60 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset defaults
        </button>
      </div>

      <form onSubmit={handleAddUrl} className="grid sm:grid-cols-[1fr_1fr_auto] gap-3 mb-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Image URL or path, e.g. /photos/us.jpg"
          className="rounded-xl border border-maroon/15 bg-ivory px-4 py-3 text-sm text-maroon placeholder:text-maroon/40 focus:outline-none focus:ring-2 focus:ring-champagne/50"
        />
        <input
          type="text"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          placeholder="Caption (optional)"
          className="rounded-xl border border-maroon/15 bg-ivory px-4 py-3 text-sm text-maroon placeholder:text-maroon/40 focus:outline-none focus:ring-2 focus:ring-champagne/50"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-maroon text-ivory px-5 py-3 text-sm font-medium hover:bg-maroon-deep transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add URL
        </button>
      </form>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-xl border border-maroon/20 bg-beige/50 px-4 py-2.5 text-sm text-maroon hover:bg-beige transition-colors"
        >
          <ImagePlus className="w-4 h-4" />
          Upload image
        </button>
        <span className="text-xs text-maroon/50">Uploads under 1.5 MB · stored in this browser only</span>
      </div>

      {message.text && (
        <p
          className={`mb-5 text-sm rounded-xl px-4 py-2 ${
            message.type === 'err' ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'
          }`}
        >
          {message.text}
        </p>
      )}

      {photos.length === 0 ? (
        <p className="text-maroon/60 text-sm italic">No photos yet — add your first image above.</p>
      ) : (
        <ul className="space-y-3">
          {photos.map((img, i) => (
            <li
              key={img.id}
              className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl border border-maroon/10 bg-ivory/80 p-3"
            >
              <div
                className="w-full sm:w-20 h-20 rounded-xl bg-beige-warm bg-cover bg-center shrink-0 border border-white"
                style={{ backgroundImage: `url(${img.src})` }}
              />
              <div className="flex-1 grid sm:grid-cols-2 gap-2 min-w-0">
                <input
                  type="text"
                  value={img.src}
                  onChange={(e) => gallery.updatePhoto(img.id, { src: e.target.value })}
                  className="rounded-lg border border-maroon/10 px-3 py-2 text-xs text-maroon bg-white focus:outline-none focus:ring-2 focus:ring-champagne/40"
                  aria-label="Image URL"
                />
                <input
                  type="text"
                  value={img.alt}
                  onChange={(e) => gallery.updatePhoto(img.id, { alt: e.target.value })}
                  placeholder="Caption"
                  className="rounded-lg border border-maroon/10 px-3 py-2 text-xs text-maroon bg-white focus:outline-none focus:ring-2 focus:ring-champagne/40"
                  aria-label="Caption"
                />
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  disabled={i === 0}
                  onClick={() => gallery.movePhoto(img.id, 'up')}
                  className="p-2 rounded-lg text-maroon/60 hover:text-maroon hover:bg-beige disabled:opacity-30 disabled:pointer-events-none"
                  aria-label="Move up"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  disabled={i === photos.length - 1}
                  onClick={() => gallery.movePhoto(img.id, 'down')}
                  className="p-2 rounded-lg text-maroon/60 hover:text-maroon hover:bg-beige disabled:opacity-30 disabled:pointer-events-none"
                  aria-label="Move down"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Remove this photo from the gallery?')) gallery.removePhoto(img.id)
                  }}
                  className="p-2 rounded-lg text-red-600/70 hover:text-red-700 hover:bg-red-50"
                  aria-label="Remove photo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function Gallery() {
  const [ref, visible] = useScrollReveal()
  const [active, setActive] = useState(null)
  const [editing, setEditing] = useState(false)
  const [unlocked, setUnlocked] = useState(!EDIT_PIN)
  const [pinInput, setPinInput] = useState('')
  const [pinError, setPinError] = useState('')
  const gallery = useGallery()
  const { photos } = gallery

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setActive(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = active !== null ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [active])

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
    <section id="gallery" className="py-20 sm:py-28 px-4 bg-ivory">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 relative">
          <p className="text-champagne uppercase tracking-[0.3em] text-sm mb-3">Memories</p>
          <h2 className="font-display text-4xl sm:text-5xl text-maroon italic">A glimpse of us</h2>
          <p className="text-maroon/60 mt-3 max-w-xl mx-auto text-sm">
            Tap a photo to preview. Use Manage photos to update this gallery anytime.
          </p>
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
            {editing ? 'Done editing' : 'Manage photos'}
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

        {editing && unlocked && <GalleryEditor photos={photos} gallery={gallery} />}

        <div
          ref={ref}
          className={`columns-2 md:columns-3 gap-4 space-y-4 transition-all duration-700 ${
            visible ? 'opacity-100' : 'opacity-0 translate-y-8'
          }`}
        >
          {photos.map((img) => (
            <button
              key={img.id}
              type="button"
              onClick={() => !editing && setActive(img)}
              className={`break-inside-avoid w-full rounded-2xl overflow-hidden border border-white/80 shadow-lg group focus:outline-none focus:ring-2 focus:ring-champagne focus:ring-offset-2 ${
                editing ? 'ring-2 ring-champagne/50 pointer-events-none' : ''
              }`}
            >
              <div
                className="relative aspect-[3/4] sm:aspect-auto sm:min-h-[200px] bg-beige-warm bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${img.src})` }}
              >
                <span className="sr-only">{img.alt}</span>
                <div className="absolute inset-0 bg-maroon/0 group-hover:bg-maroon/10 transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-maroon-deep/90 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-ivory hover:bg-white/20 transition-colors"
            aria-label="Close"
            onClick={(e) => {
              e.stopPropagation()
              setActive(null)
            }}
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={active.src}
            alt={active.alt}
            className="max-h-[90vh] max-w-full object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
