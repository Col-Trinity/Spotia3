"use client";
import { useEffect, useState } from "react";
import { useTopArtists } from "@/src/hooks/useTopArtists";
import { usePostMutation } from "@/src/hooks/usePostMutation";
import { Artist } from "@/src/types/spotify";
import Typewriter from 'typewriter-effect';
interface Props {
  onResult?: (texto: string) => void;  // funcion texto afuera
  onData: (data: { description: string, hygiene_level: string, dnd_alignment: string, voting_tendency: string, emotions: Array<{ name: string; percentage: number }> }) => void
}
type AIResult = {
  description: string,
  hygiene_level: string,
  dnd_alignment: string,
  voting_tendency: string,
  emotions: Array<{
    name: string;
    percentage: number;
  }>;
}
export default function PerfilMusicalIA({ onResult, onData }: Props) {
  const { data: artists = [], isError, error, isLoading } = useTopArtists();
  const { mutate, isPending, data: responseIa, error: mutationError, isError: isMutationError } = usePostMutation<{ artists: Artist[] }, { result: AIResult }>(
    "/api/askAI"
  );
  const [ia, setIa] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoading && !isError && artists.length > 0) {
      mutate({ artists });
    }
  }, [ia]);

  useEffect(() => {
    if (responseIa && onResult) {
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
    <div className=" flex flex-col items-center gap-6">

      <div className="border border-violet-300 rounded-sm p-4 ">
        {isPending && <p>La IA está pensando...</p>}
        {isMutationError && (
          <div className="flex flex-col items-center gap-2">
            <p className="text-red-400">Te recomendamos intentarlo de nuevo mas tarde</p>
            <button
              onClick={() => mutate({ artists })}
              className="px-4 py-2 rounded-full bg-violet-600 text-white"
            >
              Reintentar
            </button>
          </div>
        )}
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
        <button
          onClick={() => setIa((prev) => !prev)}
          className=" w-37 h-12.5 rounded-full bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold  shadow-lg hover:shadow-purple-500/40 hover:scale-105 active:scale-95 transition-all duration-200 m-2"
        >
          Mostrar descripción
        </button>
      </div>


      <div className="w-43.25 h-45.5 border border-violet-300 rounded-sm p-4 space-y-3">
        <p className="flex justify-center items-center">Estado de ánimo</p>
        <div className="h-32 w-35.5 ">
          {responseIa?.result?.emotions?.map((emotion, index) => (
            <div key={emotion.name} className="mb-2">

              <div className="flex justify-between text-sm font-medium">
                <span>{emotion.name}</span>
                <span>{emotion.percentage}%</span>
              </div>

              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden ">
                <div
                  className="h-full bg-violet-500 rounded-full"
                  style={{
                    width: `${emotion.percentage}%` || '0%',
                    transition: `width 800ms cubic-bezier(0.4, 0, 0.2, 1) ${index * 200}ms`,
                  }}
                />
              </div>

            </div>
          )) || (
              <p className="flex  text-gray-400">Consulta a la IA</p>
            )}
        </div>

      </div>

    </div>
  );
}

