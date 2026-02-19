import { createBrowserRouter } from 'react-router-dom';

import RootLayout from '@/app/layouts/RootLayout';
import { HomePage } from '@/pages/home';

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

      // 페이지 만들면 아래 주석 해제
      // { path: "chat", element: <ChatPage /> },
      // { path: "write", element: <WritePage /> },
      // { path: "profile", element: <ProfilePage /> },
    ],
  },
]);
