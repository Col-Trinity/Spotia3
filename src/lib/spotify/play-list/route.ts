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