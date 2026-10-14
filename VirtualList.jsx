import { useEffect, useRef, useState } from 'react'

// Renders only the rows you can see, so 10,000 songs scroll as smoothly as 10.
export default function VirtualList({ items, rowHeight, renderRow, scrollTo = -1, overscan = 6, className }) {
  const ref = useRef(null)
  const [scrollTop, setScrollTop] = useState(0)
  const [height, setHeight] = useState(600)

  useEffect(() => {
    const el = ref.current
    const observer = new ResizeObserver(() => setHeight(el.clientHeight))
    observer.observe(el)
    setHeight(el.clientHeight)
    return () => observer.disconnect()
  }, [])

  // Keep the current song in view (used by the queue)
  useEffect(() => {
    if (scrollTo >= 0) ref.current.scrollTop = Math.max(0, (scrollTo - 2) * rowHeight)
  }, [scrollTo, rowHeight])

  const start = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan)
  const end = Math.min(items.length, Math.ceil((scrollTop + height) / rowHeight) + overscan)

  return (
    <div ref={ref} className={className} style={{ overflowY: 'auto' }} onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}>
      <div style={{ height: items.length * rowHeight, position: 'relative' }}>
        {items.slice(start, end).map((item, i) => (
          <div key={start + i} style={{ position: 'absolute', top: (start + i) * rowHeight, left: 0, right: 0, height: rowHeight }}>
            {renderRow(item, start + i)}
          </div>
        ))}
      </div>
    </div>
  )
}
