// @vitest-environment node
import { describe, it, expect, vi } from 'vitest';

const { mockCreate } = vi.hoisted(() => ({
  mockCreate: vi.fn(), // 👈 esto sí se eleva junto con vi.mock
}));
vi.mock('./clients', () => ({
  GeminiClient: {
    chat: {
      completions: {
        create: mockCreate,
      },
    },
  },
}));

vi.mock('../config/iaConfig', () => ({
  AI_PROVIDER: 'gemini',
  API_KEYS: { gemini: 'fake-key' },
}));
import { askAI } from './aiClient';
import { Artist } from '../types/spotify';

const mockArtists: Artist[] = [
  {
    id: '1',
    name: 'Dua Lipa',
    genres: ['pop'],
    popularity: 95,
    images: [],
    external_urls: { spotify: '' },
    followers: { total: 0 },
  }
]

describe('askAI (gemini provider)', () => {
  it('devuelve el objeto parseado cuando la IA responde correctamente', async () => {

    const mockResponse = {
      description: "Che, sos el alma de la joda...",
      hygiene_level: "Bajo",
      dnd_alignment: "Chaotic Neutral",
      voting_tendency: "Izquierda "
    }
    mockCreate.mockResolvedValue({
      choices: [{ message: { content: JSON.stringify(mockResponse) } }],
    });


    const result = await askAI({ artists: mockArtists })
    expect(result).toEqual(mockResponse)
  });

  it('tira error cuando la IA no devuelve contenido', async () => {
    mockCreate.mockResolvedValue({
      choices: [{ message: { content: null } }],
    });

    await expect(askAI({ artists: mockArtists })).rejects.toThrow();
  });


});