import { useRef } from 'react'

// A titled, horizontally scrolling row with arrow buttons. Works with any children.
export default function Shelf({ title, variant = 'cards', children }) {
  const ref = useRef(null)
  const scroll = (dir) => ref.current.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: 'smooth' })
  return (
    <section className="shelf">
      <div className="shelf-head">
        <h2>{title}</h2>
        <div className="arrows">
          <button aria-label="Scroll left" onClick={() => scroll(-1)}><i className="fas fa-chevron-left"></i></button>
          <button aria-label="Scroll right" onClick={() => scroll(1)}><i className="fas fa-chevron-right"></i></button>
        </div>
      </div>
      <div ref={ref} className={`track ${variant}`}>{children}</div>
    </section>
  )
}
