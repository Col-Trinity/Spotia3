"use client";
import { useState } from "react";
import { PlaylistItem } from "@/src/types/playList";
import { Track } from "@/src/types/track";
import { useRedirectOn401 } from "@/src/hooks/useRedirectOn401i";
import { useFetchQuery } from "@/src/hooks/useFetchQuery";
import { Iframe } from "@/src/app/_components/Iframe";
import { HiPlay, HiSparkles, HiXMark } from "react-icons/hi2";


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

            {}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <HiSparkles className="text-purple-500" size={28} />
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                        Tus Playlists
                    </h2>
                </div>
            </div>

            
            <div className="relative flex items-center">

                {/* Flecha izquierda */}
                <button
                    onClick={() => {
                        document.getElementById("carousel")?.scrollBy({ left: -400, behavior: "smooth" });
                    }}
                    className="absolute -left-6 z-10
          w-10 h-40 rounded-full
          bg-white/5 backdrop-blur-sm
          border border-white/10
          text-black/40 text-2xl
          flex items-center justify-center
          hover:bg-purple-500/30 hover:border-purple-400/50 hover:text-white
          active:scale-95 transition-all duration-200 shadow-lg"
                >
                    ‹
                </button>

                <div
                    id="carousel"
                    className="flex gap-4 overflow-x-auto scroll-smooth pb-2 w-full
          scrollbar-hide snap-x snap-mandatory px-2"
                >
                    {playList.map((pl) => (
                        <div
                            key={pl.id}
                            onClick={() => {
                                setSelectedPlaylistId(pl.id);
                                refetchTracks();
                            }}
                            className={`
              group relative flex-shrink-0 cursor-pointer
              w-full
              snap-center
              bg-gradient-to-br from-[#1A1A2E] to-[#0A0A0F]
              rounded-2xl overflow-hidden
              border transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl
              ${selectedPlaylistId === pl.id
                                    ? "border-purple-500 shadow-lg shadow-purple-500/40"
                                    : "border-purple-500/20 hover:border-purple-500/50"
                                }
            `}
                        >
                            {/* Imagen */}
                            <div className="relative aspect-square overflow-hidden">
                                <div className="w-full h-full bg-gradient-to-br from-purple-600/80 to-violet-900 flex items-center justify-center">
                                    <HiSparkles className="text-white/60" size={80} />
                                </div>

                                {/* Overlay hover */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        <div className="bg-purple-500 rounded-full p-4 shadow-lg">
                                            <HiPlay className="text-white" size={32} />
                                        </div>
                                    </div>
                                </div>

                                {selectedPlaylistId === pl.id && (
                                    <div className="absolute top-3 right-3 bg-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                        Activa
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="p-4">
                                <h3 className="font-semibold text-white mb-1 line-clamp-1">
                                    {pl.name}
                                </h3>
                                <p className="text-sm text-[#888899] line-clamp-2">
                                    {pl.description || `${pl.tracksTotal || 0} canciones`}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Flecha derecha */}
                <button
                    onClick={() => {
                        document.getElementById("carousel")?.scrollBy({ left: 400, behavior: "smooth" });
                    }}
                    className="absolute -right-6 z-10
          w-10 h-40 rounded-full
          bg-white/5 backdrop-blur-sm
          border border-white/10
          text-black/40 text-2xl
          flex items-center justify-center
          hover:bg-purple-500/30 hover:border-purple-400/50 hover:text-white
          active:scale-95 transition-all duration-200 shadow-lg"
                >
                    ›
                </button>
            </div>

            {/* Player */}
            {selectedPlaylistId && (
                
                <div className="mt-8">
                    {isLoadingTracks && (
                        <div className="flex items-center justify-center py-12">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                                <p className="text-[#888899]">Cargando canciones...</p>
                            </div>
                        </div>
                    )}

                    {isErrorTracks && (
                        <div className="bg-red-950/40 border border-red-500/30 rounded-xl p-4">
                            <p className="text-red-400">{(errorTracks as Error).message}</p>
                        </div>
                    )}

                    {!isLoadingTracks && !isErrorTracks && (
                        <div className="relative rounded-xl overflow-hidden shadow-2xl">
                            <button
                                onClick={() => setSelectedPlaylistId('')}
                                className="absolute top-3 right-3 z-10 p-1.5 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 text-white/60 hover:bg-white/10 hover:text-white transition-all duration-200"
                            >
                                <HiXMark size={20} />
                            </button>
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