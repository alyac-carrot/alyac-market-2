import { Suspense } from 'react';

import { Outlet, useMatch } from 'react-router-dom';

import { useMeQuery } from '@/entities/user';
import { SearchProvider } from '@/shared/lib/search/SearchProvider';
import { Footer } from '@/widgets/footer';

export default function RootLayout() {
  useMeQuery();
  const isChatRoom = useMatch('/chat/:roomId');
  const isLending = useMatch('/');
  const ishome = useMatch('/auth/landing');
  const isSignin = useMatch('/auth/signin');
  const inSignup = useMatch('/auth/signup');
  const isPostCreate = useMatch('/post-create');
  const isEditPost = useMatch('/post/:postId/edit');
  const isPostDetail = useMatch('/post/:postId');
  const isProfileUpdate = useMatch('/profile-update');
  const isSearch = useMatch('/search/*');
  const isProductCreate = useMatch('/product/create');
  const isProductUpdate = useMatch('/product/:productId/edit');

  const hideFooter = Boolean(
    isPostCreate ||
    isChatRoom ||
    isLending ||
    isSignin ||
    inSignup ||
    isEditPost ||
    ishome ||
    isPostDetail ||
    isProfileUpdate ||
    isProductCreate ||
    isProductUpdate,
  );

  const layout = (
    <div className="min-h-screen">
      <main className={`${hideFooter ? '' : 'pb-16'}`}>
        <div className="mx-auto w-full">
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
