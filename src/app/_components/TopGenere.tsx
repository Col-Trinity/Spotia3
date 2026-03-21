"use client";

import { topGenres } from "@/src/utils/topGenere";
import { useEffect, useMemo, useState } from "react";
import { useTopArtists } from "@/src/hooks/useTopArtists";
import { Artist } from "@/src/types/spotify";
import Image from 'next/image';
import { useTranslations } from "next-intl";

export default function TopGenere() {
  const t = useTranslations("topGenre");
  const { data: artists, isLoading, isError, error, refetch } = useTopArtists();
  const [animated, setAnimated] = useState(false);

  const artistsKey = artists?.map((a) => a.id).join(',') ?? '';

  const topGenere = useMemo(
    () => (artists ? topGenres(artists as Artist[]) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [artistsKey]
  );

  useEffect(() => {
    setAnimated(false);
    const id = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(id);
  }, [topGenere]);

  if (isLoading) return <p>{t("loading")}</p>;

  if (isError) return (
    <div>
      <p>{(error as Error).message}</p>
      <button onClick={() => refetch()}>{t("retry")}</button>
    </div>
  );
  if (!artists) return null;

  return (
    <div className="w-full max-w-sm rounded-2xl p-6 border border-purple-500/20 shadow-2xl">

      <div className="text-center mb-6">
        <h2 className="text-lg font-bold tracking-tight mb-1">
          {t("title")}
        </h2>
        <p className="text-xs text-[#888899]">
          {t("subtitle")}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {topGenere.map((item, index) => (
          <div key={index} className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full shrink-0 overflow-hidden border border-purple-500/40 bg-[#1A1A2E] flex items-center justify-center">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.genre}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              ) : (
                <span className="text-base">🎵</span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-semibold capitalize">
                  {item.genre}
                </span>
                <span className="text-xs font-bold text-purple-400">
                  {item.percentage}%
                </span>
              </div>

              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-violet-400"
                  style={{
                    width: animated ? `${item.percentage}%` : "0%",
                    transition: `width 800ms cubic-bezier(0.4, 0, 0.2, 1) ${index * 150}ms`,
                  }}
                />
              </div>

              <span className="text-[11px] text-[#555566] mt-1 block">
                {item.count} {item.count === 1 ? t("artist") : t("artists")}
              </span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
