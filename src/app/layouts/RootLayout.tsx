import { Outlet } from 'react-router-dom';

import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';

export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}