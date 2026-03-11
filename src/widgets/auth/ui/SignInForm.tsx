import { Link } from 'react-router-dom';

import { useSignInForm } from '@/features/auth';
import { Button, Input } from '@/shared/ui';

export function SignInForm() {
  const { register, handleSubmit, errors, loading, canSubmit, bannerError, onSubmit } =
    useSignInForm();

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h1 className="text-foreground text-3xl font-bold">로그인</h1>
      </div>

      {bannerError && (
        <div className="rounded-xl bg-red-50 px-6 py-5 text-red-500">{bannerError}</div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-2">
          <label htmlFor="email" className="text-foreground block text-sm font-medium">
            이메일
          </label>

          <Input
            id="email"
            type="email"
            placeholder="이메일을 입력하세요"
            className="h-12"
            disabled={loading}
            autoComplete="email"
            {...register('email')}
          />

          {errors.email?.message && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-foreground block text-sm font-medium">
            비밀번호
          </label>

          <Input
            id="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            className="h-12"
            disabled={loading}
            autoComplete="current-password"
            {...register('password')}
          />

          {errors.password?.message && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={!canSubmit}
          className="h-14 w-full rounded-full bg-green-500 text-base font-semibold text-white hover:bg-green-600 disabled:opacity-50 disabled:hover:bg-green-500"
        >
          {loading ? '로그인 중...' : '로그인'}
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
  );
}
