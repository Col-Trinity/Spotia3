"use client";

import { useEffect, useState } from "react";

export function GeneratePlalist() {
  const [prompt, setPrompt] = useState("");
  const [options, setOptions] = useState({
  quantity: 10,           // cantidad de canciones
  nationality: "cualquiera", // nacionalidad
  era: "actualidad",      // época
  userAge: "18-25"        // edad del usuario
})

  async function handleGenerate(){
      const res = await fetch('/api/generatePlaylist',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({userInput:prompt,options})
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
        {/* Opciones configurables */}
<div className="mt-4 flex flex-col gap-4">

  {/* Cantidad de canciones */}
  <div>
    <p className="text-xs text-violet-300/70 mb-2">Cantidad de canciones</p>
    <div className="flex gap-2">
      {[5, 10, 15, 20].map((q) => (
        <button
          key={q}
          onClick={() => setOptions({ ...options, quantity: q })}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200
            ${options.quantity === q
              ? "bg-violet-500 text-white"
              : "border border-violet-500/30 text-violet-300 hover:bg-violet-500/10"
            }`}
        >
          {q}
        </button>
      ))}
    </div>
  </div>

  {/* Nacionalidad */}
  <div>
    <p className="text-xs text-violet-300/70 mb-2">Nacionalidad</p>
    <div className="flex gap-2 flex-wrap">
      {["Argentina", "España", "EEUU", "Cualquiera"].map((n) => (
        <button
          key={n}
          onClick={() => setOptions({ ...options, nationality: n })}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200
            ${options.nationality === n
              ? "bg-violet-500 text-white"
              : "border border-violet-500/30 text-violet-300 hover:bg-violet-500/10"
            }`}
        >
          {n}
        </button>
      ))}
    </div>
  </div>

  {/* Época */}
  <div>
    <p className="text-xs text-violet-300/70 mb-2">Época</p>
    <div className="flex gap-2 flex-wrap">
      {["80s", "90s", "2000s", "Actualidad"].map((e) => (
        <button
          key={e}
          onClick={() => setOptions({ ...options, era: e })}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200
            ${options.era === e
              ? "bg-violet-500 text-white"
              : "border border-violet-500/30 text-violet-300 hover:bg-violet-500/10"
            }`}
        >
          {e}
        </button>
      ))}
    </div>
  </div>

  {/* Edad del usuario */}
  <div>
    <p className="text-xs text-violet-300/70 mb-2">Tu edad</p>
    <div className="flex gap-2 flex-wrap">
      {["18-25", "26-35", "36-50", "50+"].map((a) => (
        <button
          key={a}
          onClick={() => setOptions({ ...options, userAge: a })}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200
            ${options.userAge === a
              ? "bg-violet-500 text-white"
              : "border border-violet-500/30 text-violet-300 hover:bg-violet-500/10"
            }`}
        >
          {a}
        </button>
      ))}
    </div>
  </div>

</div>
      </div>
    </div>
  );
}
