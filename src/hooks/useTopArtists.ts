"use client";

import { Artist } from "@/src/types/spotify";
import { useQuery } from '@tanstack/react-query';

type TypeTimeRange = {
  timeRange: string;
};
export function useTopArtists(
  { timeRange = "short_term" }: TypeTimeRange = { timeRange: "short_term" },
) {
  return useQuery({
    queryKey: ["top-artists", timeRange],
    queryFn: async () => {
      const res = await fetch(
        `/api/spotify/top-artists?limit=10&time_range=${timeRange}`,
      );
      if(!res.ok){
        throw new Error(`No pudimos cargar tus datos. Intentá de nuevo: ${res.status}`);
      }
      const data = await res.json()
      return data.items as Artist[];
    }
  })
}


