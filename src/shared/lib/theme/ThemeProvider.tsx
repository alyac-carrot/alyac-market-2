import { ReactNode, useEffect, useState } from 'react';

import { Theme, ThemeContext } from './ThemeContext';

interface Props {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

const VALID_THEMES = new Set<Theme>(['light', 'dark', 'system']);

const getStoredTheme = (key: string, fallback: Theme): Theme => {
  try {
    const stored = localStorage.getItem(key);
    return stored && VALID_THEMES.has(stored as Theme) ? (stored as Theme) : fallback;
  } catch {
    // localStorage unavailable in SSR or restricted environments
    return fallback;
  }
};

export const ThemeProvider = ({
  children,
  defaultTheme = 'system',
  storageKey = 'ui-theme',
}: Props) => {
  const [theme, setTheme] = useState<Theme>(() => getStoredTheme(storageKey, defaultTheme));

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      const applySystemTheme = () => {
        const systemTheme = mediaQuery.matches ? 'dark' : 'light';
        root.classList.remove('light', 'dark');
        root.classList.add(systemTheme);
      };

      applySystemTheme();
      mediaQuery.addEventListener('change', applySystemTheme);

      return () => {
        mediaQuery.removeEventListener('change', applySystemTheme);
      };
    }

    root.classList.add(theme);
  }, [theme]);

  const updateTheme = (newTheme: Theme) => {
    localStorage.setItem(storageKey, newTheme);
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
