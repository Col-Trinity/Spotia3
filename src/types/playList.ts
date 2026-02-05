export type PlaylistItem = {
    id: string;
    name: string;
    description: string;
    external_urls: { spotify: string };
    tracks: { href: string; total: number };

};
