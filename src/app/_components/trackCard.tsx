import { Track } from "@/src/types/track";
import { ExternalLink } from "lucide-react";

export function TrackCard({ track }: { track: Track }) {
  function formatearDuracion(ms: number) {
    const minutos = Math.floor(ms / 60000);
    const segundos = Math.floor((ms % 60000) / 1000);

    return `${minutos}:${segundos.toString().padStart(2, "0")}`;
  }
  return (
    <>
      <div className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-violet-50 dark:hover:bg-violet-900/30 border border-transparent hover:border-violet-200 dark:hover:border-violet-700 transition-all group cursor-default">
        <div className="flex-1 overflow-hidden">
          <h3 className="text-gray-900 dark:text-white text-base font-semibold truncate group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors">
            {track.name}
          </h3>
          <p className="text-sm text-violet-500 truncate">
            {track.artists.map((a) => a.name).join(", ")}
          </p>
        </div>
        <span className="text-sm text-purple-400 tabular-nums">
          {formatearDuracion(track.duration_ms)}
        </span>
        <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition">
          <a
            href={track.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-500 hover:text-rose-500 transition-colors"
            title="Abrir en Spotify"
          >
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </>
  );
}
