"use client";
import { CardArtist } from "@/src/app/_components/cardArtist"
import { useTopArtists } from "@/src/hooks/useTopArtists";

export function TopArtist() {
  const { artists, loading, error } = useTopArtists();

  if (loading) return <p>Cargando artistas...</p>;
  if (error) return <p>{error}</p>;
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-6">Tus artistas recientemente escuchados</h1>
        <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl">
          {artists.map((artist) => (
            <CardArtist key={artist.id} artist={artist} />
          ))}
        </div>
      </div>

    </>
  );

}
