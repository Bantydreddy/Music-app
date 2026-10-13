import { usePlayer } from '../../context/PlayerContext'
import { useLibrary } from '../../context/LibraryContext'
import { fmt } from '../../utils'

// One song. Used in shelves, search results, the queue and the library.
export default function SongRow({ track, onPlay, wide = false }) {
  const { track: current, playing } = usePlayer()
  const { isLiked, toggle } = useLibrary()
  const active = current?.id === track.id
  const liked = isLiked(track.id)

  return (
    <div
      className={'row' + (wide ? ' wide' : '') + (active ? ' active' : '')}
      role="button"
      tabIndex={0}
      onClick={onPlay}
      onKeyDown={(e) => e.key === 'Enter' && onPlay()}
    >
      <div className="thumb">
        <img src={track.cover} alt="" width="48" height="48" loading="lazy" />
        <span className="thumb-state"><i className={`fas ${active && playing ? 'fa-pause' : 'fa-play'}`}></i></span>
      </div>
      <div className="info"><strong>{track.title}</strong><small>{track.artist}</small></div>
      {wide && <span className="muted cell">{track.album}</span>}
      <span className="muted dur">{fmt(track.duration)}</span>
      <button
        className={'like' + (liked ? ' on' : '')}
        aria-label={liked ? 'Remove from liked songs' : 'Add to liked songs'}
        aria-pressed={liked}
        onClick={(e) => { e.stopPropagation(); toggle(track) }}
      >
        <i className={`${liked ? 'fas' : 'far'} fa-heart`}></i>
      </button>
    </div>
  )
}
