"use client";
import { useState } from "react";
import { usePlaylist, usePlaylistTracksById } from "@/src/hooks/useTopArtists";

export function Playlist() {
    const [selectedPlaylistId, setSelectedPlaylistId] = useState<string>("");

    const { data: playlist, loading, error } = usePlaylist();
    const { data: tracks, refetch } = usePlaylistTracksById({ playlistId: selectedPlaylistId, isEnabled: false });

    const fetchTracks = async (playlistId: string) => {
        setSelectedPlaylistId(playlistId);
        refetch();
    }

    if (loading) return <p>Cargando playlist...</p>;
    if (error) return <p>{error}</p>;
    return (
        <div>
            <h2>Mis Playlists</h2>
            <ul>
                {playlist.map((playlist) => (
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