import './PinCard.css'
import { createElement } from '../../utils/createElement.js'

export function createPinCard(photo) {
  const description = photo.alt_description || photo.description || 'Imagen de Unsplash'

  const image = createElement('img', {
    class: 'pin-image',
    src: photo.urls.small,
    srcset: `${photo.urls.small} 400w, ${photo.urls.regular} 1080w`,
    sizes: '(max-width: 600px) 50vw, 236px',
    alt: description,
    loading: 'lazy',
  })

  const imageWrapper = createElement(
    'div',
    { class: 'pin-image-wrapper', style: `aspect-ratio: ${photo.width} / ${photo.height}` },
    [image]
  )

  const link = createElement(
    'a',
    { class: 'pin-link', href: photo.links.html, target: '_blank', rel: 'noopener noreferrer' },
    [imageWrapper]
  )

  const avatar = createElement('img', {
    class: 'pin-avatar',
    src: photo.user.profile_image.medium,
    alt: photo.user.name,
    loading: 'lazy',
  })

  const author = createElement('a', {
    class: 'pin-author',
    href: photo.user.links.html,
    target: '_blank',
    rel: 'noopener noreferrer',
    text: photo.user.name,
  })

  const footer = createElement('div', { class: 'pin-footer' }, [avatar, author])

  return createElement('article', { class: 'pin' }, [link, footer])
}
