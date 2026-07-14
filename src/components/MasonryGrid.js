import { createPinCard } from './PinCard.js'

const grid = document.querySelector('#grid')

export function setPhotos(photos) {
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

export function setLoading() {
  grid.innerHTML = '<p class="grid-message">Cargando imágenes…</p>'
}

export function setError(message) {
  grid.innerHTML = `<p class="grid-message grid-message--error">${message}</p>`
}
