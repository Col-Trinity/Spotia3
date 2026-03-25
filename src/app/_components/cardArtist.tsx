import { Artist } from "@/src/types/spotify";
import { ExternalLink } from "lucide-react";

export function CardArtist({ artist }: { artist: Artist }) {
    return (
        <>
            <div className="group relative flex flex-col items-center justify-center gap-0.5 px-2 py-2 rounded-xl w-full
              bg-linear-to-br from-violet-600/80 to-pink-900/80
              border border-purple-400/40 shadow-[0_0_16px_2px_rgba(192,132,252,0.2)]
              hover:shadow-[0_0_28px_6px_rgba(236,72,153,0.4)] hover:scale-105 transition-all duration-300 cursor-default">
                <h3 className="text-sm font-extrabold text-white text-center leading-tight">{artist.name}</h3>
                <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-pink-300/80 text-center line-clamp-1">
                    {artist.genres.join(", ")}
                </p>
                <a
                    href={artist.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-purple-300 hover:text-pink-300 mt-1 opacity-0 group-hover:opacity-100 transition"
                >
                    <ExternalLink size={14} />
                    <span className="text-xs font-semibold">Ver en Spotify</span>
                </a>
            </div>
        </>
    )
}