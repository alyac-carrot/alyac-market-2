import { useState } from 'react';
import type { ReactNode } from 'react';

import { ArrowLeft, Monitor, Moon, MoreVertical, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useLogout } from '@/entities/auth';
import { useTheme } from '@/shared/lib';
import { Button, ConfirmDialog, Popover, PopoverContent, PopoverTrigger } from '@/shared/ui';

import { HeaderShell } from './HeaderShell';

type HeaderProps = {
  title?: string;
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
  showBackButton?: boolean;
  showMenu?: boolean;
};

export function Header({
  title,
  left,
  center,
  right,
  showBackButton = false,
  showMenu = false,
}: HeaderProps) {
  const navigate = useNavigate();
  const logout = useLogout();
  const { theme, setTheme } = useTheme();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const ThemeIcon = theme === 'system' ? Monitor : theme === 'light' ? Sun : Moon;

  const cycleTheme = () => {
    const themes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
  };

  const rightNode = right
    ? right
    : showMenu && (
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
                  onClick={cycleTheme}
                  title={`현재: ${theme}`}
                  className="inline-flex w-10 items-center justify-center"
                >
                  <ThemeIcon className="h-5 w-5" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsLogoutDialogOpen(true)}
                className="text-foreground inline-flex w-full px-4 py-3 text-sm"
              >
                로그아웃
              </button>
            </div>
          </PopoverContent>
        </Popover>
      );

  return (
    <>
      <HeaderShell
        left={
          left ??
          (showBackButton ? (
            <Button type="button" variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-6 w-6" />
            </Button>
          ) : null)
        }
        center={center ?? (title ? <div className="text-base font-semibold">{title}</div> : null)}
        right={rightNode}
      />

      <ConfirmDialog
        open={isLogoutDialogOpen}
        onOpenChange={setIsLogoutDialogOpen}
        title="로그아웃 하시겠습니까?"
        cancelText="취소"
        confirmText="로그아웃"
        confirmLoadingText="로그아웃 중..."
        onConfirm={logout}
      />
    </>
  );
}
