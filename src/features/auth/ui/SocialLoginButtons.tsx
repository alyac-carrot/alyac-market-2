import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui';
import { FacebookIcon, GoogleIcon, KakaoIcon } from '@/shared/ui/icons';

const comingSoon = (provider: string) => {
  alert(`${provider} 로그인은 준비 중입니다 🙇‍♂️\n일단 이메일로 로그인 해주세요!`);
};

export function SocialLoginButtons() {
  return (
    <>
      <Button
        variant="outline"
        onClick={() => comingSoon('카카오톡')}
        className={cn(
          'h-12 w-full justify-start rounded-full px-5 text-sm font-medium',
          'border-yellow-400 text-zinc-700 hover:bg-yellow-100 dark:border-yellow-600 dark:text-zinc-200 dark:hover:bg-yellow-900/40',
        )}
      >
        <KakaoIcon className="mr-3 h-6 w-6" aria-hidden="true" />
        카카오톡 계정으로 로그인
      </Button>

      <Button
        variant="outline"
        onClick={() => comingSoon('구글')}
        className={cn(
          'h-12 w-full justify-start rounded-full border-zinc-300 px-5 text-sm font-medium',
          'text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800',
        )}
      >
        <GoogleIcon className="mr-3 h-6 w-6" aria-hidden="true" />
        구글 계정으로 로그인
      </Button>

      <Button
        variant="outline"
        onClick={() => comingSoon('페이스북')}
        className={cn(
          'h-12 w-full justify-start rounded-full px-5 text-sm font-medium',
          'border-blue-500 text-zinc-700 hover:bg-blue-100 dark:border-blue-700 dark:text-zinc-200 dark:hover:bg-blue-900/40',
        )}
      >
        <FacebookIcon className="mr-3 h-6 w-6" aria-hidden="true" />
        페이스북 계정으로 로그인
      </Button>
    </>
  );
}
