import { useEffect } from 'react'

export default function useClickOutside(
  elementsIds: string[],
  callback: (event: MouseEvent) => void,
) {
  function handleClickOutside(event: MouseEvent) {
    let isOutside = true

    for (const elementId of elementsIds) {
      const element = document.getElementById(elementId)
      if (element && element.contains(event.target as Node)) {
        isOutside = false
        break
      }
    }

    if (isOutside) callback(event)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })
}
