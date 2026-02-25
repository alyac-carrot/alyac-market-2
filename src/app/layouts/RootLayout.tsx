import { Outlet, useMatch } from 'react-router-dom';

import { SearchProvider } from '@/shared/lib/search/SearchProvider';
import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';

export default function RootLayout() {
  const isUpload = useMatch('/upload/*');
  const isChatRoom = useMatch('/chat/:roomId');

  const hideFooter = Boolean(isUpload || isChatRoom);

  return (
    <SearchProvider>
      <div className="min-h-screen">
        <Header />

        <main className={`pt-16 ${hideFooter ? '' : 'pb-16'}`}>
          <div className="mx-auto w-full px-4">
            <Outlet />
          </div>
        </main>

        {!hideFooter && <Footer />}
      </div>
    </SearchProvider>
  );
}
