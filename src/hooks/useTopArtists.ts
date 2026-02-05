"use client";
import { useState, useCallback, useEffect } from "react";
import { ResponseService, SpotifyService } from "@/src/service";

const spotifyService = SpotifyService.instance;

type ExtractData<R> = R extends ResponseService<infer T> ? T : never;

type UseSpotifyServiceProps<F extends (...args: never[]) => Promise<ResponseService<unknown>>> = {
  callback: F;
  args: Parameters<F>;
  isEnabled?: boolean;
}

function useSpotifyService<F extends (...args: never[]) => Promise<ResponseService<unknown>>>(
  { callback, args, isEnabled = true }: UseSpotifyServiceProps<F>
) {
  type Data = ExtractData<Awaited<ReturnType<F>>>;
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refetch = useCallback(() => {
    (async () => {
      const { data, isError, error } = await callback(...args);
      setLoading(false);
      if (isError) {
        setError(error ?? "");
        return;
      }

      setData(data as Data[]);
    })();
  }, [callback, args]);

  useEffect(() => {
    if (isEnabled) {
      refetch();
    }
  }, [refetch, isEnabled]);

  return {
    data,
    loading,
    error,
    refetch,
  }
}

export function useTopArtists(limit: number = 10, timeRange: "short_term" | "medium_term" | "long_term" = "medium_term") {
  const { data, loading, error, refetch } = useSpotifyService({ callback: spotifyService.getTopArtists, args: [limit, timeRange] });

  return { data, loading, error, refetch };
}

export function usePlaylist(limit: number = 5) {
  const { data, loading, error, refetch } = useSpotifyService({ callback: spotifyService.getPlaylist, args: [limit] });

  return { data, loading, error, refetch };
}

export function usePlaylistTracksById({ playlistId, isEnabled }: { playlistId: string, isEnabled: boolean }) {
  const { data, loading, error, refetch } = useSpotifyService({ callback: spotifyService.getPlaylistTracksById, args: [playlistId], isEnabled });

  return { data, loading, error, refetch };
}
