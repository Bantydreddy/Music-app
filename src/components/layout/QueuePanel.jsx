import { usePlayer } from '../../context/PlayerContext'
import SongRow from '../ui/SongRow'
import VirtualList from '../ui/VirtualList'

export default function QueuePanel({ onResize, onClose }) {
  const { queue, index, jump } = usePlayer()
  return (
    <aside className="queue" aria-label="Up next">
      <div className="resizer" role="separator" aria-orientation="vertical" aria-label="Resize queue" onPointerDown={onResize} />
      <div className="queue-head">
        <h2>Up next</h2>
        <button className="icon-btn" aria-label="Close queue" onClick={onClose}><i className="fas fa-xmark"></i></button>
      </div>
      {queue.length === 0 ? (
        <p className="muted pad">Your queue is empty. Play a song to fill it.</p>
      ) : (
        <VirtualList className="vlist" items={queue} rowHeight={56} scrollTo={index} renderRow={(t, i) => <SongRow track={t} onPlay={() => jump(i)} />} />
      )}
    </aside>
  )
}
