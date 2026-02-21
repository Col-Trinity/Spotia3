"use client";
import { useTopArtists } from "@/src/hooks/useTopArtists";
import { useStreamMutation } from "@/src/hooks/useStreamMutation";
import Loading from "./loading";
import { useEffect } from "react";
import { Artist } from "@/src/types/spotify";

export default function PerfilMusicalIA() {
  const { data: artists = [], isError, error, isLoading } = useTopArtists();
  const { mutate, isPending, streamedText, areMessagesPending, error: aiError, isError: isErrorIA } = useStreamMutation<{ artists: Artist[] }>("/api/askAI");

  useEffect(() => {
    if (!isLoading && !isError && artists.length > 0) {
      mutate({ artists });
    }
  }, [isLoading, isError, artists, mutate]);

  if (isLoading) return <Loading />;

  if (isError) {
    const err = error as Error;
    if (err.message.includes("401")) {
      return <p>No autorizado: tu sesión expiró o no tienes permisos.</p>;
    }
    return <p>{err.message}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Respuesta IA</h1>

      {isPending && <p>La IA está pensando... </p>}

      {streamedText && !isErrorIA && (
        <div className="w-full border-2 border-green-500 border-dashed p-4">
            {streamedText}
            {areMessagesPending && <LoadingSpinner />}
        </div>
      )}

      {
        isErrorIA && <p className="text-red-500">{aiError?.message}</p>
      }
    </div>
  );
}

const LoadingSpinner = () => {
  return (
    <div
      className="inline-block w-5 h-5 border-2 border-green-500 border-t-transparent rounded-full animate-spin"
      aria-hidden
    />
  );
};