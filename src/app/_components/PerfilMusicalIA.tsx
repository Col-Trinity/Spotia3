"use client";
import { useEffect } from "react";
import { useTopArtists } from "@/src/hooks/useTopArtists";
import { usePostMutation } from "@/src/hooks/usePostMutation";
import { Artist } from "@/src/types/spotify";
import Typewriter from 'typewriter-effect';
import Image from "next/image";
import corazon from "@/public/heart_smile.svg";
import { useTranslations } from "next-intl";

interface Props {
  onResult?: (texto: string) => void;
  onData: (data: { description: string, hygiene_level: string, dnd_alignment: string, voting_tendency: string, emotions: Array<{ name: string; percentage: number }> }) => void,
  refresh: number,
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

export default function PerfilMusicalIA({ onResult, onData, refresh }: Props) {
  const t = useTranslations("perfilMusical");
  const { data: artists = [], isError, error, isLoading } = useTopArtists();
  const { mutate, isPending, data: responseIa, isError: isMutationError } = usePostMutation<{ artists: Artist[] }, { result: AIResult }>(
    "/api/askAI"
  );

  useEffect(() => {
    if (!isLoading && !isError && artists.length > 0) {
      mutate({ artists });
    }
  }, [artists, isLoading, isError, mutate, refresh]);

  useEffect(() => {
    if (responseIa && onResult) {
      onResult(responseIa.result.description);
      onData(responseIa.result)
    }
  }, [responseIa, onResult, onData]);

  if (isError) {
    const err = error as Error;
    if (err.message.includes("401")) {
      return <p>{t("unauthorized")}</p>;
    }
    return <p>{err.message}</p>;
  }

  return (
    <div className="flex justify-center items-center w-full">
      <div className="border border-violet-300 rounded-3xl p-4 w-full">
        <h1 className="font-semibold ">{t("title")}</h1>

        <p className="text-xs text-gray-500">{t("subtitle")}</p>
        {isPending && <p>{t("thinking")}</p>}
        {isMutationError && (
          <div className="flex flex-col items-center gap-2">
            <p className="text-red-400">{t("retryLater")}</p>
            <button
              onClick={() => mutate({ artists })}
              className="px-4 py-2 rounded-full bg-violet-600 text-white"
            >
              {t("retry")}
            </button>
          </div>
        )}
        {responseIa && (
          <>
            <div className="w-full mb-4 mt-4 text-sm">
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
                <p className="font-medium">{t("mood")}</p>
              </div>
              <div className="w-full space-y-2">
                {responseIa?.result?.emotions?.map((emotion, index) => (
                  <div key={emotion.name}>
                    <div className="flex justify-between text-sm font-medium">
                      <span>{emotion.name}</span>
                      <span>{emotion.percentage}%</span>
                    </div>
                    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
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
                    <p className="text-gray-400">{t("consultAI")}</p>
                  )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
