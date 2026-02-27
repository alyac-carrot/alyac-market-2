import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/ui/button';

const comingSoon = (provider: string) => {
  alert(`${provider} 로그인은 준비 중입니다 🙇‍♂️\n일단 이메일로 로그인 해주세요!`);
};

export default function LandingPage() {
  const nav = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-green-500">
      {/* 상단 로고 영역 */}
      <div className="flex flex-1 items-center justify-center">
        <img src="/mascot.png" alt="mascot" className="h-28 w-28" />
      </div>

      {/* 하단 카드 */}
      <div className="rounded-t-3xl bg-white px-6 pt-8 pb-10">
        <div className="mx-auto w-full max-w-sm space-y-3">
          {/* 카카오 로그인 (UI만) */}
          <Button
            type="button"
            variant="outline"
            className="h-12 w-full justify-start rounded-full border border-yellow-400 text-zinc-700 hover:bg-yellow-100 active:scale-95"
            onClick={() => comingSoon('카카오톡')}
          >
            <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-black">
              K
            </span>
            카카오톡 계정으로 로그인
          </Button>

          {/* 구글 로그인 */}
          <Button
            type="button"
            variant="outline"
            className="h-12 w-full justify-start rounded-full border border-zinc-300 px-5 text-zinc-700 hover:bg-zinc-50 active:scale-95"
            onClick={() => comingSoon('구글')}
          >
            <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-zinc-700 ring-1 ring-zinc-200">
              G
            </span>
            구글 계정으로 로그인
          </Button>

          {/* 페이스북 로그인 */}
          <Button
            type="button"
            variant="outline"
            className="h-12 w-full justify-start rounded-full border border-blue-500 px-5 text-zinc-700 hover:bg-blue-100 active:scale-95"
            onClick={() => comingSoon('페이스북')}
          >
            <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              f
            </span>
            페이스북 계정으로 로그인
          </Button>

          {/* 하단 링크 */}
          <div className="mt-4 flex items-center justify-center gap-4 text-sm text-zinc-500">
            <button
              type="button"
              className="cursor-pointer hover:text-zinc-800"
              onClick={() => nav('/auth/signin')}
            >
              이메일로 로그인
            </button>

            <span className="text-zinc-300">|</span>

            <button
              type="button"
              className="cursor-pointer hover:text-zinc-800"
              onClick={() => nav('/auth/signup')}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
