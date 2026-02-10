"use client";
import { useState, useEffect } from "react";
import { Artist } from "@/src/types/spotify";
type TypeTimeRange = {
  timeRange: string;
};
export function useTopArtists(
  { timeRange = "short_term" }: TypeTimeRange = { timeRange: "short_term" },
) {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    async function fetchTopArtists() {
      try {
        const res = await fetch(
          `/api/spotify/top-artists?limit=10&time_range=${timeRange}`,
        );
        if (!res.ok)
          throw new Error(`Error fetching top artists: ${res.statusText}`);
        const data = await res.json();
        setArtists(data.items);
      } catch (err) {
        setError(`No se pudieron cargar los artistas: ${err}`);
      } finally {
        setLoading(false);
      }
    }
    fetchTopArtists();
  }, [timeRange]);

  return { artists, loading, error };
}
