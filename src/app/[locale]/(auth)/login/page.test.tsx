import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next-auth/react', () => ({
  signIn: vi.fn(),
}));

import LoginPage from './page';

// Simple unit test to test the UI, is helpfull to ensure the page is rendered correctly and the button is displayed
describe('LoginPage', () => {
  it('renders a sign-in button', () => {
    render(<LoginPage />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
