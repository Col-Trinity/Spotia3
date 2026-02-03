import { describe, it, expect } from 'vitest';
import { topGenres } from './topGenere';

// Simple unit test that does not require a mock
describe('topGenres', () => {
  it('calculates genre percentages from artists', () => {
    const artists = [
      { genres: ['pop', 'rock'] },
      { genres: ['pop', 'jazz'] },
      { genres: ['rock'] },
    ];

    const result = topGenres(artists);

    // Total genre mentions: pop=2, rock=2, jazz=1 → 5 total
    // pop = 40%, rock = 40%, jazz = 20%
    expect(result).toEqual(
      expect.arrayContaining([
        { genre: 'pop', percentage: '40' },
        { genre: 'rock', percentage: '40' },
        { genre: 'jazz', percentage: '20' },
      ]),
    );
    expect(result).toHaveLength(3);
  });

  it('returns an empty array when given no artists', () => {
    const result = topGenres([]);
    expect(result).toEqual([]);
  });
});
