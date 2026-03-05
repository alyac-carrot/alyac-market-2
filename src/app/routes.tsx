import { lazy } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import { RootLayout } from '@/app/layouts';
import { RequireAuth } from '@/entities/auth';

const SplashPage = lazy(() => import('@/pages/auth/splash'));
const LandingPage = lazy(() => import('@/pages/auth/LandingPage'));
const SignInPage = lazy(() => import('@/pages/auth/signin'));
const UploadPage = lazy(() => import('@/pages/upload/UploadPage'));
const ProfilePage = lazy(() => import('@/pages/profile/ProfilePage'));
const ProfileUpdatePage = lazy(() => import('@/pages/profile-update/ProfileUpdatePage'));
const PostPage = lazy(() => import('@/pages/post/PostPage'));
const EditPostPage = lazy(() => import('@/pages/post/EditPostPage'));
const SearchPage = lazy(() => import('@/pages/feed/search'));
const FeedPage = lazy(() => import('@/pages/feed'));
const ChatRoomPage = lazy(() => import('@/pages/chat/room'));
const ChatListPage = lazy(() => import('@/pages/chat'));
const NotFoundPage = lazy(() => import('@/pages/not-found/NotFoundPage'));
const FollowersPage = lazy(() => import('@/pages/followers/FollowersPage'));
const FollowingsPage = lazy(() => import('@/pages/followings/FollowingsPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <SplashPage /> }, // ✅ 첫 화면: 스플래시
      { path: 'auth/landing', element: <LandingPage /> }, // ✅ 랜딩 페이지 경로
      { path: 'auth/signin', element: <SignInPage /> }, // ✅ 로그인 (있으면)
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
          { path: 'profile-update', element: <ProfileUpdatePage /> },
          { path: 'followers/:accountname', element: <FollowersPage /> },
          { path: 'followings/:accountname', element: <FollowingsPage /> },

          { path: 'post-create', element: <PostPage /> },
          { path: 'post/:postId', element: <PostPage /> },
          { path: 'post/:postId/edit', element: <EditPostPage /> },
        ],
      },
    ],
  },

  { path: '*', element: <NotFoundPage /> },
]);
