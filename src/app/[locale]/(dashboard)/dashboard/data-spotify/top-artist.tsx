"use client";
import { CardArtist } from "@/src/app/_components/cardArtist"
import { useTopArtists } from "@/src/hooks/useTopArtists";
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
  if (isLoading) return <p>Cargando tu Top de Artistas</p>;
  return (
    <>
      <div className="flex flex-col h-full">
        <h1 className="text-2xl font-bold mb-6 bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-center">Tus artistas recientemente escuchados</h1>
        <p className="text-gray-400 text-center mb-4">Tus artistas mas escuchados en el rango de tiempo seleccionado..</p>
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 w-full max-w-4xl overflow-y-auto pr-2 max-h-[60vh]">
          {artists?.map((artist: Artist) => (
            <CardArtist key={artist.id} artist={artist} />
          ))}
        </div>
      </div>

    </>
  );

}
