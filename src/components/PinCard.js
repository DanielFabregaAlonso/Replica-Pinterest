export function createPinCard(photo) {
  const article = document.createElement('article')
  article.className = 'pin'

  const description = photo.alt_description || photo.description || 'Imagen de Unsplash'

  article.innerHTML = `
    <a class="pin-link" href="${photo.links.html}" target="_blank" rel="noopener noreferrer">
      <div class="pin-image-wrapper" style="aspect-ratio: ${photo.width} / ${photo.height}">
        <img
          class="pin-image"
          src="${photo.urls.small}"
          srcset="${photo.urls.small} 400w, ${photo.urls.regular} 1080w"
          sizes="(max-width: 600px) 50vw, 236px"
          alt="${description.replace(/"/g, '&quot;')}"
          loading="lazy"
        />
      </div>
    </a>
    <div class="pin-footer">
      <img class="pin-avatar" src="${photo.user.profile_image.medium}" alt="${photo.user.name}" loading="lazy" />
      <a class="pin-author" href="${photo.user.links.html}" target="_blank" rel="noopener noreferrer">
        ${photo.user.name}
      </a>
    </div>
  `

  return article
}
