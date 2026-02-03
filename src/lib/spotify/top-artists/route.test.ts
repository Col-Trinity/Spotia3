import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getTopArtists } from './route';

// Integration test that test the entire route and require a mock for the fetch function
// (we don't want to hit the real Spotify API in tests)
// Mock global fetch so we never hit the real Spotify API
const fetchMock = vi.fn();
vi.stubGlobal('fetch', fetchMock);

beforeEach(() => {
  fetchMock.mockReset();
});

describe('getTopArtists', () => {
  it('returns parsed JSON from Spotify API', async () => {
    const fakeResponse = {
      items: [{ name: 'Soda Stereo', genres: ['rock en español'] }],
    };

    fetchMock.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(fakeResponse),
    });

    const result = await getTopArtists('fake-token');

    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.spotify.com/v1/me/top/artists?limit=10&time_range=medium_term',
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer fake-token',
        }),
      }),
    );
    expect(result).toEqual(fakeResponse);
  });

  it('throws when Spotify returns a non-ok response', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 401,
      text: () => Promise.resolve('Unauthorized'),
    });

    await expect(getTopArtists('bad-token')).rejects.toThrow('401');
  });
});
