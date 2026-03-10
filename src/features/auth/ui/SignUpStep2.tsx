import { useState } from 'react';

import { ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { checkAccountname, useSignUpMutation } from '@/entities/auth';
import uploadApi from '@/shared/api/uploadApi';
import { accountnameRule, cn, introRule, normalizeUploadPath, usernameRule } from '@/shared/lib';
import { classifyError } from '@/shared/lib/error-handling/globalErrorHandler';
import { Button, FieldGroup, UnderlineInput } from '@/shared/ui';

import { ProfileImagePicker } from './ProfileImagePicker';
import type { Step1Values } from './SignUpStep1';

type Step2Values = { username: string; accountname: string; intro: string };

export function SignUpStep2({ step1Data, onBack }: { step1Data: Step1Values; onBack: () => void }) {
  const signUpMutation = useSignUpMutation();
  // filename stored as returned by server (e.g. "1234567890.jpg")
  const [imageFilename, setImageFilename] = useState<string>('');
  const [uploadError, setUploadError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<Step2Values>({
    mode: 'onChange',
    defaultValues: { username: '', accountname: '', intro: '' },
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError('');
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      // Use the dedicated uploadApi (VITE_BASE_URL) — not the general axiosInstance
      const res = await uploadApi.post<{ filename: string }>('/image/uploadfile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // Store the relative path expected by the server
      setImageFilename(normalizeUploadPath(res.data.filename));
    } catch {
      setUploadError('이미지 업로드에 실패했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (values: Step2Values) => {
    // accountname duplicate check
    try {
      const res = await checkAccountname(values.accountname.trim());
      if (!res.data.ok) {
        setError('accountname', { message: `*${res.data.message}` });
        return;
      }
    } catch (e) {
      const errorState = classifyError(e);
      setError('accountname', {
        message: `*${errorState.message ?? '계정 ID 확인 실패'}`,
      });
      return;
    }

    signUpMutation.mutate(
      {
        email: step1Data.email,
        password: step1Data.password,
        username: values.username.trim(),
        accountname: values.accountname.trim(),
        intro: values.intro.trim(),
        image: imageFilename || '',
      },
      {
        onError: (err) => {
          const errorState = classifyError(err);
          setError('username', { message: `*${errorState.message ?? '회원가입에 실패했습니다.'}` });
        },
      },
    );
  };

  const canSubmit = isValid && !signUpMutation.isPending;

  return (
    <div className="flex min-h-screen flex-col bg-white px-8 dark:bg-zinc-950">
      {/* back button */}
      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={onBack}
        aria-label="이전 단계로 돌아가기"
        className="mt-6 self-start text-zinc-400 hover:bg-transparent hover:text-zinc-700 focus-visible:ring-2 dark:hover:text-zinc-200"
      >
        <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
        이전
      </Button>

      <h1 className="mt-6 text-center text-2xl font-medium text-black dark:text-white">
        프로필 설정
      </h1>
      <p className="mt-2 text-center text-sm text-zinc-400">계정 ID는 변경할 수 없습니다.</p>

      {/* profile image picker */}
      <ProfileImagePicker
        imageFilename={imageFilename}
        isUploading={isUploading}
        uploadError={uploadError}
        onImageChange={handleImageChange}
      />

      <form className="mt-8 flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)} noValidate>
        <FieldGroup
          label="사용자 이름"
          error={errors.username?.message}
          hint="2~10자 이내여야 합니다."
        >
          <UnderlineInput
            id="signup-username"
            type="text"
            placeholder="2~10자 이내여야 합니다."
            {...register('username', usernameRule)}
          />
        </FieldGroup>

        <FieldGroup
          label="계정 ID"
          error={errors.accountname?.message}
          hint="영문, 숫자, 특수문자(.), (_)만 사용 가능합니다."
        >
          <UnderlineInput
            id="signup-accountname"
            type="text"
            placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
            {...register('accountname', accountnameRule)}
          />
        </FieldGroup>

        <FieldGroup label="소개" error={errors.intro?.message}>
          <UnderlineInput
            id="signup-intro"
            type="text"
            placeholder="자신과 판매할 상품에 대해 소개해 주세요!"
            {...register('intro', introRule)}
          />
        </FieldGroup>

        <Button
          type="submit"
          disabled={!canSubmit}
          className={cn(
            'mt-4 h-11 w-full rounded-full text-sm font-medium text-white transition-colors disabled:opacity-100',
            canSubmit
              ? 'bg-green-400 hover:bg-green-500 active:scale-95'
              : 'cursor-not-allowed bg-green-200',
          )}
        >
          {signUpMutation.isPending ? '가입 중...' : '알약마켓 시작하기'}
        </Button>
      </form>
    </div>
  );
}
