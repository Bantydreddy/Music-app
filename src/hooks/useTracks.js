import { useEffect, useState } from 'react'
import { fetchTracks } from '../api/music'

// Fetches tracks whenever the query changes. Pass null to wait (nothing is fetched).
export function useTracks(query) {
  const [state, setState] = useState({ tracks: [], loading: Boolean(query), error: null })
  const key = JSON.stringify(query)

  useEffect(() => {
    if (!query) return
    const controller = new AbortController()
    const stale = () => controller.signal.aborted
    setState((s) => ({ ...s, loading: true, error: null }))

    fetchTracks(query, controller.signal)
      .then((tracks) => !stale() && setState({ tracks, loading: false, error: null }))
      .catch((err) => !stale() && setState({ tracks: [], loading: false, error: err.message }))

    return () => controller.abort()
  }, [key]) // eslint-disable-line react-hooks/exhaustive-deps

  return state
}
