"use client";
import { useState } from "react";
import { PlaylistItem } from "@/src/types/playList";
import { Track } from "@/src/types/track";
import { useRedirectOn401 } from "@/src/hooks/useRedirectOn401i";
import { useFetchQuery } from "@/src/hooks/useFetchQuery";
import { Iframe } from "@/src/app/_components/Iframe";



export function Playlist() {
    const [selectedPlaylistId, setSelectedPlaylistId] = useState<string>('');
    const {
        data: playList = [],
        isLoading: isLoadingPlayList,
        isError: isErrorPlayList,
        error: errorPlayList,
    } = useFetchQuery<PlaylistItem[]>(
        "playlists",
        "/api/spotify/play-list?limit=5"
    );


    const {
        isLoading: isLoadingTracks,
        isError: isErrorTracks,
        error: errorTracks,
        refetch: refetchTracks,
    } = useFetchQuery<Track[]>(
        `playlist-tracks-${selectedPlaylistId}`,
        selectedPlaylistId ? `/api/spotify/play-list/${selectedPlaylistId}/tracks` : '',
        { enabled: !!selectedPlaylistId }
    );


    useRedirectOn401({ isError: isErrorPlayList, error: errorPlayList });

    if (isErrorPlayList) {
        const err = errorPlayList as Error;
        if (err.message.includes("401")) {
            return (
                <p>No autorizado: tu sesión expiró o no tienes permisos. Redirigiendo...</p>
            );

        }
        return <p>{err.message}</p>;
    }
    if (isLoadingPlayList) return <p>Se estan cargando tus playlists...</p>;
    return (
        <div>
            <h2>Mis Playlists</h2>
            <ul>
                {playList.map((pl) => (
                    <li key={pl.id}>
                        {pl.name}
                        <button
                            onClick={() => {
                                setSelectedPlaylistId(pl.id);
                                refetchTracks();
                            }}
                            className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
                        >
                            Ver PlayList
                        </button>
                    </li>
                ))}
            </ul>


            {selectedPlaylistId && (
                <div>
                    {isLoadingTracks && <p>Cargando canciones de tu PlayList..</p>}
                    {isErrorTracks && <p>{(errorTracks as Error).message}</p>}

                    <Iframe key={selectedPlaylistId} src={`spotify:playlist:${selectedPlaylistId}`} />
                </div>
            )}
        </div>


    );
}