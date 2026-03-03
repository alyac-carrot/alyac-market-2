import { lazy } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import { RootLayout } from '@/app/layouts';
import { RequireAuth } from '@/entities/auth';

const LandingPage = lazy(() => import('@/pages/auth/LandingPage'));
const SignInPage = lazy(() => import('@/pages/auth/signin'));
const UploadPage = lazy(() => import('@/pages/upload/UploadPage'));
const ProfilePage = lazy(() => import('@/pages/profile/ProfilePage'));
const PostPage = lazy(() => import('@/pages/post/PostPage'));
const EditPostPage = lazy(() => import('@/pages/post/EditPostPage'));
const SearchPage = lazy(() => import('@/pages/feed/search'));
const FeedPage = lazy(() => import('@/pages/feed'));
const ChatRoomPage = lazy(() => import('@/pages/chat/room'));
const ChatListPage = lazy(() => import('@/pages/chat'));
const NotFoundPage = lazy(() => import('@/pages/not-found/NotFoundPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'auth/signin', element: <SignInPage /> },
      {
        element: <RequireAuth />,
        children: [
          { path: 'feed', element: <FeedPage /> },
          { path: 'search', element: <SearchPage /> },

          { path: 'chat', element: <ChatListPage /> },
          { path: 'chat/:roomId', element: <ChatRoomPage /> },

          { path: 'upload', element: <UploadPage /> },
          { path: 'profile', element: <ProfilePage /> },
          { path: 'profile/:userId', element: <ProfilePage /> },

          { path: 'post-create', element: <PostPage /> },
          { path: 'post/:postId', element: <PostPage /> },
          { path: 'posts/:postId/edit', element: <EditPostPage /> },
        ],
      },
    ],
  },

  { path: '*', element: <NotFoundPage /> },
]);
