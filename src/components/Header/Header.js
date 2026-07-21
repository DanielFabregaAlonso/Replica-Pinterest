import './Header.css'
import { createElement } from '../../utils/createElement.js'

export function createHeader({ onSearch, onLogoClick }) {
  const logoImg = createElement('img', { src: '/pinterest-logo.svg', class: 'logo-icon', alt: '' })
  const logoButton = createElement(
    'button',
    { type: 'button', id: 'logo', class: 'logo', 'aria-label': 'Volver al inicio' },
    [logoImg]
  )

  const navHome = createElement('button', { type: 'button', class: 'nav-link nav-link--home', text: 'Inicio' })
  const navExplore = createElement('button', { type: 'button', class: 'nav-link', text: 'Explorar' })
  const navCreate = createElement('button', { type: 'button', class: 'nav-link', text: 'Crear' })
  const navNotifications = createElement('button', {
    type: 'button',
    class: 'nav-link nav-link--mobile-only',
    text: 'Notificaciones',
  })
  const navProfile = createElement('button', {
    type: 'button',
    class: 'nav-link nav-link--mobile-only',
    text: 'Perfil',
  })
  const mainNav = createElement(
    'nav',
    { id: 'mobile-menu', class: 'main-nav', 'aria-label': 'Navegación principal', hidden: '' },
    [navHome, navExplore, navCreate, navNotifications, navProfile]
  )

  const headerStart = createElement('div', { class: 'header-start' }, [logoButton, mainNav])

  const searchInput = createElement('input', {
    type: 'search',
    name: 'query',
    id: 'search-input',
    class: 'search-input',
    placeholder: 'Buscar imágenes',
    'aria-label': 'Buscar imágenes',
    autocomplete: 'off',
  })
  const searchForm = createElement('form', { id: 'search-form', class: 'search-form', role: 'search' }, [
    searchInput,
  ])

  const bellIcon = createElement('img', { src: '/icon-bell.svg', class: 'icon-btn-icon', alt: '' })
  const notificationsButton = createElement(
    'button',
    { type: 'button', class: 'icon-btn', 'aria-label': 'Notificaciones' },
    [bellIcon]
  )

  const userIcon = createElement('img', { src: '/icon-user.svg', class: 'icon-btn-icon', alt: '' })
  const profileButton = createElement('button', { type: 'button', class: 'icon-btn', 'aria-label': 'Perfil' }, [
    userIcon,
  ])

  const menuToggle = createElement(
    'button',
    {
      type: 'button',
      id: 'menu-toggle',
      class: 'menu-toggle',
      'aria-label': 'Abrir menú',
      'aria-expanded': 'false',
      'aria-controls': 'mobile-menu',
    },
    [createElement('span'), createElement('span'), createElement('span')]
  )

  const headerEnd = createElement('div', { class: 'header-end' }, [
    notificationsButton,
    profileButton,
    menuToggle,
  ])

  const header = createElement('header', { class: 'header' }, [headerStart, searchForm, headerEnd])

  function closeMobileMenu() {
    mainNav.hidden = true
    menuToggle.setAttribute('aria-expanded', 'false')
    header.classList.remove('menu-open')
  }

  function resetToHome() {
    searchInput.value = ''
    onLogoClick()
    closeMobileMenu()
  }

  logoButton.addEventListener('click', resetToHome)
  navHome.addEventListener('click', resetToHome)

  menuToggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('menu-open')
    mainNav.hidden = !isOpen
    menuToggle.setAttribute('aria-expanded', String(isOpen))
  })

  searchForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const query = searchInput.value.trim()
    if (!query) return
    onSearch(query)
    searchInput.value = ''
    closeMobileMenu()
  })

  return header
}
