import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/ui';

export function HomePage() {
  const nav = useNavigate();

  return (
    <div className="flex min-h-[calc(100vh-56px-72px)] items-center justify-center">
      <div className="flex -translate-y-8 flex-col items-center gap-4">
        <img src="/mascot.png" alt="마스코트" className="h-auto w-[90px]" />

        <p className="text-sm text-zinc-900">유저를 검색해 팔로우 해보세요!</p>

        <Button
          className="rounded-full px-10 py-6 text-base font-semibold"
          onClick={() => nav('/search')}
        >
          검색하기
        </Button>
      </div>
    </div>
  );
}
