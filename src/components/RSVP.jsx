import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { CheckCircle2, Send, AlertCircle } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { db, isFirestoreReady } from '../firebase'

const eventOptions = ['Engagement', 'Haldi', 'Mehendi', 'Sangeet', 'Wedding Ceremony', 'Reception']

const initialForm = {
  fullName: '',
  phone: '',
  email: '',
  guestCount: '1',
  events: [],
  meal: '',
  message: '',
  attendance: '',
}

function validate(form) {
  const errors = {}
  if (!form.fullName.trim()) errors.fullName = 'Please enter your full name'
  if (!form.phone.trim()) errors.phone = 'Please enter your phone number'
  else if ((form.phone.match(/\d/g) || []).length < 10) errors.phone = 'Enter a valid phone number (at least 10 digits)'
  if (!form.email.trim()) errors.email = 'Please enter your email'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email'
  if (!form.attendance) errors.attendance = 'Please confirm your attendance'
  if (!form.meal) errors.meal = 'Please select a meal preference'
  const n = parseInt(form.guestCount, 10)
  if (Number.isNaN(n) || n < 1 || n > 20) errors.guestCount = 'Enter a number of guests between 1 and 20'
  return errors
}

export default function RSVP() {
  const [ref, visible] = useScrollReveal()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [savedToCloud, setSavedToCloud] = useState(false)

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  const toggleEvent = (name) => {
    setForm((f) => ({
      ...f,
      events: f.events.includes(name) ? f.events.filter((x) => x !== name) : [...f.events, name],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const v = validate(form)
    setErrors(v)
    if (Object.keys(v).length) return

    setSubmitting(true)
    setSubmitError('')

    const payload = {
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      guestCount: parseInt(form.guestCount, 10),
      events: form.events,
      meal: form.meal,
      attendance: form.attendance,
      message: form.message.trim(),
    }

    try {
      if (db) {
        await addDoc(collection(db, 'rsvps'), {
          ...payload,
          createdAt: serverTimestamp(),
        })
        setSavedToCloud(true)
      } else {
        await new Promise((r) => setTimeout(r, 600))
        setSavedToCloud(false)
      }
      setSubmitted(true)
      setForm(initialForm)
    } catch (err) {
      console.error(err)
      setSubmitError(
        err?.code === 'permission-denied'
          ? 'Could not save your RSVP (permission denied). Ask the hosts to check Firestore security rules.'
          : err?.message || 'Something went wrong. Please try again in a moment.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <section id="rsvp" className="py-20 sm:py-28 px-4 bg-gradient-to-b from-blush-soft/30 to-ivory">
        <div className="max-w-lg mx-auto text-center glass-card rounded-3xl p-10 sm:p-14 border border-white/80">
          <CheckCircle2 className="w-16 h-16 text-champagne mx-auto mb-6" />
          <h2 className="font-display text-3xl sm:text-4xl text-maroon italic mb-4">Thank you, dear guest</h2>
          <p className="text-maroon/75 leading-relaxed mb-8">
            Your RSVP has been received. We’re saving you a seat and a smile — can’t wait to celebrate with you.
            {savedToCloud
              ? ' Your details are saved securely with our hosts.'
              : ' (Demo mode: Firebase is not configured — this response was not stored online.)'}
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false)
              setSavedToCloud(false)
            }}
            className="rounded-full border-2 border-maroon text-maroon px-8 py-3 font-medium hover:bg-maroon hover:text-ivory transition-colors"
          >
            Submit another response
          </button>
        </div>
      </section>
    )
  }

  return (
    <section id="rsvp" className="py-20 sm:py-28 px-4 bg-gradient-to-b from-blush-soft/30 to-ivory">
      <div
        ref={ref}
        className={`max-w-2xl mx-auto transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center mb-12">
          <p className="text-champagne uppercase tracking-[0.3em] text-sm mb-3">RSVP</p>
          <h2 className="font-display text-4xl sm:text-5xl text-maroon italic">Kindly respond by 1 November 2026</h2>
          <div className="mt-4 max-w-xl mx-auto space-y-2">
            {isFirestoreReady() ? (
              <p className="text-sm text-center rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-900 px-4 py-3 leading-relaxed">
                <strong className="font-semibold">Firebase connected.</strong> Submitted RSVPs are stored in{' '}
                <strong>Firestore</strong> under the collection name <code className="text-xs bg-white/80 px-1.5 py-0.5 rounded">rsvps</code>{' '}
                (it appears only after the <em>first successful</em> submit). In the console open{' '}
                <strong>Build → Firestore Database → Data</strong> — not &quot;Realtime Database&quot;.
              </p>
            ) : (
              <p className="text-sm text-center rounded-xl bg-amber-50 border border-amber-200/80 text-amber-950 px-4 py-3 leading-relaxed">
                <strong className="font-semibold">Firebase not active.</strong> Add all{' '}
                <code className="text-xs bg-white/70 px-1 rounded">VITE_FIREBASE_*</code> variables to{' '}
                <code className="text-xs bg-white/70 px-1 rounded">.env</code> in the project root (see{' '}
                <code className="text-xs bg-white/70 px-1 rounded">.env.example</code>), then <strong>stop and restart</strong>{' '}
                <code className="text-xs bg-white/70 px-1 rounded">npm run dev</code>. Until then, submits are demo-only and
                nothing is written to your database.
              </p>
            )}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass-card rounded-3xl p-6 sm:p-10 border border-white/80 space-y-6 shadow-maroon-sm"
          noValidate
        >
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-maroon mb-1.5">
              Full name <span className="text-blush">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              value={form.fullName}
              onChange={(e) => update('fullName', e.target.value)}
              className="w-full rounded-xl border border-maroon/15 bg-white/60 px-4 py-3 text-maroon placeholder:text-maroon/35 focus:outline-none focus:ring-2 focus:ring-champagne/50 focus:border-champagne"
              placeholder="As you’d like it on the seating chart"
            />
            {errors.fullName && (
              <p className="mt-1.5 text-sm text-red-700 flex items-center gap-1">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {errors.fullName}
              </p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-maroon mb-1.5">
                Phone number <span className="text-blush">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                className="w-full rounded-xl border border-maroon/15 bg-white/60 px-4 py-3 text-maroon placeholder:text-maroon/35 focus:outline-none focus:ring-2 focus:ring-champagne/50"
                placeholder="+91 ..."
              />
              {errors.phone && (
                <p className="mt-1.5 text-sm text-red-700 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {errors.phone}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-maroon mb-1.5">
                Email <span className="text-blush">*</span>
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                className="w-full rounded-xl border border-maroon/15 bg-white/60 px-4 py-3 text-maroon placeholder:text-maroon/35 focus:outline-none focus:ring-2 focus:ring-champagne/50"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1.5 text-sm text-red-700 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="guestCount" className="block text-sm font-medium text-maroon mb-1.5">
              Number of guests (including you)
            </label>
            <input
              id="guestCount"
              type="number"
              min={1}
              max={20}
              value={form.guestCount}
              onChange={(e) => update('guestCount', e.target.value)}
              className="w-full sm:max-w-xs rounded-xl border border-maroon/15 bg-white/60 px-4 py-3 text-maroon focus:outline-none focus:ring-2 focus:ring-champagne/50"
            />
            {errors.guestCount && (
              <p className="mt-1.5 text-sm text-red-700 flex items-center gap-1">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {errors.guestCount}
              </p>
            )}
          </div>

          <fieldset>
            <legend className="text-sm font-medium text-maroon mb-3 block">Which event(s) will you attend?</legend>
            <div className="grid sm:grid-cols-2 gap-2">
              {eventOptions.map((name) => (
                <label
                  key={name}
                  className="flex items-center gap-3 rounded-xl border border-maroon/10 bg-white/40 px-4 py-2.5 cursor-pointer hover:border-champagne/40 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={form.events.includes(name)}
                    onChange={() => toggleEvent(name)}
                    className="rounded border-maroon/30 text-maroon focus:ring-champagne"
                  />
                  <span className="text-sm text-maroon/85">{name}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <span className="block text-sm font-medium text-maroon mb-2">
              Meal preference <span className="text-blush">*</span>
            </span>
            <div className="flex flex-wrap gap-3">
              {['Veg', 'Non-Veg', 'Jain', 'Other'].map((m) => (
                <label
                  key={m}
                  className={`cursor-pointer rounded-full px-5 py-2 text-sm border transition-all ${
                    form.meal === m
                      ? 'bg-maroon text-ivory border-maroon'
                      : 'border-maroon/20 bg-white/50 text-maroon hover:border-champagne'
                  }`}
                >
                  <input
                    type="radio"
                    name="meal"
                    value={m}
                    checked={form.meal === m}
                    onChange={() => update('meal', m)}
                    className="sr-only"
                  />
                  {m}
                </label>
              ))}
            </div>
            {errors.meal && (
              <p className="mt-1.5 text-sm text-red-700 flex items-center gap-1">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {errors.meal}
              </p>
            )}
          </div>

          <div>
            <span className="block text-sm font-medium text-maroon mb-2">
              Will you join us? <span className="text-blush">*</span>
            </span>
            <div className="flex flex-wrap gap-3">
              {['Yes', 'No', 'Maybe'].map((a) => (
                <label
                  key={a}
                  className={`cursor-pointer rounded-full px-5 py-2 text-sm border transition-all ${
                    form.attendance === a
                      ? 'bg-champagne text-maroon border-champagne'
                      : 'border-maroon/20 bg-white/50 text-maroon hover:border-champagne'
                  }`}
                >
                  <input
                    type="radio"
                    name="attendance"
                    value={a}
                    checked={form.attendance === a}
                    onChange={() => update('attendance', a)}
                    className="sr-only"
                  />
                  {a}
                </label>
              ))}
            </div>
            {errors.attendance && (
              <p className="mt-1.5 text-sm text-red-700 flex items-center gap-1">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {errors.attendance}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-maroon mb-1.5">
              Message for the couple
            </label>
            <textarea
              id="message"
              rows={4}
              value={form.message}
              onChange={(e) => update('message', e.target.value)}
              className="w-full rounded-xl border border-maroon/15 bg-white/60 px-4 py-3 text-maroon placeholder:text-maroon/35 focus:outline-none focus:ring-2 focus:ring-champagne/50 resize-y min-h-[100px]"
              placeholder="A wish, a memory, or a song request for the sangeet..."
            />
          </div>

          {submitError && (
            <p className="text-sm text-red-700 flex items-start gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              {submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-maroon text-ivory py-4 font-medium tracking-wide shadow-maroon-sm hover:bg-maroon-deep disabled:opacity-60 transition-colors"
          >
            {submitting ? (
              'Sending…'
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send RSVP
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  )
}
