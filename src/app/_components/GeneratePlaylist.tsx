"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export function GeneratePlaylist() {
  const queryClient = useQueryClient();
  const [prompt, setPrompt] = useState("");
  const [songs, setSongs] = useState<{ title: string, artist: string }[]>()
  const [loading, setLoading] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [namePlayList, setNamePlayList] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function handleGenerate() {
    if (loading) return
    setLoading(true)
    setError(null)
    setSongs(undefined)
    try {
      const res = await fetch('/api/generatePlaylist', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput: prompt })
      })
      if (!res.ok) throw new Error("Error al generar la playlist")
      const data = await res.json()
      setNamePlayList(data.result.playlist.title)
      setSongs(data.result.playlist.songs)
    } catch {
      setError("No se pudo generar la playlist. Intentá de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  async function handleConfirm() {
    if (!songs) return
    setConfirming(true)
    setError(null)
    try {
      const spotifyRes = await Promise.all(
        songs.map(async (song) => {
          try {
            const response = await fetch('/api/spotify/search-track', {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ song })
            });
            return response.json();
          } catch {
            return null
          }
        })
      )
      const trackIds = spotifyRes
        .filter((track) => track != null)
        .map((track) => track.trackId)
        .filter((id) => id != null)

      const res = await fetch('/api/spotify/create-playList', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: namePlayList, trackIds, prompt, songs })
      })

      if (!res.ok) throw new Error("Error creando playlist")

      await queryClient.invalidateQueries({ queryKey: ["playlists"] })
      setSongs(undefined)
      setNamePlayList('')
      setPrompt('')
    } catch {
      setError("No se pudo crear la playlist. Intentá de nuevo.")
    } finally {
      setConfirming(false)
    }
  }

  return (

    <div className="w-full max-w-6xl mx-auto px-6 py-4">
      <div className="border border-violet-500/20 shadow-[0_0_20px_2px_rgba(139,92,246,0.12)] rounded-2xl p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-violet-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
            </svg>
          </div>
          <div>
            <h2 className="text-base font-bold  leading-tight">Generador de Playlists</h2>
            <p className="text-xl text-violet-300/70">Describe lo que querés y la IA crea tu playlist perfecta</p>
          </div>
        </div>

        {/* Input + Button */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ej: música para estudiar de noche con lluvia..."
              className="w-full bg-white/5 border border-violet-500/20 rounded-xl px-4 py-3 text-sm  placeholder-violet-300/40 focus:outline-none focus:border-violet-500/60 focus:shadow-[0_0_12px_1px_rgba(139,92,246,0.2)] transition-all duration-200"
            />
          </div>
          <button
            disabled={!prompt.trim() || loading}
            onClick={handleGenerate}
            className="px-5 py-3 rounded-xl font-bold text-sm tracking-wide bg-gradient-to-r from-purple-600 to-violet-500 text-white shadow-lg shadow-purple-500/30 hover:scale-105 hover:shadow-purple-400/50 active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 whitespace-nowrap"
          >
            {loading ? "Generando..." : "Generar ✦"}
          </button>
        </div>

        {error && (
          <p className="mt-3 text-sm text-red-400/80">{error}</p>
        )}

        {loading && (
          <div className="mt-4 border border-violet-500/20 shadow-[0_0_20px_2px_rgba(139,92,246,0.12)] rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-violet-500/20 flex items-center gap-2">
              <div className="h-3 w-24 bg-violet-500/20 rounded animate-pulse" />
              <div className="ml-auto h-3 w-16 bg-violet-500/10 rounded animate-pulse" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-violet-500/20">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-5 py-3 border-b border-violet-500/10">
                  <div className="w-5 h-3 bg-violet-500/10 rounded animate-pulse shrink-0" />
                  <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                    <div className="h-3 bg-violet-500/20 rounded animate-pulse w-3/4" />
                    <div className="h-2.5 bg-violet-500/10 rounded animate-pulse w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && songs && (
          <div className="mt-4 border border-violet-500/20 shadow-[0_0_20px_2px_rgba(139,92,246,0.12)] rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-violet-500/20 flex items-center gap-2">
              <span className="text-sm font-semibold text-violet-300">Tu playlist</span>
              <span className="ml-auto text-xs text-violet-400/60">{songs.length} canciones</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-violet-500/20">
              {songs.map((song, i) => (
                <div key={i} className="flex items-center gap-4 px-5 py-3 transition-colors duration-150 border-b border-violet-500/10">
                  <span className="text-xs text-violet-400/50 w-5 text-right shrink-0">{i + 1}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{song.title}</p>
                    <p className="text-xs text-violet-300/60 truncate">{song.artist}</p>
                  </div>
                </div>
              ))}

            </div>
            <div className="flex gap-3 px-5 py-4 border-t border-violet-500/20">
              <button onClick={handleConfirm} disabled={confirming}
                className="flex-1 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-purple-600 to-violet-500 text-white shadow-lg shadow-purple-500/30 hover:scale-105 hover:shadow-purple-400/50 active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100">
                {confirming ? "Confirmando..." : "Confirmar Playlist"}
              </button>
              <button onClick={handleGenerate} disabled={loading}
                className="px-5 py-2.5 rounded-xl font-semibold text-sm border border-violet-500/30 text-violet-300 hover:bg-violet-500/10 active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed">
                {loading ? "Generando..." : "Regenerar"}
              </button>
            </div>

          </div>
        )}
      </div>


    </div>
  );
}
