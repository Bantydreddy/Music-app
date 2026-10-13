import { useEffect, useState } from 'react'

// Like useState, but the value survives a page refresh (saved in localStorage).
export function usePersistentState(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw === null ? initial : JSON.parse(raw)
    } catch {
      return initial
    }
  })
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* storage blocked or full */ }
  }, [key, value])
  return [value, setValue]
}
