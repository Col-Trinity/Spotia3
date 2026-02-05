import { Artist } from "@/src/types/spotify";
import { PlaylistItem } from "@/src/types/playList";
import { Track } from "@/src/types/track";

import { BaseService } from "./base";

const BASE_ROUTE = '/api/spotify';

class SpotifyService extends BaseService {
    static #instance: SpotifyService;

    public static get instance(): SpotifyService {
        if (!SpotifyService.#instance) {
            SpotifyService.#instance = new SpotifyService();
        }

        return SpotifyService.#instance;
    }

    private constructor() {
        super(BASE_ROUTE);
    }

    public async getTopArtists<T extends Artist>(limit: number = 10, timeRange: "short_term" | "medium_term" | "long_term" = "medium_term") {
        return this.fetchApi<T>(`top-artists?limit=${limit}&time_range=${timeRange}`);
    }

    public async getPlaylist<T extends PlaylistItem>(limit: number = 5) {
        return this.fetchApi<T>(`play-list?limit=${limit}`);
    }

    public async getPlaylistTracksById<T extends Track>(playlistId: string) {
        return this.fetchApi<T>(`play-list/${playlistId}/tracks`);
    }
}

export default SpotifyService;