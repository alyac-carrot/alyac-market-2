import { useForm } from 'react-hook-form';

import { checkAccountname, useSignUpMutation } from '@/entities/auth';
import { accountnameRule, getApiErrorMessage, introRule, usernameRule } from '@/shared/lib';
import { Button, FieldGroup, UnderlineInput } from '@/shared/ui';

import { ProfileImagePicker } from './ProfileImagePicker';
import { AuthPageLayout } from './AuthPageLayout';
import type { Step1Values } from '../model/types';
import { useProfileImageUpload } from '../model/useProfileImageUpload';

type Step2Values = { username: string; accountname: string; intro: string };

export function SignUpStep2({ step1Data, onBack }: { step1Data: Step1Values; onBack: () => void }) {
  const signUpMutation = useSignUpMutation();
  const { imageFilename, uploadError, isUploading, handleImageChange } = useProfileImageUpload();

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
      // Use the dedicated uploadApi (VITE_API_BASE_URL) instead of the general axiosInstance
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
      setError('accountname', {
        message: `*${getApiErrorMessage(e, '계정 ID 확인 실패')}`,
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
          const msg = getApiErrorMessage(err, '회원가입에 실패했습니다.');
          setError('username', { message: `*${msg}` });
        },
      },
    );
  };

  const canSubmit = isValid && !signUpMutation.isPending;

  return (
    <AuthPageLayout>
      {/* back button */}
      <Button
        type="button"
        variant="ghost"
        onClick={onBack}
        className="mt-6 self-start text-sm text-zinc-400 hover:bg-transparent hover:text-zinc-700 dark:hover:text-zinc-200"
        style={{ paddingLeft: 0 }}
      >
        ← 이전
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

      <form className="mt-8 flex flex-col gap-8 pb-12" onSubmit={handleSubmit(onSubmit)} noValidate>
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
          aria-busy={signUpMutation.isPending}
          className="mt-4 h-14 w-full rounded-full bg-green-500 text-base font-semibold text-white hover:bg-green-600 disabled:opacity-50 disabled:hover:bg-green-500"
        >
          {signUpMutation.isPending ? '가입 중...' : '알약마켓 시작하기'}
        </Button>
      </form>
    </AuthPageLayout>
  );
}
