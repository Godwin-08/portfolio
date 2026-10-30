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

function getStoredTheme(): Theme | null {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return stored === 'dark' || stored === 'light' ? stored : null;
  } catch (error) {
    console.warn('Unable to read the saved theme preference.', error);
    return null;
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [resolvedTheme, setResolvedTheme] = useState<Theme>('light');
  const [, startTransition] = useTransition();

  useEffect(() => {
    // 1. Lire la classe actuelle posée par le script inline anti-flash
    const isDark = document.documentElement.classList.contains('dark');
    const activeTheme: Theme = isDark ? 'dark' : 'light';
    setResolvedTheme(activeTheme);

    // 2. Vérifier s'il y a un choix stocké
    const stored = getStoredTheme();
    if (stored) {
      setThemeState(stored);
    } else {
      // Déduire de la préférence système
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      setThemeState(media.matches ? 'dark' : 'light');
    }

    // 3. Écouter les changements de préférence système si aucun choix manuel n'est stocké
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const currentStored = getStoredTheme();
      if (!currentStored) {
        const next = e.matches ? 'dark' : 'light';
        setResolvedTheme(next);
        setThemeState(next);
        if (e.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
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
