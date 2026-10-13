import { useEffect, useRef, useState } from 'react'

// Becomes true the first time the element scrolls near the screen. Used to load shelves lazily.
export function useInView(rootMargin = '300px') {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setSeen(true); observer.disconnect() }
    }, { rootMargin })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [rootMargin])
  return [ref, seen]
}
