export type Artist = {
  id: string;
  name: string;
  images: { url: string }[];
  genres: string[];
  external_urls: { spotify: string };
  followers: { total: number };
  popularity: number;
};
