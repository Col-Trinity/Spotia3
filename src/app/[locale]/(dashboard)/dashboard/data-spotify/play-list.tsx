"use client";
import { useState, useEffect } from "react";
import { PlaylistItem } from "@/src/types/playList";
import { Track } from "@/src/types/track";
import  Loading  from "@/src/app/_components/loading";


export function Playlist() {
    const [playList, setPlayList] = useState<PlaylistItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [tracks, setTracks] = useState<Track[]>([]);

    useEffect(() => {
        async function fetchPlayList() {
            try {
                const res = await fetch("/api/spotify/play-list?limit=5");
                if (!res.ok) throw new Error(`Error fetching play list: ${res.statusText}`);
                const data = await res.json();

                setPlayList(data);
            } catch (err) {
                setError(`No se pudieron cargar las canciones: ${err}`);
            } finally {
                setLoading(false);
            }
        }
        fetchPlayList();
    }, []);

    const fetchTracks = async (playlistId: string) => {
        const res = await fetch(`/api/spotify/play-list/${playlistId}/tracks`);
        if (!res.ok) {
            setError(`Error fetching tracks: ${res.statusText}`);
            return;
        }
        const data = await res.json();
        setTracks(data);
       
    }

    if (loading) return <Loading/>;
    if (error) return <p>{error}</p>;
    return (
        <div>
            <h2>Mis Playlists</h2>
            <ul>
                {playList.map((playlist) => (
                    <li key={playlist.id}>
                        {playlist.name}
                        <button
                            onClick={() => fetchTracks(playlist.id)}
                            className="border-r-green-400 border m-3">
                            Ver canciones
                        </button>
                    </li>
                ))}
            </ul>


            {tracks.length > 0 && (
                <div>
                    <h3>Canciones de la Playlist</h3>
                    <ul>
                        {tracks.map((track) => (
                            <li key={track.id}>
                                {track.name} — {track.artists.map((a) => a.name).join(", ")}
                            </li>
                        ))}
                    </ul>
                </div>
            )
            }

        </div>


    );
}