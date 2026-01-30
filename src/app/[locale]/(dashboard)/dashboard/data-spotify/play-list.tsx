"use client";
import { useState, useEffect } from "react";


export function Playlist() {
    const [playList, setPlayList] = useState<[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPlayList() {
            try {
                const res = await fetch("/api/spotify/play-list?limit=5");
                if (!res.ok) throw new Error(`Error fetching play list: ${res.statusText}`);
                const data = await res.json();
                console.log("Play List Data:", data.items.id);
                setPlayList(data.items);
            } catch (err) {
                setError(`No se pudieron cargar las canciones: ${err}`);
            } finally {
                setLoading(false);
            }
        }
        fetchPlayList();
    }, []);
    console.log(playList);
    if (loading) return <p>Cargando playlist...</p>;
    if (error) return <p>{error}</p>;
    return (
        <div className="max-w-3xl mx-auto flex flex-col gap-1">
            <h2 className="text-2xl font-bold mb-2 mt-4 flex justify-center items-center">Canciones que más te representan en este período</h2>
            
        </div>

    );
}