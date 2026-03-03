import { Suspense } from 'react';

import { Outlet, useMatch } from 'react-router-dom';

import { useMeQuery } from '@/entities/user';
import { SearchProvider } from '@/shared/lib/search/SearchProvider';
import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';

export default function RootLayout() {
  useMeQuery();
  const isUpload = useMatch('/upload/*');
  const isChatRoom = useMatch('/chat/:roomId');
  const isLending = useMatch('/');
  const isSignin = useMatch('/auth/signin');
  const inSignup = useMatch('/auth/signup');
  const isEditPost = useMatch('/posts/:postId/edit');

  const isSearch = useMatch('/search/*');

  const hideHeader = Boolean(isLending || isSignin || inSignup);
  const hideFooter = Boolean(
    isUpload || isChatRoom || isLending || isSignin || inSignup || isEditPost,
  );

  const layout = (
    <div className="min-h-screen">
      {!hideHeader && <Header />}

      <main className={`${hideHeader ? 'pt-0' : 'pt-16'} ${hideFooter ? '' : 'pb-16'}`}>
        <div className="mx-auto w-full px-4">
          <Suspense
            fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}
          >
            <Outlet />
          </Suspense>
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
