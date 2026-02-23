import { createBrowserRouter } from 'react-router-dom';

import { RootLayout } from '@/app/layouts/RootLayout';
<<<<<<< HEAD
import { ChatListPage } from '@/pages/chat';
import { ChatRoomPage } from '@/pages/chat/room';
=======

>>>>>>> develop
import { HomePage } from '@/pages/home';
import { SearchPage } from '@/pages/home/search';
import { PostPage } from '@/pages/post';
import { UploadPage } from '@/pages/upload';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
<<<<<<< HEAD
      { index: true, element: <HomePage /> },
      { path: 'search', element: <SearchPage /> }, // ✅ /search
      { path: 'chat', element: <ChatListPage /> },
      { path: 'chat/:roomId', element: <ChatRoomPage /> },
=======
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'search',       
        element: <SearchPage />,
      },
      {
        path: 'post',
        element: <PostPage />,
      },
      {
        path: 'upload',
        element: <UploadPage />,
      },

>>>>>>> develop
    ],

  },
  
]);
