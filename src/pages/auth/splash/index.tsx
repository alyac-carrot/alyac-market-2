import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { getToken } from '@/entities/auth';

const mascotUrl = `${import.meta.env.BASE_URL}mascot.png`;

export default function SplashPage() {
  const nav = useNavigate();

  useEffect(() => {
    const hasToken = !!getToken();

    const t = window.setTimeout(() => {
      if (hasToken) {
        nav('/feed', { replace: true });
      } else {
        nav('/auth/landing', { replace: true });
      }
    }, 3000);

    return () => window.clearTimeout(t);
  }, [nav]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-zinc-950">
      <div className="flex flex-col items-center">
        <img src={mascotUrl} alt="알약마켓" className="h-28 w-28 animate-bounce object-contain" />
        <p className="mt-4 animate-bounce text-2xl font-extrabold text-green-600">알약마켓</p>
      </div>
    </div>
  );
}
