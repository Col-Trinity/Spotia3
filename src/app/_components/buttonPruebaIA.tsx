"use client";
import { useEffect } from "react";
import { useTopArtists } from "@/src/hooks/useTopArtists";
import Loading from "./loading"
import { usePostMutation } from "@/src/hooks/usePostMutation";
import { Artist } from "@/src/types/spotify";

export default function PerfilMusicalIA() {
  const { data: artists = [], isError, error, isLoading } = useTopArtists();
  const { mutate, isPending, data: responseIa} = usePostMutation<{ artists: Artist[] }, { result: string }>("/api/askAI")

 useEffect(() => {
    if (!isLoading && !isError && artists.length > 0) {
      mutate({artists});
    }
  }, [isLoading, isError, artists,mutate]);

  if (isLoading) <p>cargando artistas</p>;

  if (isError) {
    const err = error as Error;
    if (err.message.includes("401")) {
      return <p>No autorizado: tu sesión expiró o no tienes permisos.</p>;
    }
    return <p>{err.message}</p>;
  }

return (
  <div>

    {isPending && <p>La IA está pensando...</p>}

    {responseIa && (
      <div className="w-90">
        <h2 className="flex items-center justify-center border-green-500 border">
          {responseIa.result}
        </h2>
      </div>
    )}
  </div>
);
}

