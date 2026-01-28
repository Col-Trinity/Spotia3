"use client";
import { useState, useEffect } from "react";
import { TrackCard } from "@/src/app/_components/trackCard";
import { Track } from "@/src/types/track";

export function PlayList() {
    const [playList, setPlayList] = useState<Track[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPlayList() {
            try {
                const res = await fetch("/api/spotify/play-list?limit=10&time_range=short_term");
                if (!res.ok) throw new Error(`Error fetching play list: ${res.statusText}`);
                const data = await res.json();
                console.log("Play List Data:", data.items);
                setPlayList(data.items);
            } catch (err) {
                setError(`No se pudieron cargar los artistas: ${err}`);
            } finally {
                setLoading(false);
            }
        }
        fetchPlayList();
    }, []);

    if (loading) return <p>Cargando artistas...</p>;
    if (error) return <p>{error}</p>;
    return (
        <div>
            {playList.map((track: Track) => (
                <TrackCard key={track.id} track={track} />
            ))}

        </div>

    );
}