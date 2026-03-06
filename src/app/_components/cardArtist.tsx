import { Artist } from "@/src/types/spotify";
import { ExternalLink } from "lucide-react";

export function CardArtist({ artist }: { artist: Artist }) {
    return (
        <>
            <div className="group relative flex flex-col items-center gap-2 px-6 py-5 rounded-3xl w-full mt-4
              bg-linear-to-br from-violet-600/80 to-pink-900/80
              border border-purple-400/40 shadow-[0_0_24px_4px_rgba(192,132,252,0.25)]
              hover:shadow-[0_0_36px_8px_rgba(236,72,153,0.45)] hover:scale-105 transition-all duration-300 cursor-default">
                <h3 className="text-base font-extrabold text-white text-center leading-tight">{artist.name}</h3>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-pink-300/80 text-center">
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