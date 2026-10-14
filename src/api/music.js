// All talking to the music API happens in this one file.
// iTunes Search API: free, no key needed. It returns 30-second previews.
const BASE = 'https://itunes.apple.com/search'

// Backup route: if the browser blocks the normal request, load the data with a <script> tag (JSONP).
function jsonp(url) {
  return new Promise((resolve, reject) => {
    const name = 'itunes_cb_' + Math.random().toString(36).slice(2)
    const script = document.createElement('script')
    const cleanup = () => { delete window[name]; script.remove() }
    window[name] = (data) => { cleanup(); resolve(data) }
    script.onerror = () => { cleanup(); reject(new Error('Could not reach the music service')) }
    script.src = `${url}&callback=${name}`
    document.head.append(script)
  })
}

async function getJson(url, signal) {
  try {
    const res = await fetch(url, { signal })
    if (!res.ok) throw new Error(`Request failed (${res.status})`)
    return await res.json()
  } catch (err) {
    if (err.name === 'AbortError') throw err
    return jsonp(url)
  }
}

export async function fetchTracks({ search, limit = 18 }, signal) {
  const params = new URLSearchParams({ term: search, media: 'music', entity: 'song', limit })
  const data = await getJson(`${BASE}?${params}`, signal)

  // Convert Apple's field names into the shape our components use
  return data.results
    .filter((t) => t.previewUrl)
    .map((t) => ({
      id: t.trackId,
      title: t.trackName,
      artist: t.artistName,
      cover: t.artworkUrl100.replace('100x100', '300x300'),
      audio: t.previewUrl,
      album: t.collectionName,
      duration: 30, // previews are 30 seconds long
    }))
}
