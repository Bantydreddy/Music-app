import { useTracks } from '../hooks/useTracks'
import { usePlayer } from '../context/PlayerContext'
import SongRow from './ui/SongRow'
import VirtualList from './ui/VirtualList'
import Status from './ui/Status'

// A full-page, virtualised list of songs for any search term.
export default function TrackList({ search, title, limit = 100 }) {
  const { tracks, loading, error } = useTracks({ search, limit })
  const { play } = usePlayer()
  return (
    <div className="page">
      <h2 className="page-title">{title}</h2>
      <Status loading={loading} error={error} empty={!loading && !error && tracks.length === 0} />
      <VirtualList className="vlist" items={tracks} rowHeight={56} renderRow={(t, i) => <SongRow wide track={t} onPlay={() => play(tracks, i)} />} />
    </div>
  )
}
