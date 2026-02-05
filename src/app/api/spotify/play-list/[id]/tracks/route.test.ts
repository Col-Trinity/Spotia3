import { GET } from "./route";
import { getServerSession } from "next-auth";
import { getPlaylistTracks } from "@/src/lib/spotify/play-list/tracks/route";
import { NextRequest } from "next/server";
import { describe, it, expect, vi } from "vitest";
import { Mock } from "vitest";

vi.mock("next-auth", () => ({
  getServerSession: vi.fn(),
}));

vi.mock("@/src/lib/spotify/play-list/tracks/route", () => ({
  getPlaylistTracks: vi.fn(),
}));

describe("GET /api/spotify/play-list/[id]/tracks", () => {
    it("devuelve 401 si no hay sesión", async () => {
        (getServerSession as Mock).mockResolvedValue(null);

        const res = await GET({} as NextRequest, { params: Promise.resolve({ id: "test-id" }) });
        expect(res.status).toBe(401);
    });

    it("devuelve 200 y tracks si hay sesión", async () => {
        (getServerSession as Mock).mockResolvedValue({ accessToken: "token" });
        (getPlaylistTracks as Mock).mockResolvedValue({
            items: [{ track: { name: "Song A" } }],
        });

        const res = await GET({} as NextRequest, { params: Promise.resolve({ id: "test-id" }) });
        expect(res.status).toBe(200);
        const json = await res.json();
        expect(json).toEqual([{ name: "Song A" }]);
    });
});
