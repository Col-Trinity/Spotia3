 
 "use client";
import { useState } from "react";
import { TopTracks } from "../data-spotify/top-tracks";
import { useTranslations } from "next-intl";
import { HistorialPlaylists } from "@/src/app/_components/HistorialPlaylist";

function HistorialPage() {
  const t = useTranslations("historial");
  const [activeTab, setActiveTab] = useState<"canciones" | "playlists">("canciones")

  return (
    <div className="min-h-screen p-6 mt-2">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-linear-to-r from-rose-500 via-violet-600 to-purple-500 bg-clip-text text-transparent">
            {t("title")}
          </h1>
          <p className="text-violet-500/80 mt-1 text-base">{t("description")}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setActiveTab("canciones")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              activeTab === "canciones"
                ? "bg-violet-500 text-white"
                : "border border-violet-500/30 text-violet-400 hover:bg-violet-500/10"
            }`}
          >
            🎵 Canciones
          </button>
          <button
            onClick={() => setActiveTab("playlists")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              activeTab === "playlists"
                ? "bg-violet-500 text-white"
                : "border border-violet-500/30 text-violet-400 hover:bg-violet-500/10"
            }`}
          >
            🎶 Playlists
          </button>
        </div>

        {/* Contenido */}
        {activeTab === "canciones" && <TopTracks timeRange="short_term" />}
        {activeTab === "playlists" && <HistorialPlaylists/>}
      </div>
    </div>
  );
}

export default HistorialPage;
 /*use client";

  import { TopTracks } from "../data-spotify/top-tracks";
  import { useTranslations } from "next-intl";

  function HistorialPage() {
    const t = useTranslations("historial");

    return (
      <div className="min-h-screen p-6 mt-2">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-linear-to-r from-rose-500 via-violet-600 to-purple-500 bg-clip-text text-transparent">
              {t("title")}
            </h1>
            <p className="text-violet-500/80 mt-1 text-base">{t("description")}</p>
          </div>
          <TopTracks timeRange="short_term" />
        </div>
      </div>
    );
  }

  export default HistorialPage;*/
