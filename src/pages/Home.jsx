import { useTracks } from '../hooks/useTracks'
import { useInView } from '../hooks/useInView'
import { usePlayer } from '../context/PlayerContext'
import { MOODS, SHELVES } from '../config'
import { chunk } from '../utils'
import Chips from '../components/ui/Chips'
import Shelf from '../components/ui/Shelf'
import SongCard from '../components/ui/SongCard'
import SongRow from '../components/ui/SongRow'
import Status from '../components/ui/Status'

// Each shelf fetches its own songs, and only once it scrolls near the screen.
function HomeShelf({ shelf }) {
  const [ref, seen] = useInView()
  const { tracks, loading, error } = useTracks(seen ? { search: shelf.search, limit: shelf.limit } : null)
  const { play } = usePlayer()

  return (
    <div ref={ref} className="shelf-wrap">
      <Shelf title={shelf.title} variant={shelf.variant}>
        {shelf.variant === 'rows'
          ? chunk(tracks, 4).map((group, g) => (
              <div key={g} className="col">
                {group.map((t, j) => <SongRow key={t.id} track={t} onPlay={() => play(tracks, g * 4 + j)} />)}
              </div>
            ))
          : tracks.map((t, i) => <SongCard key={t.id} track={t} onPlay={() => play(tracks, i)} />)}
      </Shelf>
      <Status loading={loading} error={error} />
    </div>
  )
}

export default function Home({ onSearch }) {
  return (
    <div className="home">
      <Chips items={MOODS} onSelect={onSearch} />
      {SHELVES.map((s) => <HomeShelf key={s.id} shelf={s} />)}
    </div>
  )
}
