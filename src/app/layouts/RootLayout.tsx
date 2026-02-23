import { Outlet } from 'react-router-dom';

import { SearchProvider } from '@/shared/lib/search/SearchProvider';
import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';

export function RootLayout() {
  return (
    <SearchProvider>
      <div className="min-h-screen">
        <Header />

        <main className="pt-16 pb-16">
          <div className="mx-auto w-full px-4">
            <Outlet />
          </div>
        </main>

        <Footer />
      </div>
    </SearchProvider>
  );
}
