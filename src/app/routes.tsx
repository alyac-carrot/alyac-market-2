import { lazy, type ComponentType } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import { RootLayout } from '@/app/layouts';
import { RouterErrorPage } from '@/app/router-error';
import { RequireAuth } from '@/entities/auth';

function lazyWithRetry<T extends ComponentType<unknown>>(
  importer: () => Promise<{ default: T }>,
) {
  return lazy(async () => {
    try {
      const module = await importer();
      sessionStorage.removeItem('lazy-import-reloaded');
      return module;
    } catch (error) {
      const retryKey = 'lazy-import-reloaded';
      if (sessionStorage.getItem(retryKey) !== '1') {
        sessionStorage.setItem(retryKey, '1');
        window.location.reload();
      }
      throw error;
    }
  });
}

const SplashPage = lazyWithRetry(() => import('@/pages/auth/splash'));
const LandingPage = lazyWithRetry(() => import('@/pages/auth/LandingPage'));
const SignInPage = lazyWithRetry(() => import('@/pages/auth/signin'));
const SignUpPage = lazyWithRetry(() => import('@/pages/auth/signup'));
const CreatePostPage = lazyWithRetry(() => import('@/pages/post/CreatePostPage'));
const CreateProductPage = lazyWithRetry(() =>
  import('@/pages/product').then((m) => ({ default: m.CreateProductPage })),
);
const UpdateProductPage = lazyWithRetry(() =>
  import('@/pages/product').then((m) => ({ default: m.UpdateProductPage })),
);
const ProfilePage = lazyWithRetry(() =>
  import('@/pages/profile').then((m) => ({ default: m.ProfilePage })),
);
const ProfileUpdatePage = lazyWithRetry(() => import('@/pages/profile-update/ProfileUpdatePage'));
const PostPage = lazyWithRetry(() => import('@/pages/post/PostPage'));
const EditPostPage = lazyWithRetry(() => import('@/pages/post/EditPostPage'));
const SearchPage = lazyWithRetry(() => import('@/pages/feed/search'));
const FeedPage = lazyWithRetry(() => import('@/pages/feed'));
const ChatRoomPage = lazyWithRetry(() => import('@/pages/chat/room'));
const ChatListPage = lazyWithRetry(() => import('@/pages/chat'));
const NotFoundPage = lazyWithRetry(() => import('@/pages/not-found/NotFoundPage'));
const FollowersPage = lazyWithRetry(() =>
  import('@/pages/followers').then((m) => ({ default: m.FollowersPage })),
);
const FollowingsPage = lazyWithRetry(() =>
  import('@/pages/followings').then((m) => ({ default: m.FollowingsPage })),
);

const runtimeBasename =
  window.location.hostname === 'alyac-carrot.github.io' ? '/alyac-market-2/' : '/';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <RouterErrorPage />,
      children: [
        { index: true, element: <SplashPage /> },
        { path: 'auth/landing', element: <LandingPage /> },
        { path: 'auth/signin', element: <SignInPage /> },
        { path: 'auth/signup', element: <SignUpPage /> },
        {
          element: <RequireAuth />,
          children: [
            { path: 'feed', element: <FeedPage /> },
            { path: 'search', element: <SearchPage /> },
            { path: 'chat', element: <ChatListPage /> },
            { path: 'chat/:roomId', element: <ChatRoomPage /> },
            { path: 'post-create', element: <CreatePostPage /> },
            { path: 'product/create', element: <CreateProductPage /> },
            { path: 'product/:productId/edit', element: <UpdateProductPage /> },
            { path: 'profile', element: <ProfilePage /> },
            { path: 'profile/:userId', element: <ProfilePage /> },
            { path: 'profile-update', element: <ProfileUpdatePage /> },
            { path: 'followers/:accountname', element: <FollowersPage /> },
            { path: 'followings/:accountname', element: <FollowingsPage /> },
            { path: 'post/:postId', element: <PostPage /> },
            { path: 'post/:postId/edit', element: <EditPostPage /> },
          ],
        },
      ],
    },
    { path: '*', element: <NotFoundPage />, errorElement: <RouterErrorPage /> },
  ],
  {
    basename: runtimeBasename,
  },
);
