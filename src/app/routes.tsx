import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/app/layouts/RootLayout';

import { HomePage } from '@/pages/home';
import { SearchPage } from '@/pages/SearchPage.tsx';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'search',       
        element: <SearchPage />,
      },
    ],
  },
]);
