import { getServerSession } from "next-auth";
import { GET } from "./route";
import { describe, expect, it, vi } from "vitest";

vi.mock("next-auth", () => ({
  getServerSession: vi.fn().mockResolvedValue({
    user: { name: "Test User", email: "test@example.com" },
    accessToken: "fake-token",
  }),
}));
vi.mock("@/src/lib/spotify/top-artists/route", () => ({
  getTopArtists: vi.fn().mockResolvedValue({
    items: [
      { id: "1", name: "Artist 1" },
      { id: "2", name: "Artist 2" },
    ],
  }),
}));

describe("GET /api/spotify/top-artists", () => {

  it("devuelve status 200 y un array de artistas", async () => {
    const response = await GET(
      new Request("http://localhost/api/spotify/top-artists"),
    );
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(Array.isArray(data.items)).toBe(true);
  });
  it("devuelve status 401 cuando no hay sesión", async () => {
    (getServerSession as any).mockResolvedValue(null);
    const response = await GET(
      new Request("http://localhost/api/spotify/top-artists"),
    );
    expect(response.status).toBe(401);
    const data = await response.json();
    expect(data.error).toBe("No autorizado");
  });
});
