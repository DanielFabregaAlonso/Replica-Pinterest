const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY
const BASE_URL = 'https://api.unsplash.com'
const PER_PAGE = 24

async function request(path, params = {}) {
  const url = new URL(`${BASE_URL}${path}`)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value)
    }
  })

  const response = await fetch(url, {
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    },
  })

  if (!response.ok) {
    throw new Error(`Unsplash API error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export function searchPhotos(query, page = 1) {
  return request('/search/photos', {
    query,
    page,
    per_page: PER_PAGE,
    orientation: 'portrait',
  })
}

export function listPhotos(page = 1) {
  return request('/photos', {
    page,
    per_page: PER_PAGE,
    order_by: 'popular',
  })
}
