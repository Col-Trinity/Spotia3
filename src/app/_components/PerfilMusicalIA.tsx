"use client";
import { useEffect } from "react";
import { useTopArtists } from "@/src/hooks/useTopArtists";
import { usePostMutation } from "@/src/hooks/usePostMutation";
import { Artist } from "@/src/types/spotify";
import Typewriter from 'typewriter-effect';
import Image from "next/image";
import corazon from "@/public/heart_smile.svg";
interface Props {
  onResult?: (texto: string) => void;  // funcion texto afuera
  onData: (data: { description: string, hygiene_level: string, dnd_alignment: string, voting_tendency: string, emotions: Array<{ name: string; percentage: number }> }) => void,
      refresh:number,

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
export default function PerfilMusicalIA({ onResult, onData , refresh}: Props) {
  const { data: artists = [], isError, error, isLoading } = useTopArtists();
  const { mutate, isPending, data: responseIa, isError: isMutationError } = usePostMutation<{ artists: Artist[] }, { result: AIResult }>(
    "/api/askAI"
  );


  useEffect(() => {
    if (!isLoading && !isError && artists.length > 0) {
      mutate({ artists });
    }
  }, [artists, isLoading, isError, mutate,refresh]);

  useEffect(() => {
    if (responseIa && onResult) {
      onResult(responseIa.result.description);
      onData(responseIa.result)
    }
  }, [responseIa, onResult, onData]);

  if (isError) {
    const err = error as Error;
    if (err.message.includes("401")) {
      return <p>No autorizado: tu sesión expiró o no tienes permisos.</p>;
    }
    return <p>{err.message}</p>;
  }

  return (
    <div className=" flex justify-content items-center gap-6">
      <div className="border border-violet-300 rounded-3xl p-4 ">
        <h1 className="font-semibold text-gray-800">Perfil Musical</h1>

        <p className="text-xs text-gray-500">Tu personalidad según tus artistas favoritos</p>
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
          <>
            <div className="w-90 mb-4 mt-4">

              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .changeDelay(20)
                    .typeString(responseIa.result.description)
                    .start();
                }}
              />

            </div>
            <div className="w-full border border-violet-300 rounded-3xl p-4 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <Image src={corazon} alt="corazon" className="w-5 h-5" />
                <p className="font-medium">Estado de ánimo</p>
              </div>
              <div className="h-32 w-full ">
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
          </>
        )}
      </div>
    </div>
  );
}

