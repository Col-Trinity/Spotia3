"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export function GeneratePlaylist() {
  const queryClient = useQueryClient();
  const [prompt, setPrompt] = useState("");
  const [options, setOptions] = useState({
    quantity: 10,
    nationality: "Cualquiera",
    era: "Actualidad",
    userAge: "18-25",
  });
  const [songs, setSongs] = useState<{ title: string; artist: string }[]>();
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [namePlayList, setNamePlayList] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    if (loading) return;
    setLoading(true);
    setError(null);
    setSongs(undefined);
    try {
      const res = await fetch("/api/generatePlaylist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput: prompt, options }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error al generar la playlist");
      setNamePlayList(data.result.playlist.title);
      setSongs(data.result.playlist.songs);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "No se pudo generar la playlist. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirm() {
    if (!songs) return;
    setConfirming(true);
    setError(null);
    try {
      const spotifyRes = await Promise.all(
        songs.map(async (song) => {
          try {
            const response = await fetch("/api/spotify/search-track", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ song }),
            });
            return response.json();
          } catch {
            return null;
          }
        })
      );
      const trackIds = spotifyRes
        .filter((track) => track != null)
        .map((track) => track.trackId)
        .filter((id) => id != null);

      const res = await fetch("/api/spotify/create-playList", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: namePlayList, trackIds, prompt, songs }),
      });

      if (!res.ok) throw new Error("Error creando playlist");

      await queryClient.invalidateQueries({ queryKey: ["playlists"] });
      setSongs(undefined);
      setNamePlayList("");
      setPrompt("");
    } catch {
      setError("No se pudo crear la playlist. Intentá de nuevo.");
    } finally {
      setConfirming(false);
    }
  }

  const optionBtn = (active: boolean) =>
    `px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
      active
        ? "bg-violet-500 text-white shadow shadow-violet-300"
        : "border border-violet-200 text-violet-500 hover:border-violet-400 hover:bg-violet-50"
    }`;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4">
      <div className="border border-violet-500/20 shadow-[0_0_20px_2px_rgba(139,92,246,0.12)] rounded-2xl p-5 sm:p-6">

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-br from-purple-600 to-violet-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
            </svg>
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-800 leading-tight">Generador de Playlists</h2>
            <p className="text-xs text-violet-400 mt-0.5">Describí lo que querés y la IA crea tu playlist perfecta</p>
          </div>
        </div>

        {/* Input + Button */}
        <div className="flex gap-2 sm:gap-3">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && prompt.trim() && !loading && handleGenerate()}
            placeholder="Ej: música para estudiar de noche con lluvia..."
            className="flex-1 min-w-0 bg-violet-50/50 border border-violet-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-violet-400 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.1)] transition-all duration-200"
          />
          <button
            disabled={!prompt.trim() || loading}
            onClick={handleGenerate}
            className="shrink-0 px-4 sm:px-5 py-2.5 rounded-xl font-bold text-sm tracking-wide bg-gradient-to-r from-purple-600 to-violet-500 text-white shadow-lg shadow-purple-500/30 hover:scale-105 hover:shadow-purple-400/50 active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (
              <span className="flex items-center gap-1.5">
                <span className="animate-spin inline-block">✦</span>
                <span className="hidden sm:inline">Generando</span>
              </span>
            ) : (
              <span>Generar <span className="hidden sm:inline">✦</span></span>
            )}
          </button>
        </div>

        {/* Opciones configurables */}
        {!songs && !loading && (
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2">Cantidad de canciones</p>
              <div className="flex gap-2 flex-wrap">
                {[5, 10, 15, 20].map((q) => (
                  <button key={q} onClick={() => setOptions({ ...options, quantity: q })} className={optionBtn(options.quantity === q)}>
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2">Nacionalidad</p>
              <div className="flex gap-2 flex-wrap">
                {["Argentina", "España", "EEUU", "Cualquiera"].map((n) => (
                  <button key={n} onClick={() => setOptions({ ...options, nationality: n })} className={optionBtn(options.nationality === n)}>
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2">Época</p>
              <div className="flex gap-2 flex-wrap">
                {["80s", "90s", "2000s", "Actualidad"].map((e) => (
                  <button key={e} onClick={() => setOptions({ ...options, era: e })} className={optionBtn(options.era === e)}>
                    {e}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2">Tu edad</p>
              <div className="flex gap-2 flex-wrap">
                {["18-25", "26-35", "36-50", "50+"].map((a) => (
                  <button key={a} onClick={() => setOptions({ ...options, userAge: a })} className={optionBtn(options.userAge === a)}>
                    {a}
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="mt-6">
            <div className="flex items-center gap-2 text-violet-500 text-sm mb-3">
              <span className="animate-spin inline-block">✦</span> Generando tu playlist...
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-12 rounded-xl bg-violet-50 animate-pulse" />
              ))}
            </div>
          </div>
        )}

        {/* Resultado */}
        {songs && !loading && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-gray-800">{namePlayList}</h3>
                <p className="text-xs text-violet-400 mt-0.5">{songs.length} canciones generadas</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-violet-400 flex items-center justify-center shadow shadow-purple-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
                </svg>
              </div>
            </div>

            {/* Grid 2 cols desktop, 1 mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-80 overflow-y-auto pr-1">
              {songs.map((song, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-violet-50/60 hover:bg-violet-100 border border-transparent hover:border-violet-200 transition-all duration-150 group cursor-default"
                >
                  <span className="text-xs text-violet-300 w-5 text-right shrink-0 group-hover:text-violet-500 transition-colors">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-800 truncate leading-tight">{song.title}</p>
                    <p className="text-xs text-violet-500 truncate mt-0.5">{song.artist}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Botón confirmar — misma paleta que generar */}
            <button
              onClick={handleConfirm}
              disabled={confirming}
              className="mt-4 w-full py-3 rounded-xl font-bold text-sm tracking-wide bg-gradient-to-r from-purple-600 to-violet-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-400/50 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {confirming ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin inline-block">✦</span> Creando en Spotify...
                </span>
              ) : (
                "Crear playlist en Spotify ✦"
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
