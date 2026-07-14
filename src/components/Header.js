export function createHeader({ onSearch, onLogoClick }) {
  const header = document.createElement('header')
  header.className = 'header'
  header.innerHTML = `
    <div class="header-start">
      <button type="button" class="logo" aria-label="Volver al inicio">
        <svg viewBox="0 0 24 24" class="logo-icon" role="presentation" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.62 7.87 6.32 9.36-.09-.79-.17-2.01.04-2.88.19-.79 1.22-5.09 1.22-5.09s-.31-.62-.31-1.54c0-1.44.84-2.52 1.87-2.52.88 0 1.31.66 1.31 1.45 0 .88-.56 2.21-.85 3.44-.24 1.02.51 1.86 1.52 1.86 1.82 0 3.22-1.92 3.22-4.7 0-2.46-1.77-4.18-4.29-4.18-2.92 0-4.64 2.19-4.64 4.45 0 .88.34 1.83.76 2.34.08.1.09.19.07.29-.08.32-.25 1.02-.29 1.16-.04.19-.15.23-.35.14-1.3-.61-2.11-2.5-2.11-4.03 0-3.28 2.38-6.29 6.87-6.29 3.6 0 6.4 2.57 6.4 6 0 3.58-2.26 6.46-5.39 6.46-1.05 0-2.04-.55-2.38-1.2l-.65 2.47c-.23.9-.87 2.02-1.29 2.71.97.3 2 .46 3.06.46 5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
        </svg>
      </button>
      <nav class="main-nav" aria-label="Navegación principal">
        <button type="button" class="nav-link nav-link--home">Inicio</button>
        <button type="button" class="nav-link">Explorar</button>
        <button type="button" class="nav-link">Crear</button>
      </nav>
    </div>

    <form class="search-form" role="search">
      <input
        type="search"
        name="query"
        class="search-input"
        placeholder="Buscar imágenes"
        aria-label="Buscar imágenes"
        autocomplete="off"
      />
    </form>

    <div class="header-end">
      <button type="button" class="icon-btn" aria-label="Notificaciones">
        <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
          <path d="M12 22a2.4 2.4 0 0 0 2.4-2.4h-4.8A2.4 2.4 0 0 0 12 22Zm7.2-6V11c0-3.5-1.86-6.43-5.1-7.2v-.8a2.1 2.1 0 1 0-4.2 0v.8C6.66 4.57 4.8 7.49 4.8 11v5l-1.8 1.8v.9h18v-.9L19.2 16Z"/>
        </svg>
      </button>
      <button type="button" class="icon-btn" aria-label="Perfil">
        <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
          <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2.5c-4.14 0-9 2.08-9 5.5v2h18v-2c0-3.42-4.86-5.5-9-5.5Z"/>
        </svg>
      </button>
      <button type="button" class="menu-toggle" aria-label="Abrir menú" aria-expanded="false" aria-controls="mobile-menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <nav id="mobile-menu" class="mobile-menu" aria-label="Navegación móvil" hidden>
      <button type="button" class="nav-link nav-link--home">Inicio</button>
      <button type="button" class="nav-link">Explorar</button>
      <button type="button" class="nav-link">Crear</button>
      <button type="button" class="nav-link">Notificaciones</button>
      <button type="button" class="nav-link">Perfil</button>
    </nav>
  `

  const logoButton = header.querySelector('.logo')
  const form = header.querySelector('.search-form')
  const input = header.querySelector('.search-input')
  const menuToggle = header.querySelector('.menu-toggle')
  const mobileMenu = header.querySelector('.mobile-menu')
  const homeLinks = header.querySelectorAll('.nav-link--home')

  function resetToHome() {
    input.value = ''
    onLogoClick()
    closeMobileMenu()
  }

  function closeMobileMenu() {
    mobileMenu.hidden = true
    menuToggle.setAttribute('aria-expanded', 'false')
    header.classList.remove('menu-open')
  }

  logoButton.addEventListener('click', resetToHome)
  homeLinks.forEach((link) => link.addEventListener('click', resetToHome))

  menuToggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('menu-open')
    mobileMenu.hidden = !isOpen
    menuToggle.setAttribute('aria-expanded', String(isOpen))
  })

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const query = input.value.trim()
    if (!query) return
    onSearch(query)
    input.value = ''
    closeMobileMenu()
  })

  return header
}
