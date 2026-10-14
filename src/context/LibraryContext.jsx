import { createContext, useContext } from 'react'
import { usePersistentState } from '../hooks/usePersistentState'

const LibraryContext = createContext(null)
export const useLibrary = () => useContext(LibraryContext)

// Liked songs, saved in the browser.
export function LibraryProvider({ children }) {
  const [liked, setLiked] = usePersistentState('song@:liked', [])
  const isLiked = (id) => liked.some((t) => t.id === id)
  const toggle = (track) =>
    setLiked((list) => (list.some((t) => t.id === track.id) ? list.filter((t) => t.id !== track.id) : [track, ...list]))

  return <LibraryContext.Provider value={{ liked, isLiked, toggle }}>{children}</LibraryContext.Provider>
}
