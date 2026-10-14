import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { usePersistentState } from '../hooks/usePersistentState'

const PlayerContext = createContext(null)
const TimeContext = createContext({ current: 0, total: 0 })
export const usePlayer = () => useContext(PlayerContext)
export const usePlayerTime = () => useContext(TimeContext)

// Playback time changes 4 times a second, so it lives in its own context.
// Only the progress bar listens to it; song rows and cards do not re-render.
function TimeProvider({ audioRef, children }) {
  const [time, setTime] = useState({ current: 0, total: 0 })
  useEffect(() => {
    const a = audioRef.current
    const update = () => setTime({ current: a.currentTime, total: a.duration || 0 })
    a.addEventListener('timeupdate', update)
    a.addEventListener('loadedmetadata', update)
    return () => {
      a.removeEventListener('timeupdate', update)
      a.removeEventListener('loadedmetadata', update)
    }
  }, [audioRef])
  return <TimeContext.Provider value={time}>{children}</TimeContext.Provider>
}

export function PlayerProvider({ children }) {
  const audioRef = useRef(null)
  const [queue, setQueue] = useState([])
  const [index, setIndex] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const [error, setError] = useState('')
  const [volume, setVolume] = usePersistentState('song@:volume', 0.8)
  const [shuffle, setShuffle] = usePersistentState('song@:shuffle', false)
  const [repeat, setRepeat] = usePersistentState('song@:repeat', 'off') // off | all | one
  const track = queue[index] ?? null

  useEffect(() => { audioRef.current.volume = volume }, [volume])

  // Load and play whenever the current track changes
  useEffect(() => {
    if (!track) return
    const a = audioRef.current
    setError('')
    a.src = track.audio
    a.play().catch((err) => {
      if (err.name === 'AbortError') return
      console.error('Playback failed:', err)
      const canAac = a.canPlayType('audio/mp4; codecs="mp4a.40.2"') !== ''
      setError(canAac ? `Could not play this preview (${err.name}).` : "This browser can't play this audio format. Try Chrome or Edge.")
    })
  }, [track?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = () => {
    const a = audioRef.current
    if (a.paused) a.play().catch(() => setError('Could not resume playback.'))
    else a.pause()
  }

  const play = (list, i) => {
    if (track && list[i].id === track.id) return toggle()
    setQueue(list)
    setIndex(i)
  }

  const jump = (i) => (i === index ? toggle() : setIndex(i))

  // auto = the song ended by itself (repeat and shuffle rules apply)
  const advance = (auto) => {
    const a = audioRef.current
    const replay = () => { a.currentTime = 0; a.play().catch(() => {}) }
    if (auto && repeat === 'one') return replay()
    if (queue.length < 2) return auto && repeat === 'off' ? undefined : replay()
    if (shuffle) {
      let r
      do { r = Math.floor(Math.random() * queue.length) } while (r === index)
      return setIndex(r)
    }
    if (auto && repeat === 'off' && index === queue.length - 1) return
    setIndex((index + 1) % queue.length)
  }

  const prev = () => {
    if (audioRef.current.currentTime > 3 || queue.length < 2) audioRef.current.currentTime = 0
    else setIndex((index - 1 + queue.length) % queue.length)
  }

  const value = {
    track, queue, index, playing, error, volume, shuffle, repeat,
    play, jump, toggle, prev, setVolume,
    next: () => advance(false),
    seek: (s) => { audioRef.current.currentTime = s },
    toggleShuffle: () => setShuffle(!shuffle),
    cycleRepeat: () => setRepeat(repeat === 'off' ? 'all' : repeat === 'all' ? 'one' : 'off'),
  }

  return (
    <PlayerContext.Provider value={value}>
      <TimeProvider audioRef={audioRef}>{children}</TimeProvider>
      <audio
        ref={audioRef}
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => advance(true)}
        onError={() => console.error('Audio error', audioRef.current?.error)}
      />
    </PlayerContext.Provider>
  )
}
