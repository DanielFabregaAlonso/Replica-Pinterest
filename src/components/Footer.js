export function createFooter() {
  const footer = document.createElement('footer')
  footer.className = 'footer'
  footer.innerHTML = `
    <div class="footer-content">
      <div class="footer-block">
        <h3>Sobre esta página</h3>
        <p>Proyecto de práctica hecho con Vite y JavaScript. Las imágenes se cargan en tiempo real desde Unsplash según lo que busques.</p>
      </div>
      <div class="footer-block">
        <h3>Contacto</h3>
        <p>Daniel Fabrega Alonso</p>
        <a href="mailto:dfal1ga@gmail.com">dfal1ga@gmail.com</a>
      </div>
      <div class="footer-block">
        <h3>Créditos</h3>
        <p>Fotografías cedidas por sus autores a través de <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a>.</p>
      </div>
    </div>
    <p class="footer-bottom">© ${new Date().getFullYear()} Daniel Fabrega Alonso</p>
  `
  return footer
}
