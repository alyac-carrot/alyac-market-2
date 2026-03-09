import { Suspense } from 'react';

import { Outlet, useMatch } from 'react-router-dom';

import { useMeQuery } from '@/entities/user';
import { SearchProvider } from '@/shared/lib/search/SearchProvider';

export default function RootLayout() {
  useMeQuery();
  const isSearch = useMatch('/search/*');

  const layout = (
    <div className="min-h-screen">
      <main>
        <div className="mx-auto w-full">
          <Suspense
            fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}
          >
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  );

  if (isSearch) {
    return <SearchProvider>{layout}</SearchProvider>;
  }

  return layout;
}
