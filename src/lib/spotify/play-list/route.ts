const SPOTIFY_API = "https://api.spotify.com/v1";

async function fetchWithToken(url: string, token: string) {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      cache: 'no-store'
    }
  });
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Error fetching ${url}: ${res.status} : ${text}`);
  }

  return res.json();
}

export async function getPlayList(token: string,
  limite: number = 10) {

  const url = `${SPOTIFY_API}/me/playlists?limit=${limite}`;
  return fetchWithToken(url, token);

}

export async function createPlaylist(token: string, spotifyUserId: string, name: string) {
  const res = await fetch(`${SPOTIFY_API}/users/${spotifyUserId}/playlists`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      public: false
    })
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Error creando playlist: ${res.status} : ${text}`)
  }

  return res.json() // devuelve la playlist con su id
}

export async function addTracksToPlaylist(token: string, playlistId: string, trackIds: string[]) {
  const uris = trackIds.map(id => `spotify:track:${id}`) //  Spotify necesita este formato
  const res = await fetch(`${SPOTIFY_API}/playlists/${playlistId}/tracks`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ uris })
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Error agregando canciones: ${res.status} : ${text}`)
  }

  return res.json()
}