
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
      <div className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/5 transition group">

        <div className="flex-1 overflow-hidden">
          <h3 className="text-white font-medium truncate">
            {track.name}
          </h3>
          <p className="text-sm text-gray-400 truncate">
            {track.artists.map(a => a.name).join(", ")}
          </p>
        </div>
        <iframe data-testid="embed-iframe" src="https://open.spotify.com/embed/track/1btvwn9o5vsOkeIf8qJ4cP?utm_source=generator" width="100%" height="152" frameBorder="0" allowFullScreen={false} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        <span className="text-sm text-gray-400">
          {formatearDuracion(track.duration_ms)}
        </span>
        <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition">
          <a
            href={track.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:text-green-400"
            title="Abrir en Spotify"
          >
            <ExternalLink size={18} />
          </a>

        </div>
      </div>
    </>
  );
}