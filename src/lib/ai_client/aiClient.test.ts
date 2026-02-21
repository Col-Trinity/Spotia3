import { describe, it, expect, vi, beforeEach } from "vitest";
import { BaseAIProvider } from "./BaseAIProvider";
import { Artist } from "../../types/spotify";

// Mock registry to return a fake provider
const mockProvider = {
  name: "mock",
  stream: vi.fn(),
  createStream: vi.fn(),
} as unknown as BaseAIProvider;

vi.mock("./registry", () => ({
  getProvider: vi.fn(() => mockProvider),
}));

vi.mock("../../config/iaConfig", () => ({
  AI_PROVIDER: "gemini",
}));

import { askAIStream } from "./aiClient";
import { getProvider } from "./registry";

const mockArtists: Artist[] = [
  {
    id: "1",
    name: "Dua Lipa",
    genres: ["pop", "dance pop"],
    popularity: 95,
    images: [],
    external_urls: { spotify: "" },
    followers: { total: 0 },
  },
  {
    id: "2",
    name: "The Weeknd",
    genres: ["canadian contemporary r&b", "pop"],
    popularity: 97,
    images: [],
    external_urls: { spotify: "" },
    followers: { total: 0 },
  },
];

beforeEach(() => {
  vi.clearAllMocks();
});

describe("askAIStream", () => {
  it("calls getProvider with the configured AI_PROVIDER", async () => {
    const fakeStream = new ReadableStream();
    (mockProvider.createStream as ReturnType<typeof vi.fn>).mockResolvedValue(
      fakeStream,
    );

    const result = await askAIStream({ artists: mockArtists });

    expect(getProvider).toHaveBeenCalledWith("gemini");
    expect(result).toBe(fakeStream);
  });

  it("passes the built prompt to provider.createStream", async () => {
    const fakeStream = new ReadableStream();
    (mockProvider.createStream as ReturnType<typeof vi.fn>).mockResolvedValue(
      fakeStream,
    );

    await askAIStream({ artists: mockArtists });

    const promptArg = (mockProvider.createStream as ReturnType<typeof vi.fn>)
      .mock.calls[0][0] as string;
    expect(promptArg).toContain("Dua Lipa");
    expect(promptArg).toContain("The Weeknd");
  });

  it("propagates errors from the provider", async () => {
    (mockProvider.createStream as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error("429"),
    );

    await expect(askAIStream({ artists: mockArtists })).rejects.toThrow("429");
  });
});
