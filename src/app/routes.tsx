import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/app/layouts/RootLayout';

import { HomePage } from '@/pages/home';
import { PostPage } from '@/pages/post';
import { UploadPage } from '@/pages/upload';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: '/post',
    element: <PostPage />,
  },
  {
    path: '/upload',
    element: <UploadPage />,
  },
]);
