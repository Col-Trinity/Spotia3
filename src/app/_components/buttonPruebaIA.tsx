"use client";
import { useEffect, useState } from "react";
import { useTopArtists } from "@/src/hooks/useTopArtists";
import { usePostMutation } from "@/src/hooks/usePostMutation";
import { Artist } from "@/src/types/spotify";
import Typewriter from 'typewriter-effect';

export default function PerfilMusicalIA() {
  const { data: artists = [], isError, error, isLoading } = useTopArtists();
  const { mutate, isPending, data: responseIa } = usePostMutation<{ artists: Artist[] }, { result: string }>("/api/askAI")
  const [ia, setIa] = useState(false)
  const [arrayTextIa, setArrayTextIa] = useState<string[]>()

  useEffect(() => {
    if (!isLoading && !isError && artists.length > 0) {
      mutate({ artists });
    }
  }, [ ia]);




  if (isError) {
    const err = error as Error;
    if (err.message.includes("401")) {
      return <p>No autorizado: tu sesión expiró o no tienes permisos.</p>;
    }
    return <p>{err.message}</p>;
  }


  return (

    <div className=" flex justify-center ">
      <button  className=" bg-[rgb(172,214,133)] w-[17vh] h-[10vh] " onClick={() => setIa((prev) => !prev)}> mostra decripcion</button>

      {isPending && <p>La IA está pensando...</p>}

      {responseIa && (
        <div className="w-90">

          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .changeDelay(20) 
                .typeString(responseIa.result) 
                .start();
            }}
          />

        </div>
      )}
    </div>
  );
}

