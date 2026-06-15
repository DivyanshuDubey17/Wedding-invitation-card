export function getEditPin() {
  return (
    import.meta.env.VITE_SITE_EDIT_PIN?.trim() ||
    import.meta.env.VITE_GALLERY_EDIT_PIN?.trim() ||
    ''
  )
}
