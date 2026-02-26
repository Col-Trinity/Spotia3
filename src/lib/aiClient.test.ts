import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the config so we can control which provider is active
vi.mock('../config/iaConfig', () => ({
  AI_PROVIDER: 'gemini',
  API_KEYS: { gemini: 'fake-gemini-key', claude: '', gpt: '' },
}));

// Mock global fetch for the Gemini HTTP call
const fetchMock = vi.fn();
vi.stubGlobal('fetch', fetchMock);

beforeEach(() => {
  fetchMock.mockReset();
});

import { askAI } from './aiClient';
import { Artist } from '../types/spotify';

const mockArtists: Artist[] = [
  {
    id: '1',
    name: 'Dua Lipa',
    genres: ['pop', 'dance pop'],
    popularity: 95,
    images: [],
    external_urls: { spotify: '' },
    followers: { total: 0 },
  },
  {
    id: '2',
    name: 'The Weeknd',
    genres: ['canadian contemporary r&b', 'pop'],
    popularity: 97,
    images: [],
    external_urls: { spotify: '' },
    followers: { total: 0 },
  },
];
describe('askAI (gemini provider)', () => {
  it('returns the text from Gemini response', async () => {
    const mockResponse = {
      description: "Che, sos el alma de la joda...",
      hygiene_level: "Bajo",
      dnd_alignment: "Chaotic Neutral",
      voting_tendency: "Izquierda Unida"
    };
    fetchMock.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          candidates: [
            { content: { parts: [{ text: JSON.stringify(mockResponse) }] } },
          ],
        }),
    });

    const result = await askAI({ artists: mockArtists });

    expect(result).toEqual(mockResponse)
  });

  it('returns empty string when Gemini response has no candidates', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ candidates: [] }),
    });

    const result = await askAI({ artists: mockArtists });

    expect(result).toEqual({
      description: "no se genero texto",
      hygiene_level: "",
      dnd_alignment: "",
      voting_tendency: ""
    });
  });
});
