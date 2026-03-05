"use client";
import { useState } from "react";
import { PlaylistItem } from "@/src/types/playList";
import { Track } from "@/src/types/track";
import { useRedirectOn401 } from "@/src/hooks/useRedirectOn401i";
import { useFetchQuery } from "@/src/hooks/useFetchQuery";
import { Iframe } from "@/src/app/_components/Iframe";
import { HiPlay, HiSparkles } from "react-icons/hi2";


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
                <div className="flex items-center justify-center p-8">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
                        <p className="text-red-800 text-center">
                            Tu sesión expiró. Redirigiendo...
                        </p>
                    </div>
                </div>
            );

        }
        return (<div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{err.message}</p>
        </div>
        );
    }
    if (isLoadingPlayList) {
        return (
            <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-linear-to-r from-purple-500 to-pink-500 animate-pulse" />
                    <div className="h-6 bg-gray-200 rounded w-48 animate-pulse" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-gray-100 rounded-lg p-4 animate-pulse">
                            <div className="w-full aspect-square bg-gray-200 rounded-md mb-4" />
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                            <div className="h-3 bg-gray-200 rounded w-1/2" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return (
        <div className="p-6 mt-4 max-w-7xl mx-auto">
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <HiSparkles className="text-purple-500" size={28} />
                    <h2 className="text-3xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Tus Playlists
                    </h2>
                </div>               
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
                {playList.map((pl) => (
                    <div
                        key={pl.id}
                        onClick={() => {
                            setSelectedPlaylistId(pl.id);
                            refetchTracks();
                        }}
                        className={`group relative bg-linear-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl ${selectedPlaylistId === pl.id
                            ? "ring-2 ring-purple-500 shadow-lg shadow-purple-500/50"
                            : ""
                            }`}
                    >

                        <div className="relative aspect-square overflow-hidden">
                            <div className="w-full h-full bg-linear-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                                <HiSparkles className="text-white" size={64} />
                            </div>


                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    <div className="bg-purple-500 rounded-full p-4 shadow-lg">
                                        <HiPlay className="text-white" size={32} />
                                    </div>
                                </div>
                            </div>

                            {selectedPlaylistId === pl.id && (
                                <div className="absolute top-3 right-3 bg-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                                    Activa
                                </div>
                            )}
                        </div>


                        <div className="p-4">
                            <h3 className="font-semibold text-white mb-1 line-clamp-1">
                                {pl.name}
                            </h3>
                            <p className="text-sm text-gray-400 line-clamp-2">
                                {pl.description || `${pl.tracksTotal || 0} canciones`}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedPlaylistId && (
                <div className="mt-8">
                    {isLoadingTracks && (
                        <div className="flex items-center justify-center py-12">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                                <p className="text-gray-600">Cargando canciones...</p>
                            </div>
                        </div>
                    )}

                    {isErrorTracks && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-red-800">{(errorTracks as Error).message}</p>
                        </div>
                    )}

                    {!isLoadingTracks && !isErrorTracks && (
                        <div className="rounded-xl overflow-hidden shadow-2xl">
                            <Iframe
                                key={selectedPlaylistId}
                                src={`spotify:playlist:${selectedPlaylistId}`}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}