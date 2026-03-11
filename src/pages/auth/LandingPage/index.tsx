import { useNavigate } from 'react-router-dom';

import { SocialLoginButtons } from '@/features/auth';

export { GoogleIcon, FacebookIcon } from '@/shared/ui/icons';

const mascotUrl = `${import.meta.env.BASE_URL}mascot.png`;

export default function LandingPage() {
  const nav = useNavigate();

  return (
    <div className="bottom-sheet flex min-h-screen flex-col bg-green-500">
      <div className="flex flex-1 items-center justify-center">
        <img src={mascotUrl} alt="mascot" className="h-28 w-28 object-contain" />
      </div>

      <div className="rounded-t-3xl bg-white px-6 pt-8 pb-10 dark:bg-zinc-950">
        <div className="mx-auto w-full max-w-sm space-y-3">
          <SocialLoginButtons />

          <div className="mt-4 flex items-center justify-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
            <button
              type="button"
              className="cursor-pointer hover:text-zinc-800 dark:hover:text-zinc-200"
              onClick={() => nav('/auth/signin')}
            >
              이메일로 로그인
            </button>

            <span className="text-zinc-300 dark:text-zinc-600">|</span>

            <button
              type="button"
              className="cursor-pointer hover:text-zinc-800 dark:hover:text-zinc-200"
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
