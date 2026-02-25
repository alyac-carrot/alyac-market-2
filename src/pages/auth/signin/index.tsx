import { useMemo, useState } from 'react';

import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import { signIn } from '@/entities/auth/api/authApi';
import { saveToken } from '@/entities/auth/lib/token';
import {
  isValidEmail,
  validateEmailLive,
  validateEmailOnSubmit,
  validatePasswordRequiredLive,
  validatePasswordRequiredOnSubmit,
} from '@/entities/auth/lib/validation';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null;

const getErrorMessage = (data: unknown): string | undefined => {
  if (!isObject(data)) return undefined;
  const msg = data.message;
  return typeof msg === 'string' ? msg : undefined;
};

type FieldErrors = {
  email?: string;
  password?: string;
};

export default function SignInPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const [bannerError, setBannerError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    const emailOk = isValidEmail(email);
    const pwOk = password.trim().length > 0;
    return emailOk && pwOk && !loading;
  }, [email, password, loading]);

  const handleChangeEmail = (v: string) => {
    setEmail(v);
    setBannerError(null);

    const msg = validateEmailLive(v);
    setFieldErrors((prev) => ({ ...prev, email: msg }));
  };

  const handleChangePassword = (v: string) => {
    setPassword(v);
    setBannerError(null);

    const msg = validatePasswordRequiredLive(v);
    setFieldErrors((prev) => ({ ...prev, password: msg }));
  };

  const validateOnSubmit = (): boolean => {
    const next: FieldErrors = {};

    const emailMsg = validateEmailOnSubmit(email);
    if (emailMsg) next.email = emailMsg;

    const pwMsg = validatePasswordRequiredOnSubmit(password);
    if (pwMsg) next.password = pwMsg;

    setFieldErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBannerError(null);

    if (!validateOnSubmit()) return;

    try {
      setLoading(true);

      const res = await signIn({ email: email.trim(), password: password.trim() });

      const { accessToken, refreshToken } = res.data.user;
      saveToken(accessToken, refreshToken);

      navigate('/feed', { replace: true });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 422) {
          setBannerError('이메일 또는 비밀번호가 일치하지 않습니다.');
          return;
        }
        setBannerError(getErrorMessage(err.response?.data) ?? '로그인에 실패했습니다.');
        return;
      }
      setBannerError('로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background flex min-h-screen items-start justify-center px-3 pt-20">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-foreground text-3xl font-bold">로그인</h1>
        </div>

        {bannerError && (
          <div className="rounded-xl bg-red-50 px-6 py-5 text-red-500">{bannerError}</div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
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
              value={email}
              onChange={(e) => handleChangeEmail(e.target.value)}
              disabled={loading}
              autoComplete="email"
            />

            {fieldErrors.email && <p className="text-sm text-red-500">{fieldErrors.email}</p>}
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
              value={password}
              onChange={(e) => handleChangePassword(e.target.value)}
              disabled={loading}
              autoComplete="current-password"
            />

            {fieldErrors.password && <p className="text-sm text-red-500">{fieldErrors.password}</p>}
          </div>

          <Button
            type="submit"
            disabled={!canSubmit}
            className="h-14 w-full rounded-full bg-[#6FCA3C] text-base font-semibold text-white hover:bg-[#5CB32A] disabled:opacity-50 disabled:hover:bg-[#6FCA3C]"
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
    </div>
  );
}
