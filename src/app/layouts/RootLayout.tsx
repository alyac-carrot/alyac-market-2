import { Outlet, useMatches } from 'react-router-dom';

import { Header } from '@/widgets/header';
import type { HeaderConfig } from '@/widgets/header';

export function RootLayout() {
  const matches = useMatches();

  // 가장 깊은(현재 페이지) 라우트의 handle.header를 우선 사용
  const last = matches[matches.length - 1] as any;
  const headerConfig: HeaderConfig =
    last?.handle?.header ?? { variant: 'feed', title: 'Alyac Market' };

  return (
    <div className="flex min-h-screen flex-col">
      <Header config={headerConfig} />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
