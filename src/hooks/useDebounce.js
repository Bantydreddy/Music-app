import { useEffect, useState } from 'react'

// Returns `value` only after it has stopped changing for `ms` milliseconds.
export function useDebounce(value, ms = 400) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), ms)
    return () => clearTimeout(id)
  }, [value, ms])
  return debounced
}
