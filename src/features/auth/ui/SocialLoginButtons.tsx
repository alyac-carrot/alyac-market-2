import { Button } from '@/shared/ui/button';
import { FacebookIcon, GoogleIcon, KakaoIcon } from '@/shared/ui/icons';

const comingSoon = (provider: string) => {
  alert(`${provider} 로그인은 준비 중입니다 🙇‍♂️\n일단 이메일로 로그인 해주세요!`);
};

export function SocialLoginButtons() {
  return (
    <>
      <Button
        type="button"
        variant="outline"
        className="h-12 w-full justify-start rounded-full border border-yellow-400 text-zinc-700 hover:bg-yellow-100 active:scale-95"
        onClick={() => comingSoon('카카오톡')}
      >
        <KakaoIcon className="mr-3 h-6 w-6" />
        카카오톡 계정으로 로그인
      </Button>

      <Button
        type="button"
        variant="outline"
        className="h-12 w-full justify-start rounded-full border border-zinc-300 px-5 text-zinc-700 hover:bg-zinc-50 active:scale-95"
        onClick={() => comingSoon('구글')}
      >
        <GoogleIcon className="mr-3 h-6 w-6" />
        구글 계정으로 로그인
      </Button>

      <Button
        type="button"
        variant="outline"
        className="h-12 w-full justify-start rounded-full border border-blue-500 px-5 text-zinc-700 hover:bg-blue-100 active:scale-95"
        onClick={() => comingSoon('페이스북')}
      >
        <FacebookIcon className="mr-3 h-6 w-6" />
        페이스북 계정으로 로그인
      </Button>
    </>
  );
}
