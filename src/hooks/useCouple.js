import { useCallback, useEffect, useState } from 'react'
import { weddingData } from '../data/weddingData'

const STORAGE_KEY = 'wedding-couple-v1'
const MAX_UPLOAD_BYTES = 1_500_000
const listeners = new Set()

const DEFAULT_QUOTE =
  "We didn't know we were looking for each other until we found us — and every day since has felt like coming home."

function defaults() {
  return {
    ...weddingData.couple,
    quote: DEFAULT_QUOTE,
  }
}

function readCouple() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaults()
    return { ...defaults(), ...JSON.parse(raw) }
  } catch {
    return defaults()
  }
}

function writeCouple(couple) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(couple))
  listeners.forEach((fn) => fn())
}

function readImageFile(file) {
  return new Promise((resolve) => {
    if (!file?.type?.startsWith('image/')) {
      resolve({ ok: false, error: 'Please choose an image file (JPG, PNG, etc.).' })
      return
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      resolve({
        ok: false,
        error: 'Image is too large. Use a file under 1.5 MB, or host it online and paste the URL.',
      })
      return
    }
    const reader = new FileReader()
    reader.onload = () => resolve({ ok: true, src: reader.result })
    reader.onerror = () => resolve({ ok: false, error: 'Could not read that file. Try another image.' })
    reader.readAsDataURL(file)
  })
}

export function useCouple() {
  const [couple, setCouple] = useState(readCouple)

  useEffect(() => {
    const sync = () => setCouple(readCouple())
    listeners.add(sync)
    return () => listeners.delete(sync)
  }, [])

  const updateCouple = useCallback((patch) => {
    const next = { ...readCouple(), ...patch }
    writeCouple(next)
    setCouple(next)
  }, [])

  const setImageFromFile = useCallback(async (field, file) => {
    const result = await readImageFile(file)
    if (result.ok) {
      updateCouple({ [field]: result.src })
    }
    return result
  }, [updateCouple])

  const resetToDefaults = useCallback(() => {
    const next = defaults()
    writeCouple(next)
    setCouple(next)
  }, [])

  return {
    couple,
    updateCouple,
    setImageFromFile,
    resetToDefaults,
  }
}
