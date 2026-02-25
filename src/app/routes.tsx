import { Suspense, lazy } from 'react';

import { createBrowserRouter } from 'react-router-dom';

const UploadPage = lazy(() => import('@/pages/upload/UploadPage'));
const ProfilePage = lazy(() => import('@/pages/profile/ProfilePage'));
const PostPage = lazy(() => import('@/pages/post/PostPage'));
const SearchPage = lazy(() => import('@/pages/home/search'));
const HomePage = lazy(() => import('@/pages/home'));
const ChatRoomPage = lazy(() => import('@/pages/chat/room'));
const RootLayout = lazy(() => import('@/app/layouts/RootLayout'));
const ChatListPage = lazy(() => import('@/pages/chat'));
const SignInPage = lazy(() => import('@/pages/auth/signin'));
const NotFoundPage = lazy(() => import('@/pages/not-found/NotFoundPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense
        fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}
      >
        <RootLayout />
      </Suspense>
    ),
    children: [
      { index: true, element: <HomePage /> },

      { path: 'search', element: <SearchPage /> },

      { path: 'chat', element: <ChatListPage /> },
      { path: 'chat/:roomId', element: <ChatRoomPage /> },

      { path: 'upload', element: <UploadPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'profile/:userId', element: <ProfilePage /> },

      { path: 'post-create', element: <PostPage /> },
      { path: 'post/:postId', element: <PostPage /> },

      { path: 'signin', element: <SignInPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
