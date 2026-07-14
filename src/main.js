import './style.css'
import { createHeader } from './components/Header.js'
import { createMasonryGrid } from './components/MasonryGrid.js'
import { createFooter } from './components/Footer.js'
import { listPhotos, searchPhotos } from './api/unsplash.js'

const app = document.querySelector('#app')

const grid = createMasonryGrid()

let initialPhotos = null

async function loadInitialPhotos() {
  grid.setLoading()
  try {
    const photos = await listPhotos(1)
    initialPhotos = photos
    grid.setPhotos(photos)
  } catch (error) {
    grid.setError('No se pudieron cargar las imágenes. Comprueba tu conexión o tu API key de Unsplash.')
    console.error(error)
  }
}

async function handleSearch(query) {
  grid.setLoading()
  try {
    const data = await searchPhotos(query, 1)
    grid.setPhotos(data.results)
  } catch (error) {
    grid.setError('Ha ocurrido un error al buscar imágenes. Inténtalo de nuevo.')
    console.error(error)
  }
}

function handleLogoClick() {
  if (initialPhotos) {
    grid.setPhotos(initialPhotos)
  } else {
    loadInitialPhotos()
  }
}

const header = createHeader({ onSearch: handleSearch, onLogoClick: handleLogoClick })
const footer = createFooter()

app.appendChild(header)
app.appendChild(grid.element)
app.appendChild(footer)

loadInitialPhotos()
