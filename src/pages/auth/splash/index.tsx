import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

export default function SplashPage() {
  const nav = useNavigate();

  useEffect(() => {
    const t = window.setTimeout(() => {
      nav('/auth/landing', { replace: true }); // 뒤로가기로 스플래시 안 돌아오게
    }, 3000); // 3초

    return () => window.clearTimeout(t);
  }, [nav]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        {/* public/mascot.png */}
        <img src="/mascot.png" alt="알약마켓" className="h-28 w-28 animate-bounce" />

        <p className="mt-4 animate-bounce text-2xl font-extrabold text-green-600">알약마켓</p>
      </div>
    </div>
  );
}
