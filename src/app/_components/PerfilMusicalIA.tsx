"use client";
import { useEffect, useState } from "react";
import { useTopArtists } from "@/src/hooks/useTopArtists";
import { usePostMutation } from "@/src/hooks/usePostMutation";
import { Artist } from "@/src/types/spotify";
import Typewriter from 'typewriter-effect';
interface Props {
  onResult?: (texto: string) => void;  // funcion texto afuera
  onData: (data: { description: string, hygiene_level: string, dnd_alignment: string, voting_tendency: string }) => void
}

export default function PerfilMusicalIA({ onResult ,onData }: Props) {
  const { data: artists = [], isError, error, isLoading } = useTopArtists();
  const { mutate, isPending, data: responseIa } = usePostMutation<{ artists: Artist[] }, { result: { description: string, hygiene_level: string, dnd_alignment: string, voting_tendency: string } }>("/api/askAI")
  const [ia, setIa] = useState(false)
  useEffect(() => {
    if (!isLoading && !isError && artists.length > 0) {
      mutate({ artists });
    }
  }, [ia]);

  useEffect(() => {
    if (responseIa && onResult ) {
      onResult(responseIa.result.description);
      onData(responseIa.result)
      
    }
  }, [responseIa]);

  if (isError) {
    const err = error as Error;
    if (err.message.includes("401")) {
      return <p>No autorizado: tu sesión expiró o no tienes permisos.</p>;
    }
    return <p>{err.message}</p>;
  }
  return (
    <div className=" flex justify-center ">
      <button className=" bg-[rgb(172,214,133)] w-[17vh] h-[10vh] " onClick={() => setIa((prev) => !prev)}> mostra decripcion</button>

      {isPending && <p>La IA está pensando...</p>}

      {responseIa && (
        <div className="w-90">

          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .changeDelay(20)
                .typeString(responseIa.result.description)
                .start();
            }}
          />

        </div>
      )}
    </div>
  );
}

