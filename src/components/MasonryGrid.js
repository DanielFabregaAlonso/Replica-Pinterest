import { createPinCard } from './PinCard.js'

export function createMasonryGrid() {
  const grid = document.createElement('section')
  grid.className = 'grid'
  grid.setAttribute('aria-live', 'polite')

  function setPhotos(photos) {
    grid.innerHTML = ''

    if (!photos.length) {
      const empty = document.createElement('p')
      empty.className = 'grid-message'
      empty.textContent = 'No se encontraron imágenes para esta búsqueda.'
      grid.appendChild(empty)
      return
    }

    const fragment = document.createDocumentFragment()
    photos.forEach((photo) => {
      fragment.appendChild(createPinCard(photo))
    })
    grid.appendChild(fragment)
  }

  function setLoading() {
    grid.innerHTML = '<p class="grid-message">Cargando imágenes…</p>'
  }

  function setError(message) {
    grid.innerHTML = `<p class="grid-message grid-message--error">${message}</p>`
  }

  return { element: grid, setPhotos, setLoading, setError }
}
