// import Image from "next/image";
import { Track } from "@/src/types/track";

export function TrackCard( { track }: { track: Track } ) {
  return (
    <div>
      <div className="w-96 h-96">
        <h3 className="bg-red-700">{track.name}</h3>
        <p>
          {track.artists.map(a => a.name).join(", ")}
        </p>
        <p>{track.album.name}</p>
        <p>
          Escuchala de nuevo en{" "}
          <a
            href={track.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 underline hover:text-green-400"
          >
            Spotify
          </a>
        </p>

      </div>
    </div>
  );
}