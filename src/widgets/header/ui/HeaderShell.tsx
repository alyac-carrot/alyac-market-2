import type { ReactNode } from 'react';

type HeaderShellProps = {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
};

export function HeaderShell({ left, center, right }: HeaderShellProps) {
  return (
    <header className="bg-background fixed top-0 right-0 left-0 z-50 border-b">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center">{left}</div>
        <div className="flex min-w-0 flex-1 items-center px-2">{center}</div>
        <div className="flex items-center">{right}</div>
      </div>
    </header>
  );
}
