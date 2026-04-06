"use client";

import { useFetchQuery } from "@/src/hooks/useFetchQuery";

type Playlist = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  spotifyPlaylistId: string | null;
};

export function HistorialPlaylists() {
  const { data, isLoading, isError } = useFetchQuery<{ playlists: Playlist[] }>(
    "historial-playlists",
    "/api/historial",
  );

  if (isLoading)
    return <p className="text-violet-400 text-sm px-4">Cargando...</p>;
  if (isError)
    return (
      <p className="text-red-400 text-sm px-4">Error al cargar el historial</p>
    );

  if (!data?.playlists.length)
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-2">
        <p className="text-violet-400 font-medium">
          No tienes playlists guardadas
        </p>
        <p className="text-xs text-violet-400/50">
          Genera una playlist y aparecerá aquí
        </p>
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full py-2">
      {data?.playlists.map((playlist) => (
        <div
          key={playlist.id}
          className="border border-violet-300/50 rounded-xl p-4 bg-violet-50/10 backdrop-blur-sm"
        >
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-sm font-bold text-violet-900 dark:text-white leading-tight">
              {playlist.title}
            </h3>
            <span className="text-xs text-violet-700 dark:text-violet-300 shrink-0">
              {new Date(playlist.createdAt).toLocaleDateString()}
            </span>
          </div>

          {playlist.description && (
            <div className="max-h-20 overflow-y-auto pr-1 mb-3 scrollbar-thin">
              <p className="text-xs text-violet-800 dark:text-gray-300 leading-relaxed">
                {playlist.description}
              </p>
            </div>
          )}

          {playlist.spotifyPlaylistId && (
            <div className="-mx-4 -mb-4 rounded-b-xl overflow-hidden">
              <iframe
                src={`https://open.spotify.com/embed/playlist/${playlist.spotifyPlaylistId}?theme=0`}
                width="100%"
                height="172"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
