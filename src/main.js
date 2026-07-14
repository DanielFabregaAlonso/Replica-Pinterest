import './style.css'
import { initHeader } from './components/Header.js'
import { setPhotos, setLoading, setError } from './components/MasonryGrid.js'
import { listPhotos, searchPhotos } from './api/unsplash.js'

let initialPhotos = null

async function loadInitialPhotos() {
  setLoading()
  try {
    const photos = await listPhotos(1)
    initialPhotos = photos
    setPhotos(photos)
  } catch (error) {
    setError('No se pudieron cargar las imágenes. Comprueba tu conexión o tu API key de Unsplash.')
    console.error(error)
  }
}

async function handleSearch(query) {
  setLoading()
  try {
    const data = await searchPhotos(query, 1)
    setPhotos(data.results)
  } catch (error) {
    setError('Ha ocurrido un error al buscar imágenes. Inténtalo de nuevo.')
    console.error(error)
  }
}

function handleLogoClick() {
  if (initialPhotos) {
    setPhotos(initialPhotos)
  } else {
    loadInitialPhotos()
  }
}

initHeader({ onSearch: handleSearch, onLogoClick: handleLogoClick })
loadInitialPhotos()
