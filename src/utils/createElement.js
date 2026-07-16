export function createElement(tag, attrs = {}, children = []) {
  const node = document.createElement(tag)

  Object.entries(attrs).forEach(([key, value]) => {
    if (key === 'class') {
      node.className = value
    } else if (key === 'text') {
      node.textContent = value
    } else if (key.startsWith('on') && typeof value === 'function') {
      node.addEventListener(key.slice(2).toLowerCase(), value)
    } else {
      node.setAttribute(key, value)
    }
  })

  children.forEach((child) => node.appendChild(child))

  return node
}
