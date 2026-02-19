import { createBrowserRouter } from 'react-router-dom';

import RootLayout from '@/app/layouts/RootLayout';
import { HomePage } from '@/pages/home';
import { SearchPage } from '@/pages/home/search';

// TODO: 아래 3개는 페이지 만들고 추가
// import { ChatPage } from "@/pages/chat";
// import { WritePage } from "@/pages/write";
// import { ProfilePage } from "@/pages/profile";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'search', element: <SearchPage /> }, // ✅ /search
    ],
  },
]);
