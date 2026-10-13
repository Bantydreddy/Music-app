import { useLibrary } from '../context/LibraryContext'
import { usePlayer } from '../context/PlayerContext'
import SongRow from '../components/ui/SongRow'
import VirtualList from '../components/ui/VirtualList'

export default function Library() {
  const { liked } = useLibrary()
  const { play } = usePlayer()
  return (
    <div className="page">
      <h2 className="page-title">Liked songs</h2>
      {liked.length === 0 ? (
        <p className="muted pad">Tap the heart on any song to save it here.</p>
      ) : (
        <VirtualList className="vlist" items={liked} rowHeight={56} renderRow={(t, i) => <SongRow wide track={t} onPlay={() => play(liked, i)} />} />
      )}
    </div>
  )
}
