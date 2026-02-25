import { Link } from 'react-router-dom';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

export default function SignInPage() {
  return (
    <div className="bg-background flex min-h-screen items-start justify-center px-3 pt-20">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-foreground text-3xl font-bold">로그인</h1>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-foreground block text-sm font-medium">
              이메일
            </label>

            <Input
              id="email"
              name="email"
              type="email"
              placeholder="이메일을 입력하세요."
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-foreground block text-sm font-medium">
              비밀번호
            </label>

            <Input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호를 입력하세요."
              className="h-12"
            />
          </div>

          <Button
            type="submit"
            disabled
            className="h-14 w-full rounded-full bg-[#6FCA3C] text-base font-semibold text-white hover:bg-[#5CB32A] disabled:opacity-50 disabled:hover:bg-[#6FCA3C]"
          >
            로그인
          </Button>

          <div className="text-center">
            <Link
              to="/auth/signup"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              이메일로 회원가입
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
