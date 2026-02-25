import { Outlet, useMatch } from 'react-router-dom';

import { SearchProvider } from '@/shared/lib/search/SearchProvider';
import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';

export default function RootLayout() {
  const isUpload = useMatch('/upload/*');
  const isChatRoom = useMatch('/chat/:roomId');
  const isSignIn = useMatch('/');

  const isSearch = useMatch('/search/*');

  const hideHeader = Boolean(isSignIn);
  const hideFooter = Boolean(isUpload || isChatRoom || isSignIn);

  const layout = (
    <div className="min-h-screen">
      {!hideHeader && <Header />}

      <main className={`${hideHeader ? 'pt-0' : 'pt-16'} ${hideFooter ? '' : 'pb-16'}`}>
        <div className="mx-auto w-full px-4">
          <Outlet />
        </div>
      </main>

      {!hideFooter && <Footer />}
    </div>
  );

  if (isSearch) {
    return <SearchProvider>{layout}</SearchProvider>;
  }

  return layout;
}
