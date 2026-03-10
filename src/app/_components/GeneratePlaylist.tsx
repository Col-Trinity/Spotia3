"use client";

import { useEffect, useState } from "react";

export function GeneratePlalist() {
  const [prompt, setPrompt] = useState("");

  async function handleGenerate(){
      const res = await fetch('/api/generatePlaylist',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({userInput:prompt})
      })
      const data = await res.json()
      console.log(data.result.playlist.songs )
      console.log(data)
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
            disabled={!prompt.trim()}
            onClick={handleGenerate}
            className="px-5 py-3 rounded-xl font-bold text-sm tracking-wide bg-gradient-to-r from-purple-600 to-violet-500 text-white shadow-lg shadow-purple-500/30 hover:scale-105 hover:shadow-purple-400/50 active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 whitespace-nowrap"
          >
            Generar ✦
          </button>
        </div>
      </div>
    </div>
  );
}
