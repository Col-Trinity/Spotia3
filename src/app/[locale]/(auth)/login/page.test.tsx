import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoginPage from './page';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'es',
}));

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
    }),
    useParams:()=>({ locale: 'es' }),
    usePathname:()=>'/',
}))

// Simple unit test to test the UI, is helpfull to ensure the page is rendered correctly and the button is displayed
describe('LoginPage', () => {
 it("renders a sign-in button", async () => {
  render(<LoginPage />);

  const buttons = await screen.findAllByRole("button");
  expect(buttons.length).toBeGreaterThan(0);
});
});
