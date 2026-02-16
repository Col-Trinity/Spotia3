"use client";
import { useEffect, useState } from "react";
import { useTopArtists } from "@/src/hooks/useTopArtists";
import Loading from "./loading"

export default function PerfilMusicalIA() {
  const [responseIa, setResponseIa] = useState()
  const [isAiLoading, setIsAiLoading] = useState(false);
  const { data: artists = [], isError, error, isLoading } = useTopArtists();

  useEffect(() => {
    const handelClick = async () => {

      if (!artists || artists.length === 0) return;

      setIsAiLoading(true);
      try {
        const response = await fetch("/api/askAI", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            artists
          })

        });
        const data = await response.json();
        setResponseIa(data.result)
      } catch (e) {
        console.error(e);
      } finally {
        setIsAiLoading(false);
      }
    }
    if (!isLoading && !isError && artists.length > 0) {
      handelClick()
    }
  }, [isLoading, isError, artists])


  if (isLoading) return <Loading />

  if (isError) {
    const err = error as Error;
    if (err.message.includes("401")) {
      return <p>No autorizado: tu sesión expiró o no tienes permisos. Redirigiendo...</p>
    }
    return <p>{(error as Error).message}</p>
  }

  return (
    <div>

      {isAiLoading && <p>La IA está pensando...</p>}

      {!isLoading && responseIa && (
        <div className="w-90">
          <h2 className="flex items-center justify-center border-green-500 border">
            {responseIa}
          </h2>
        </div>
      )}
    </div>
  );
}

