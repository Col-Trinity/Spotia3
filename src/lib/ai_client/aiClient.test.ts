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
import { Artist } from '../../types/spotify';

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
    fetchMock.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          candidates: [
            { content: { parts: [{ text: 'Canción inventada - Artista' }] } },
          ],
        }),
    });

    const result = await askAI({ artists: mockArtists });

    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('generativelanguage.googleapis.com'),
      expect.objectContaining({ method: 'POST' }),
    );
    expect(result).toBe('Canción inventada - Artista');
  });

  it('returns empty string when Gemini response has no candidates', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ candidates: [] }),
    });

    const result = await askAI({ artists: mockArtists });

    expect(result).toBe('');
  });
});
