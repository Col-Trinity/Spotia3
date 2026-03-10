import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../config/iaConfig', () => ({
  AI_PROVIDER: 'gemini',
  API_KEYS: { gemini: 'fake-gemini-key', claude: '', gpt: '' },
}));

const { mockGenerateContent } = vi.hoisted(() => ({
  mockGenerateContent: vi.fn(),
}));

vi.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: vi.fn(function () {
    return {
      getGenerativeModel: vi.fn().mockReturnValue({
        generateContent: mockGenerateContent,
      }),
    };
  }),
}));

beforeEach(() => {
  mockGenerateContent.mockReset();
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
      voting_tendency: "Izquierda Unida",
      emotions: [{ name: "alegría", percentage: 80 }, { name: "tristeza", percentage: 20 }]
    };
    mockGenerateContent.mockResolvedValue({
      response: { text: () => JSON.stringify(mockResponse) },
    });

    const result = await askAI({ mode: 'profile', artists: mockArtists });

    expect(result).toEqual(mockResponse);
  });

  it('throws when Gemini response has no candidates', async () => {
    mockGenerateContent.mockRejectedValue(new Error('invalid response'));

    await expect(askAI({ mode: 'profile', artists: mockArtists }))
      .rejects
      .toThrow("La respuesta de Gemini no tiene el formato esperado.");
  });
});
