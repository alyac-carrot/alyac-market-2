import { createBrowserRouter } from 'react-router-dom';

// Route Guard - 로그인 상태이면 피드 페이지로 리다이렉트 역할하는 컴포넌트
import { RequireGuest } from '@/features/auth';
import { FeedPage } from '@/pages/feed';
// Pages
import { HomePage } from '@/pages/home';
import { SignInPage } from '@/pages/signin';

import { RootLayout } from './layouts/RootLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      // 로그인이 필요 없는 페이지 (Guest만)
      {
        path: 'signin',
        element: (
          <RequireGuest>
            <SignInPage />
          </RequireGuest>
        ),
      },
      // 보호된 페이지 (인증 필요)
      {
        path: 'feed',
        element: <FeedPage />,
      },
    ],
  },
]);
