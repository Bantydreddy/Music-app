import { usePersistentState } from './usePersistentState'

// Width of a panel on the right edge that the user can drag. The size is remembered.
export function useResizable(key, initial, min, max) {
  const [width, setWidth] = usePersistentState(key, initial)

  const startDrag = (e) => {
    e.preventDefault()
    const startX = e.clientX
    const startWidth = width
    const move = (ev) => setWidth(Math.min(max, Math.max(min, startWidth - (ev.clientX - startX))))
    const stop = () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', stop)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', stop)
  }

  return [width, startDrag]
}
