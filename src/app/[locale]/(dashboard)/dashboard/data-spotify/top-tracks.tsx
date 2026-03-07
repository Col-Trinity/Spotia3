"use client";

import { TrackCard } from "@/src/app/_components/trackCard";
import { Track } from "@/src/types/track";

import { useRedirectOn401 } from "@/src/hooks/useRedirectOn401i";
import { useFetchQuery } from "@/src/hooks/useFetchQuery";


type TopTracksResponse = {
    items: Track[];
};

type TypeTimeRange = {
    timeRange: string;
}
export function TopTracks({ timeRange }: TypeTimeRange) {
    const { data: tracksList = [], isLoading, isError, error, refetch } = useFetchQuery<TopTracksResponse, Track[]>(
        `top-tracks-${timeRange}`,
        `/api/spotify/top-tracks?limit=10&time_range=${timeRange}`,
        {
            select: (data) => data.items,
        }

    );

    useRedirectOn401({ isError, error });

    if (isError) {
        const err = error as Error;
        if (err.message.includes("401")) {
            return (
                <p className="text-rose-500 text-sm font-medium">No autorizado: tu sesión expiró o no tienes permisos. Redirigiendo...</p>
            );

        }
        return (
            <div className="rounded-2xl bg-rose-50 border border-rose-200 p-6 text-center">
                <p className="text-rose-600 mb-4">{(error as Error).message}</p>
                <button
                    onClick={() => refetch()}
                    className="px-5 py-2 rounded-full bg-gradient-to-r from-violet-500 to-rose-500 text-white text-sm font-medium hover:opacity-90 transition"
                >
                    Reintentar
                </button>
            </div>
        )
    }
    if (isLoading) return (
        <div className="flex flex-col gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-4 py-3 rounded-xl bg-violet-50 animate-pulse">
                    <div className="flex-1 space-y-2">
                        <div className="h-3.5 rounded-full bg-violet-200 w-2/3" />
                        <div className="h-2.5 rounded-full bg-rose-100 w-1/3" />
                    </div>
                    <div className="h-2.5 w-10 rounded-full bg-purple-200" />
                </div>
            ))}
        </div>
    );

    return (
        <div className="flex flex-col gap-1">
            {tracksList.map((track: Track) => (
                <TrackCard key={track.id} track={track} />
            ))}
        </div>

    );
}