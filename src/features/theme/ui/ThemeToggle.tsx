import { Monitor, Moon, Sun } from 'lucide-react';

import { type Theme, useTheme } from '@/shared/lib/theme';
import { Button } from '@/shared/ui';

const THEME_ICONS: Record<Theme, React.ReactElement> = {
  light: <Sun className="h-5 w-5" />,
  dark: <Moon className="h-5 w-5" />,
  system: <Monitor className="h-5 w-5" />,
};

const THEME_LABELS: Record<Theme, string> = {
  light: '라이트 모드 (클릭 시 다크 모드로 전환)',
  dark: '다크 모드 (클릭 시 시스템 모드로 전환)',
  system: '시스템 모드 (클릭 시 라이트 모드로 전환)',
};

const THEME_CYCLE: Theme[] = ['light', 'dark', 'system'];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    const currentIndex = THEME_CYCLE.indexOf(theme);
    setTheme(THEME_CYCLE[(currentIndex + 1) % THEME_CYCLE.length]);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleTheme}
      aria-label={THEME_LABELS[theme]}
      title={THEME_LABELS[theme]}
    >
      {THEME_ICONS[theme]}
    </Button>
  );
}
