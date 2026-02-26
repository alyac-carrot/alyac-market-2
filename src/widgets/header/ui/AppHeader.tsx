import { ArrowLeft, Monitor, Moon, MoreVertical, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useTheme } from '@/shared/lib/';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@/shared/ui';

import { HeaderShell } from './HeaderShell';

export function AppHeader() {
  const navigate = useNavigate();

  const { theme, label, toggleTheme } = useTheme();

  const ThemeIcon = theme === 'system' ? Monitor : theme === 'light' ? Sun : Moon;

  return (
    <HeaderShell
      left={
        <Button type="button" variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
      }
      center={null}
      right={
        <Popover>
          <PopoverTrigger asChild>
            <Button type="button" variant="ghost" size="icon">
              <MoreVertical className="h-6 w-6" />
            </Button>
          </PopoverTrigger>

          <PopoverContent align="end" side="bottom" sideOffset={8} className="w-60 p-0">
            <div className="flex flex-col py-2">
              <div className="bg-muted mx-auto mb-2 h-1 w-8 rounded-full" />

              <button
                type="button"
                onClick={() => navigate('/settings')}
                className="text-foreground inline-flex w-full px-4 py-3 text-sm"
              >
                설정 및 개인정보
              </button>

              <div className="flex items-center px-4 py-3 text-sm">
                <span className="w-10">테마:</span>

                <button
                  type="button"
                  onClick={toggleTheme}
                  title={`현재: ${label}`}
                  className="inline-flex w-10 items-center justify-center"
                >
                  <ThemeIcon className="h-5 w-5" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => navigate('/', { replace: true })}
                className="text-foreground inline-flex w-full px-4 py-3 text-sm"
              >
                로그아웃
              </button>
            </div>
          </PopoverContent>
        </Popover>
      }
    />
  );
}
