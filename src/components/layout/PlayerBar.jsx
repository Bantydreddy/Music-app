import { usePlayer, usePlayerTime } from '../../context/PlayerContext'
import { useLibrary } from '../../context/LibraryContext'
import { fmt } from '../../utils'

export default function PlayerBar({ queueOpen, onToggleQueue }) {
  const p = usePlayer()
  const time = usePlayerTime()
  const { isLiked, toggle } = useLibrary()
  const { track, playing } = p
  const off = !track
  const pct = time.total ? (time.current / time.total) * 100 : 0

  return (
    <div className="playerbar" role="region" aria-label="Player">
      <input
        className="seek" type="range" min="0" max={time.total || 0} step="0.1" value={time.current}
        style={{ '--pct': `${pct}%` }} aria-label="Seek" disabled={off} onChange={(e) => p.seek(Number(e.target.value))}
      />

      <div className="pb-left">
        <button className="icon-btn hide-sm" aria-label="Previous" disabled={off} onClick={p.prev}><i className="fas fa-backward-step"></i></button>
        <button className="icon-btn big" aria-label={playing ? 'Pause' : 'Play'} disabled={off} onClick={p.toggle}><i className={`fas ${playing ? 'fa-pause' : 'fa-play'}`}></i></button>
        <button className="icon-btn hide-sm" aria-label="Next" disabled={off} onClick={p.next}><i className="fas fa-forward-step"></i></button>
        <span className="muted time hide-sm">{fmt(time.current)} / {fmt(time.total)}</span>
      </div>

      <div className="pb-center">
        {track ? (
          <>
            <img src={track.cover} alt="" width="48" height="48" />
            <div className="info"><strong>{track.title}</strong><small>{p.error || track.artist}</small></div>
            <button className={'icon-btn like' + (isLiked(track.id) ? ' on' : '')} aria-label="Like" aria-pressed={isLiked(track.id)} onClick={() => toggle(track)}>
              <i className={`${isLiked(track.id) ? 'fas' : 'far'} fa-heart`}></i>
            </button>
          </>
        ) : (
          <span className="muted">Pick a song to start listening</span>
        )}
      </div>

      <div className="pb-right hide-sm">
        <input className="vol" type="range" min="0" max="1" step="0.01" value={p.volume} aria-label="Volume" onChange={(e) => p.setVolume(Number(e.target.value))} />
        <button className={'icon-btn' + (p.repeat !== 'off' ? ' on' : '')} aria-label={`Repeat: ${p.repeat}`} onClick={p.cycleRepeat}>
          <i className="fas fa-repeat"></i>{p.repeat === 'one' && <sup>1</sup>}
        </button>
        <button className={'icon-btn' + (p.shuffle ? ' on' : '')} aria-label="Shuffle" aria-pressed={p.shuffle} onClick={p.toggleShuffle}><i className="fas fa-shuffle"></i></button>
        <button className={'icon-btn' + (queueOpen ? ' on' : '')} aria-label="Up next" aria-pressed={queueOpen} onClick={onToggleQueue}><i className="fas fa-list"></i></button>
      </div>
    </div>
  )
}
