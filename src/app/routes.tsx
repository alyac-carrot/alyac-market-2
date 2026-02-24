import { createBrowserRouter } from 'react-router-dom';

import { RootLayout } from '@/app/layouts/RootLayout';
import { ChatListPage } from '@/pages/chat';
import { ChatRoomPage } from '@/pages/chat/room';
import { HomePage } from '@/pages/home';
import { SearchPage } from '@/pages/home/search';
import { PostPage } from '@/pages/post';
import { ProfilePage } from '@/pages/profile';
import { UploadPage } from '@/pages/upload';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },

      { path: 'search', element: <SearchPage /> },

      { path: 'chat', element: <ChatListPage /> },
      { path: 'chat/:roomId', element: <ChatRoomPage /> },

      { path: 'upload', element: <UploadPage /> },

      { path: 'profile', element: <ProfilePage /> },
      { path: 'profile/:userId', element: <ProfilePage /> },
    ],
  },
  {
    path: '/post-create',
    element: <PostPage />,
  },
  {
    path: '/post/:postId',
    element: <PostPage />,
  },
]);
