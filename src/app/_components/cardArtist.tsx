import { Artist } from "@/src/types/spotify";

export function CardArtist({ artist }: { artist: Artist }) {
    return (
        <>
            
            <div className="flex mt-4 flex-col items-center p-4 rounded-lg shadow-md w-full bg-black">
                <div
                    key={artist.id}
                    className="flex flex-col items-center justify-center"
                >
                    <h3 className="text-lg font-semibold text-white">{artist.name}</h3>
                    <p className="text-sm text-gray-600">
                        {artist.genres.join(", ")}
                    </p>
                    <a
                        href={artist.external_urls.spotify}
                        target="_blank"
                        className="text-green-500 mt-2"
                    >
                        Ver en Spotify
                    </a>
                </div>
            </div>
        </>
    )
}