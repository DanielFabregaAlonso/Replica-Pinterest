import './MasonryGrid.css'
import { createElement } from '../../utils/createElement.js'
import { createPinCard } from '../PinCard/PinCard.js'

const grid = createElement('main', { id: 'grid', class: 'grid', 'aria-live': 'polite' })

export function getGridElement() {
  return grid
}

export function setPhotos(photos) {
  grid.replaceChildren()

  if (!photos.length) {
    grid.appendChild(
      createElement('p', { class: 'grid-message', text: 'No se encontraron imágenes para esta búsqueda.' })
    )
    return
  }

  const fragment = document.createDocumentFragment()
  photos.forEach((photo) => fragment.appendChild(createPinCard(photo)))
  grid.appendChild(fragment)
}

export function setLoading() {
  grid.replaceChildren(createElement('p', { class: 'grid-message', text: 'Cargando imágenes…' }))
}

export function setError(message) {
  grid.replaceChildren(createElement('p', { class: 'grid-message grid-message--error', text: message }))
}
