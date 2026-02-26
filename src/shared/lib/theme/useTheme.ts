import { useMemo, useState } from 'react';

export type ThemeMode = 'system' | 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>('system');

  const nextTheme = (cur: ThemeMode): ThemeMode => {
    if (cur === 'system') return 'light';
    if (cur === 'light') return 'dark';
    return 'system';
  };

  const toggleTheme = () => {
    setTheme((prev) => nextTheme(prev));
  };

  const label = useMemo(() => {
    if (theme === 'system') return '시스템 설정';
    if (theme === 'light') return '라이트';
    return '다크';
  }, [theme]);

  return {
    theme,
    label,
    toggleTheme,
  };
}
