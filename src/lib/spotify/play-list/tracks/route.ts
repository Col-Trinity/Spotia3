
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

export async function getPlaylistTracks(token: string,
    id:string) {

    const url = `${SPOTIFY_API}/playlists/${id}/tracks`;

    return fetchWithToken(url, token);

}