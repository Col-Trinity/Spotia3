export type Artist = {
  id: string;
  name: string;
  images: { url: string }[];
  genres: string[];
  external_urls: { spotify: string };
  followers: { total: number };
  popularity: number;
};
type SpotifyEmbedController = {
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  loadUri: (uri: string) => void;
  destroy: () => void;
};

type SpotifyIframeApi = {
  createController: (
    element: HTMLElement,
    options: { uri: string },
    callback: (controller: SpotifyEmbedController) => void
  ) => void;
};

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyIframeApi) => void;
  }
}

export {};