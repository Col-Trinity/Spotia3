import { Artist } from "@/src/types/spotify";
export const topGenres = (artists: Artist[]) => {

  const genreCount = artists.reduce(
    (acc: Record<string, { count: number; image: string | null }>, artist) => {
      artist.genres.forEach((genre: string) => {
        if (!acc[genre]) {
          acc[genre] = {
            count: 1,
            image: artist.images?.[0]?.url || null
          }
        } else {
          acc[genre].count += 1;
        }
      });
      return acc;
    },
    {},
  );

  const sortedGeneres = Object.entries(genreCount)
    .sort(([, a], [, b]) => b.count - a.count)
    .slice(0, 5);

  const totalTop5 = sortedGeneres.reduce((sum, [, data]) => sum + data.count, 0);

  const genreData = sortedGeneres.map(([genre, data]) => ({
    genre,
    count: data.count,
    percentage: parseFloat(((data.count / totalTop5) * 100).toFixed(1)),
    image: data.image,
  }))
  return genreData;
};
