import { Outlet } from 'react-router-dom';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';

export function RootLayout() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-16 pb-16">
        <div className="mx-auto w-full max-w-7xl px-4">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}
