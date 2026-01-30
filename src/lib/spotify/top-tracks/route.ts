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


export function getTopTracks(token: string,
    limite: number = 5,
    rangoTiempo: "short_term" | "medium_term" | "long_term" = "medium_term") {

    const url = `${SPOTIFY_API}/me/top/tracks?limit=${limite}&time_range=${rangoTiempo}`;
    return fetchWithToken(url, token);
}