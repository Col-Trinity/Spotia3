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
        "/api/spotify/play-list"
    );
    console.log(playList, 'playlists')
    const effectivePlaylistId = selectedPlaylistId || playList[0]?.id || '';

    const {
        isLoading: isLoadingTracks,
        isError: isErrorTracks,
        error: errorTracks,
        refetch: refetchTracks,
    } = useFetchQuery<Track[]>(
        `playlist-tracks-${effectivePlaylistId}`,
        effectivePlaylistId ? `/api/spotify/play-list/${effectivePlaylistId}/tracks` : '',
        { enabled: !!effectivePlaylistId }
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
            <div className="px-4 py-5">
                <div className="flex items-center gap-2 mb-5">
                    <div className="w-6 h-6 rounded-full bg-linear-to-r from-pink-400 to-violet-500 animate-pulse" />
                    <div className="h-5 bg-pink-100 rounded-full w-36 animate-pulse" />
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="shrink-0 w-32 sm:w-36 bg-pink-50 rounded-2xl p-3 animate-pulse">
                            <div className="w-full h-20 sm:h-24 bg-pink-100 rounded-xl mb-3" />
                            <div className="h-3 bg-pink-100 rounded-full w-3/4 mb-2" />
                            <div className="h-2.5 bg-pink-100 rounded-full w-1/2" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return (
        <div className="px-4 py-5 mt-2 max-w-4xl mx-auto">

            <div className="mb-5">
                <div className="flex items-center gap-2 mb-1">
                    <HiSparkles className="text-pink-400" size={22} />
                    <h2 className="text-xl font-bold bg-linear-to-r from-pink-500 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent">
                        Tus Playlists
                    </h2>
                </div>
            </div>

            <div className="relative flex items-center">

                {/* Flecha izquierda */}
                {playList.length > 3 && (
                    <button
                        onClick={() => {
                            document.getElementById("carousel")?.scrollBy({ left: -280, behavior: "smooth" });
                        }}
                        className="absolute -left-3 z-10
          w-7 h-7 rounded-full
          bg-white shadow-md border border-pink-100
          text-fuchsia-400 text-lg
          flex items-center justify-center
          hover:bg-pink-50 hover:text-fuchsia-600
          active:scale-90 transition-all duration-200"
                    >
                        ‹
                    </button>
                )}

                <div
                    id="carousel"
                    className={`flex gap-3 pb-2 w-full overflow-x-hidden ${playList.length > 3 ? "scroll-smooth snap-x snap-mandatory px-6" : ""}`}
                >
                    {playList.map((pl, index) => {
                        const gradients = [
                            "from-pink-400 to-rose-400",
                            "from-fuchsia-400 to-pink-400",
                            "from-violet-400 to-fuchsia-400",
                            "from-purple-400 to-violet-400",
                            "from-pink-300 to-violet-400",
                        ];
                        const gradient = gradients[index % gradients.length];
                        const isSelected = effectivePlaylistId === pl.id;

                        return (
                            <div
                                key={pl.id}
                                onClick={() => {
                                    setSelectedPlaylistId(pl.id);
                                    refetchTracks();
                                }}
                                className={`
                  group relative shrink-0 cursor-pointer
                  w-32 sm:w-36
                  mt-2
                  snap-center
                  bg-white rounded-2xl overflow-hidden
                  border-2 transition-all duration-300
                  hover:-translate-y-1 hover:shadow-lg
                  ${isSelected
                                        ? "border-fuchsia-400 shadow-md shadow-fuchsia-200"
                                        : "border-pink-100 hover:border-fuchsia-300 shadow-sm"
                                    }
                `}
                            >
                                {/* Área de icono */}
                                <div className={`relative h-20 sm:h-24 ${pl.imageUrl ? '' : `bg-linear-to-br ${gradient}`} flex items-center justify-center`}>
                                    {pl.imageUrl
                                        ? <img src={pl.imageUrl} alt={pl.name} className="w-full h-full object-cover" />
                                        : <HiSparkles className="text-white/70" size={32} />
                                    }

                                    {/* Overlay hover con botón play */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                                            <div className="bg-white/90 rounded-full p-2 shadow-md">
                                                <HiPlay className="text-fuchsia-500" size={18} />
                                            </div>
                                        </div>
                                    </div>

                                    {isSelected && (
                                        <div className="absolute top-2 right-2 bg-white text-fuchsia-500 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                                            ▶
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="px-3 py-2.5">
                                    <p className="font-semibold text-gray-800 text-xs leading-tight line-clamp-1 mb-0.5">
                                        {pl.name}
                                    </p>
                                    <p className="text-[10px] text-gray-400 line-clamp-1">
                                        {pl.description || `${pl.tracksTotal || 0} canciones`}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Flecha derecha */}
                {playList.length > 3 && (
                    <button
                        onClick={() => {
                            document.getElementById("carousel")?.scrollBy({ left: 280, behavior: "smooth" });
                        }}
                        className="absolute -right-3 z-10
          w-7 h-7 rounded-full
          bg-white shadow-md border border-pink-100
          text-fuchsia-400 text-lg
          flex items-center justify-center
          hover:bg-pink-50 hover:text-fuchsia-600
          active:scale-90 transition-all duration-200"
                    >
                        ›
                    </button>
                )}
            </div>

            {/* Player */}
            {effectivePlaylistId && (
                <div className="mt-5">
                    {isLoadingTracks && (
                        <div className="flex items-center justify-center py-8">
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-8 h-8 border-3 border-fuchsia-400 border-t-transparent rounded-full animate-spin" />
                                <p className="text-sm text-gray-400">Cargando canciones...</p>
                            </div>
                        </div>
                    )}

                    {isErrorTracks && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                            <p className="text-sm text-red-500">{(errorTracks as Error).message}</p>
                        </div>
                    )}

                    {!isLoadingTracks && !isErrorTracks && (
                        <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-pink-100">
                            <Iframe
                                key={effectivePlaylistId}
                                src={`spotify:playlist:${effectivePlaylistId}`}
                            />
                        </div>
                    )}
                </div>
            )}

        </div>
    );
}