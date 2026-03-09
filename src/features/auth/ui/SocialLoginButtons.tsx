import { FacebookIcon, GoogleIcon, KakaoIcon } from '@/shared/ui/icons';

const comingSoon = (provider: string) => {
  alert(`${provider} 로그인은 준비 중입니다 🙇‍♂️\n일단 이메일로 로그인 해주세요!`);
};

export function SocialLoginButtons() {
  return (
    <>
      <button
        type="button"
        className="flex h-12 w-full items-center justify-start rounded-full border border-yellow-400 bg-white px-5 text-sm font-medium text-zinc-700 transition-colors hover:bg-yellow-100 active:scale-95 dark:border-yellow-600 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-yellow-900/40"
        onClick={() => comingSoon('카카오톡')}
      >
        <KakaoIcon className="mr-3 h-6 w-6" />
        카카오톡 계정으로 로그인
      </button>

      <button
        type="button"
        className="flex h-12 w-full items-center justify-start rounded-full border border-zinc-300 bg-white px-5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
        onClick={() => comingSoon('구글')}
      >
        <GoogleIcon className="mr-3 h-6 w-6" />
        구글 계정으로 로그인
      </button>

      <button
        type="button"
        className="flex h-12 w-full items-center justify-start rounded-full border border-blue-500 bg-white px-5 text-sm font-medium text-zinc-700 transition-colors hover:bg-blue-100 active:scale-95 dark:border-blue-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-blue-900/40"
        onClick={() => comingSoon('페이스북')}
      >
        <FacebookIcon className="mr-3 h-6 w-6" />
        페이스북 계정으로 로그인
      </button>
    </>
  );
}
