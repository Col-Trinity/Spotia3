export interface Track {
  id: string;
  name: string;
  artists: {
    id: string;
    name: string;
  }[];
  album: {
    id: string;
    name: string;
    images: {
      url: string;
      height?: number;
      width?: number;
    }[];
  };
  external_urls: {
    spotify: string;
  };

}