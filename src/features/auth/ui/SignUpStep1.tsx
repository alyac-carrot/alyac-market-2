import { useForm } from 'react-hook-form';

import { checkEmail } from '@/entities/auth';
import { emailRule, getApiErrorMessage, passwordRule } from '@/shared/lib';
import { Button, FieldGroup, UnderlineInput } from '@/shared/ui';

import type { Step1Values } from '../model/types';
import { AuthPageLayout } from './AuthPageLayout';

export function SignUpStep1({ onNext }: { onNext: (data: Step1Values) => void }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<Step1Values>({ mode: 'onChange', defaultValues: { email: '', password: '' } });

  const onSubmit = async (values: Step1Values) => {
    try {
      const res = await checkEmail(values.email.trim());
      if (!res.data.ok) {
        setError('email', { message: `*${res.data.message}` });
        return;
      }
    } catch (e) {
      setError('email', { message: `*${getApiErrorMessage(e, '이메일 확인 실패')}` });
      return;
    }
    onNext({ email: values.email.trim(), password: values.password });
  };

  const canSubmit = isValid && !isSubmitting;

  return (
    <AuthPageLayout>
      <h1 className="mt-14 text-2xl font-medium text-black dark:text-white">이메일로 회원가입</h1>

      <form className="mt-12 flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)} noValidate>
        <FieldGroup label="이메일" error={errors.email?.message}>
          <UnderlineInput
            id="signup-email"
            type="email"
            placeholder="이메일 주소를 입력해 주세요."
            autoComplete="email"
            {...register('email', emailRule)}
          />
        </FieldGroup>

        <FieldGroup label="비밀번호" error={errors.password?.message}>
          <UnderlineInput
            id="signup-password"
            type="password"
            placeholder="비밀번호를 설정해 주세요."
            autoComplete="new-password"
            {...register('password', passwordRule)}
          />
        </FieldGroup>

        <Button
          type="submit"
          disabled={!canSubmit}
          aria-busy={isSubmitting}
          className="mt-4 h-14 w-full rounded-full bg-green-500 text-base font-semibold text-white hover:bg-green-600 disabled:opacity-50 disabled:hover:bg-green-500"
        >
          {isSubmitting ? '확인 중...' : '다음'}
        </Button>
      </form>
    </AuthPageLayout>
  );
}
