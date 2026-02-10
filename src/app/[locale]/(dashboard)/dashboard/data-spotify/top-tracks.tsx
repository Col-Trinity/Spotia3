"use client";
import { useState, useEffect } from "react";
import { TrackCard } from "@/src/app/_components/trackCard";
import { Track } from "@/src/types/track";
import { Loading } from "@/src/app/_components/loading";



type TypeTimeRange = {
    timeRange: string;
}
export function TopTracks({timeRange}:TypeTimeRange) {
    const [tracksList, setTracksList] = useState<Track[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTrackList() {
            try {
                const res = await fetch(`/api/spotify/top-tracks?limit=5&time_range=${timeRange}`);
                if (!res.ok) throw new Error(`Error fetching play list: ${res.statusText}`);
                const data = await res.json();
                setTracksList(data.items);
            } catch (err) {
                setError(`No se pudieron cargar las canciones: ${err}`);
            } finally {
                setLoading(false);
            }
        }
        fetchTrackList();
    }, [timeRange]);

    if (loading) return <Loading/>;
    if (error) return <p>{error}</p>;
    return (
        <div className="max-w-3xl mx-auto flex flex-col gap-1">
            <h2 className="text-2xl font-bold mb-2 mt-4 flex justify-center items-center">Canciones que más te representan en este período</h2>
            {tracksList.map((track: Track) => (
                <TrackCard key={track.id} track={track} />
            ))}
        </div>

    );
}