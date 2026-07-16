import './Footer.css'
import { createElement } from '../../utils/createElement.js'

export function createFooter() {
  const aboutBlock = createElement('div', { class: 'footer-block' }, [
    createElement('h3', { text: 'Sobre esta página' }),
    createElement('p', {
      text: 'Proyecto de práctica hecho con Vite y JavaScript. Las imágenes se cargan en tiempo real desde Unsplash según lo que busques.',
    }),
  ])

  const contactBlock = createElement('div', { class: 'footer-block' }, [
    createElement('h3', { text: 'Contacto' }),
    createElement('p', { text: 'Daniel Fabrega Alonso' }),
    createElement('a', { href: 'mailto:dfal1ga@gmail.com', text: 'dfal1ga@gmail.com' }),
  ])

  const creditsParagraph = createElement('p', {}, [
    document.createTextNode('Fotografías cedidas por sus autores a través de '),
    createElement('a', {
      href: 'https://unsplash.com',
      target: '_blank',
      rel: 'noopener noreferrer',
      text: 'Unsplash',
    }),
    document.createTextNode('.'),
  ])
  const creditsBlock = createElement('div', { class: 'footer-block' }, [
    createElement('h3', { text: 'Créditos' }),
    creditsParagraph,
  ])

  const content = createElement('div', { class: 'footer-content' }, [aboutBlock, contactBlock, creditsBlock])
  const bottom = createElement('p', {
    class: 'footer-bottom',
    text: `© ${new Date().getFullYear()} Daniel Fabrega Alonso`,
  })

  return createElement('footer', { class: 'footer' }, [content, bottom])
}
