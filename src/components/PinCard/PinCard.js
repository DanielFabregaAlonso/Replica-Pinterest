import './PinCard.css'
import { createElement } from '../../utils/createElement.js'
import { getPhotoStatistics } from '../../api/unsplash.js'

function formatCount(value) {
  if (value === null || value === undefined) return '—'
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
  if (value >= 1000) return `${(value / 1000).toFixed(1).replace(/\.0$/, '')}k`
  return String(value)
}

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

  const viewsValue = createElement('span', { class: 'pin-stat-value', text: '…' })
  const viewsStat = createElement(
    'span',
    { class: 'pin-stat', 'aria-label': 'Visualizaciones' },
    [createElement('img', { src: '/icon-eye.png', class: 'pin-stat-icon', alt: '' }), viewsValue]
  )

  const likesValue = createElement('span', { class: 'pin-stat-value', text: formatCount(photo.likes) })
  const likesStat = createElement(
    'span',
    { class: 'pin-stat', 'aria-label': 'Me gusta' },
    [createElement('img', { src: '/icon-heart.png', class: 'pin-stat-icon', alt: '' }), likesValue]
  )

  const overlay = createElement('div', { class: 'pin-overlay' }, [
    createElement('div', { class: 'pin-stats' }, [viewsStat, likesStat]),
  ])

  const imageWrapper = createElement(
    'div',
    { class: 'pin-image-wrapper', style: `aspect-ratio: ${photo.width} / ${photo.height}` },
    [image, overlay]
  )

  const link = createElement(
    'a',
    { class: 'pin-link', href: photo.links.html, target: '_blank', rel: 'noopener noreferrer' },
    [imageWrapper]
  )

  let statsRequested = false
  link.addEventListener('mouseenter', () => {
    if (statsRequested) return
    statsRequested = true
    getPhotoStatistics(photo.id)
      .then((stats) => {
        viewsValue.textContent = formatCount(stats.views?.total)
      })
      .catch(() => {
        viewsValue.textContent = '—'
      })
  })

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
