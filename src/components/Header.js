export function initHeader({ onSearch, onLogoClick }) {
  const header = document.querySelector('.header')
  const logoButton = document.querySelector('#logo')
  const form = document.querySelector('#search-form')
  const input = document.querySelector('#search-input')
  const menuToggle = document.querySelector('#menu-toggle')
  const mobileMenu = document.querySelector('#mobile-menu')
  const homeLinks = document.querySelectorAll('.nav-link--home')

  function closeMobileMenu() {
    mobileMenu.hidden = true
    menuToggle.setAttribute('aria-expanded', 'false')
    header.classList.remove('menu-open')
  }

  function resetToHome() {
    input.value = ''
    onLogoClick()
    closeMobileMenu()
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
}
