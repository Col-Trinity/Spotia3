export const topGenres = (artists: { genres: string[] }[]) => {
  const genreCount = artists.reduce(
    (acc: Record<string, number>, artist: { genres: string[] }) => {
      artist.genres.forEach((genre: string) => {
        acc[genre] = (acc[genre] || 0) + 1;
      });
      return acc;
    },
    {},
  );

  const sumadosGeneros = Object.values(genreCount);
  const total = sumadosGeneros.reduce((a, b) => a + b, 0);

  const genrePercentage = Object.entries(genreCount).map(([genre, count]) => ({
    genre,
    percentage: ((count / total) * 100).toFixed(),
  }));
  return genrePercentage;
};
