import { Button } from '@/shared/ui';
import { AlertDialog } from '@/shared/ui';

export function HomePage() {
  return (
    <div className="flex min-h-[calc(100vh-56px-72px)] items-center justify-center">
      <div className="flex -translate-y-8 flex-col items-center gap-4">
        {/* 캐릭터 이미지 (public/mascot.png 추가하면 됨) */}
        <img src="/mascot.png" alt="mascot" className="h-[110px] w-[70px] object-contain" />

        <p className="text-sm text-zinc-900">유저를 검색해 팔로우 해보세요!</p>

        <Button className="rounded-full bg-green-500 px-10 py-6 text-base font-semibold text-white hover:bg-green-600">
          검색하기
        </Button>
      </div>
    </div>
  );
}
