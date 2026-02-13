"use client";
import { CardArtist } from "@/src/app/_components/cardArtist"
import { useTopArtists } from "@/src/hooks/useTopArtists";
import Loading from "@/src/app/_components/loading";
import { Artist } from "@/src/types/spotify";
import { useRedirectOn401 } from "@/src/hooks/useRedirectOn401i";


type TypeTimeRange = {
  timeRange: string;
}
export function TopArtist(timeRange: TypeTimeRange) {
  const { data: artists, isLoading, isError, error, refetch } = useTopArtists(timeRange);

  useRedirectOn401({ isError, error });

  if (isError) {
    const err = error as Error;
    if (err.message.includes("401")) {
      return (
        <p>No autorizado: tu sesión expiró o no tienes permisos. Redirigiendo...</p>
      );

    }
    return (
      <div>
        <p>{(error as Error).message}</p>
        <button
          onClick={() => refetch()}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Reintentar
        </button>
      </div>
    )
  }
  if (isLoading) return <Loading />;
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-6">Tus artistas recientemente escuchados</h1>
        <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl">
          {artists?.map((artist: Artist) => (
            <CardArtist key={artist.id} artist={artist} />
          ))}
        </div>
      </div>

    </>
  );

}
