"use client";
import { Artist } from "@/src/types/spotify";
import { useState, useEffect } from "react";

export function TopArtist() {
    const [artists, setArtist] = useState<Artist[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchTopArtists() {
            try {
                const res = await fetch("/api/spotify/top-artists?limit=10&time_range=short_term")
                if (!res.ok) {
                    throw new Error(`Error fetching top artists: ${res.statusText}`);
                }

                const data = await res.json();
                setArtist(data.items);
                console.log("Top Artists:", data.items);
            } catch (error) {
                setError(`No se pudieron cargar los artistas ${error}`);
            } finally {
                setLoading(false);
            }
        }

        fetchTopArtists();
    }, [])

    if (loading) return <p>Cargando artistas...</p>;
    if (error) return <p>{error}</p>;
    return (
        <>
       {artists.map((artista) => (
        <div
          key={artista.id}
          className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
        >
          <h3 className="text-lg font-semibold">{artista.name}</h3>
          <p className="text-sm text-gray-600">
            {artista.genres.join(", ")}
          </p>
          <a
            href={artista.external_urls.spotify}
            target="_blank"
            className="text-blue-500 mt-2"
          >
            Ver en Spotify
          </a>
        </div>
      ))}
        </>
        
       
    );
}
