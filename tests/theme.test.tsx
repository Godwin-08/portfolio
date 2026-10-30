// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeProvider, THEME_STORAGE_KEY, useTheme } from '@/components/theme/ThemeContext';

function ThemeProbe() {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <button type="button" onClick={toggleTheme}>
      {resolvedTheme}
    </button>
  );
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove('dark');
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn().mockReturnValue({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    });
  });

  afterEach(() => {
    cleanup();
  });

  it('uses the system preference when no theme is saved', async () => {
    document.documentElement.classList.add('dark');
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn().mockReturnValue({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    });

    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>
    );

    await waitFor(() => expect(screen.getByRole('button')).toHaveTextContent('dark'));
  });

  it('toggles and persists the selected theme across remounts', async () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'light');

    const { unmount } = render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>
    );

    await waitFor(() => expect(screen.getByRole('button')).toHaveTextContent('light'));
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveTextContent('dark');
      expect(document.documentElement).toHaveClass('dark');
      expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    });

    unmount();
    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>
    );

    await waitFor(() => expect(screen.getByRole('button')).toHaveTextContent('dark'));
  });
});
