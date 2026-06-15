import { useCallback, useEffect, useState } from 'react'
import { weddingData } from '../data/weddingData'

const STORAGE_KEY = 'wedding-gallery-v1'
const MAX_UPLOAD_BYTES = 1_500_000

function defaultItems() {
  return weddingData.gallery.map((img, i) => ({
    id: `default-${i}`,
    src: img.src,
    alt: img.alt || '',
  }))
}

function loadStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed) || parsed.length === 0) return null
    return parsed.filter((item) => item?.src)
  } catch {
    return null
  }
}

function persist(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

function newId() {
  return `photo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function useGallery() {
  const [photos, setPhotos] = useState(() => loadStored() ?? defaultItems())

  useEffect(() => {
    persist(photos)
  }, [photos])

  const addFromUrl = useCallback((src, alt = '') => {
    const trimmed = src.trim()
    if (!trimmed) return { ok: false, error: 'Please enter an image URL or path.' }
    setPhotos((prev) => [...prev, { id: newId(), src: trimmed, alt: alt.trim() }])
    return { ok: true }
  }, [])

  const addFromFile = useCallback((file, alt = '') => {
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
      reader.onload = () => {
        setPhotos((prev) => [
          ...prev,
          { id: newId(), src: reader.result, alt: alt.trim() || file.name.replace(/\.[^.]+$/, '') },
        ])
        resolve({ ok: true })
      }
      reader.onerror = () => resolve({ ok: false, error: 'Could not read that file. Try another image.' })
      reader.readAsDataURL(file)
    })
  }, [])

  const updatePhoto = useCallback((id, patch) => {
    setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)))
  }, [])

  const removePhoto = useCallback((id) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const movePhoto = useCallback((id, direction) => {
    setPhotos((prev) => {
      const index = prev.findIndex((p) => p.id === id)
      if (index < 0) return prev
      const next = direction === 'up' ? index - 1 : index + 1
      if (next < 0 || next >= prev.length) return prev
      const copy = [...prev]
      ;[copy[index], copy[next]] = [copy[next], copy[index]]
      return copy
    })
  }, [])

  const resetToDefaults = useCallback(() => {
    const items = defaultItems()
    setPhotos(items)
    persist(items)
  }, [])

  return {
    photos,
    addFromUrl,
    addFromFile,
    updatePhoto,
    removePhoto,
    movePhoto,
    resetToDefaults,
  }
}
