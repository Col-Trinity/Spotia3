import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next-auth/react', () => ({
  signIn: vi.fn(),
  getProviders: vi.fn(() =>
    Promise.resolve({
      spotify: {
        id: "spotify",
        name: "Spotify",
      },
    })
  ),
}));

vi.mock('next/navigation',()=>({
    useRouter:()=>({
      push:vi.fn(),
      replace:vi.fn(),
      prefetch:vi.fn()
    })
}))
import LoginPage from './page';
import { useRouter } from 'next/router';

// Simple unit test to test the UI, is helpfull to ensure the page is rendered correctly and the button is displayed
describe('LoginPage', () => {
 it("renders a sign-in button", async () => {
  render(<LoginPage />);

  const button = await screen.findByRole("button");
  expect(button).toBeInTheDocument();
});
});
