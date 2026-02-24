import { topGenres } from "@/src/utils/topGenere";
import { useEffect, useMemo, useState } from "react";
import { useTopArtists } from "@/src/hooks/useTopArtists";
import { Artist } from "@/src/types/spotify";
import Image from 'next/image';

export default function TopGenere() {
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

  if (isLoading) return <p>Se esta cargando el grafico con tus generos favoritos...</p>;

  if (isError) return (
    <div>
      <p>{(error as Error).message}</p>
      <button onClick={() => refetch()}>Reintentar</button>
    </div>
  );
  if (!artists) return null;

  return (
    <div className="w-115 p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Tus géneros favoritos
      </h2>
      <div className="relative bg-linear-to-br from-gray-900 to-black rounded-2xl p-6 shadow-2xl">
        <div className="absolute left-6 top-6 h-80 flex flex-col justify-around z-10">
          {topGenere.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <div className="relative">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.genre}
                    width={40}
                    height={40}
                    className="rounded-full object-cover shadow-lg border-2 border-gray-800"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center border-2 border-gray-700">
                    <span className="text-lg">🎵</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white capitalize">
                  {item.genre}
                </span>
                <span className="text-xs text-gray-400">
                  {item.count} {item.count === 1 ? 'artista' : 'artistas'}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="relative h-80 bg-black rounded-xl p-4 pl-40">
          <div className="flex flex-col justify-around h-full">
            {topGenere.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-1 bg-gray-800 rounded-full h-5 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: animated ? `${item.percentage}%` : '0%',
                      backgroundColor: `rgba(29, 185, 84, ${1 - index * 0.15})`,
                      transition: `width 800ms cubic-bezier(0.4, 0, 0.2, 1) ${index * 200}ms`,
                    }}
                  />
                </div>
                <span className="text-white text-xs w-10 text-right font-medium">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
