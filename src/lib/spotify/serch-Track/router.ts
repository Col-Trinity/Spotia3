
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
export async function fetchTrack(token: string, info: { title: string, artist: string }) {
    console.log(info)
    const q = encodeURIComponent(`track:${info.title} artist:${info.artist}`);
    const url = `${SPOTIFY_API}/search?q=${q}&type=track&limit=1`;
    const data = await fetchWithToken(url, token)
    return data.tracks.items[0]?.id ?? null;

}