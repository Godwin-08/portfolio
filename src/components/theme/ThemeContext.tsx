'use client';

import React, { createContext, useContext, useEffect, useState, useTransition } from 'react';
import { THEME_STORAGE_KEY } from './theme-constants';

export type Theme = 'light' | 'dark';
export { THEME_STORAGE_KEY } from './theme-constants';

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [resolvedTheme, setResolvedTheme] = useState<Theme>('light');
  const [, startTransition] = useTransition();

  useEffect(() => {
    const initialTheme: Theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    setThemeState(initialTheme);
    setResolvedTheme(initialTheme);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    startTransition(() => {
      setThemeState(newTheme);
      setResolvedTheme(newTheme);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      } catch (error) {
        console.warn('Unable to save the theme preference.', error);
      }
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });
  };

  const toggleTheme = () => {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        setTheme: applyTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
