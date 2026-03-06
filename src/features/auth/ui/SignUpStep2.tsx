import { useRef, useState } from 'react';

import axios from 'axios';
import { useForm } from 'react-hook-form';

import { checkAccountname, useSignUpMutation } from '@/entities/auth';
import uploadApi from '@/shared/api/uploadApi';
import { normalizeUploadPath, toImageUrl } from '@/shared/lib';
import { Avatar, FieldGroup, UnderlineInput } from '@/shared/ui';

import type { Step1Values } from './SignUpStep1';

type Step2Values = { username: string; accountname: string; intro: string };

const accountnamePattern = /^[a-zA-Z0-9_.]+$/;

export function SignUpStep2({ step1Data, onBack }: { step1Data: Step1Values; onBack: () => void }) {
  const signUpMutation = useSignUpMutation();
  // filename stored as returned by server (e.g. "1234567890.jpg")
  const [imageFilename, setImageFilename] = useState<string>('');
  const [uploadError, setUploadError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      if (axios.isAxiosError(e)) {
        setError('accountname', {
          message: `*${e.response?.data?.message ?? '계정 ID 확인 실패'}`,
        });
        return;
      }
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
          if (axios.isAxiosError(err)) {
            const msg = err.response?.data?.message ?? '회원가입에 실패했습니다.';
            setError('username', { message: `*${msg}` });
          }
        },
      },
    );
  };

  const canSubmit = isValid && !signUpMutation.isPending;

  return (
    <div className="flex min-h-screen flex-col bg-white px-8">
      {/* back button */}
      <button
        type="button"
        onClick={onBack}
        className="mt-6 self-start text-sm text-zinc-400 hover:text-zinc-700"
      >
        ← 이전
      </button>

      <h1 className="mt-6 text-center text-2xl font-medium text-black">프로필 설정</h1>
      <p className="mt-2 text-center text-sm text-zinc-400">계정 ID는 변경할 수 없습니다.</p>

      {/* profile image picker */}
      <div className="relative mx-auto mt-8">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="transition-opacity hover:opacity-80 focus:outline-none"
          aria-label="프로필 사진 변경"
        >
          <Avatar
            src={imageFilename ? toImageUrl(imageFilename) : undefined}
            alt="프로필"
            size="md"
            className="h-28 w-28"
          />
        </button>
        {/* green upload badge */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="absolute right-0 bottom-0 flex h-9 w-9 items-center justify-center rounded-full bg-green-400 shadow-md transition-colors hover:bg-green-500"
        >
          <svg
            className="h-4 w-4 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>
      {isUploading && <p className="mt-2 text-center text-xs text-zinc-400">업로드 중...</p>}
      {uploadError && <p className="mt-2 text-center text-xs text-red-400">{uploadError}</p>}

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
            {...register('username', {
              required: '*사용자 이름을 입력해 주세요.',
              minLength: { value: 2, message: '*2자 이상 입력해 주세요.' },
              maxLength: { value: 10, message: '*10자 이하로 입력해 주세요.' },
            })}
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
            {...register('accountname', {
              required: '*계정 ID를 입력해 주세요.',
              maxLength: { value: 20, message: '*20자 이하로 입력해 주세요.' },
              pattern: {
                value: accountnamePattern,
                message: '*영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.',
              },
            })}
          />
        </FieldGroup>

        <FieldGroup label="소개" error={errors.intro?.message}>
          <UnderlineInput
            id="signup-intro"
            type="text"
            placeholder="자신과 판매할 상품에 대해 소개해 주세요!"
            {...register('intro', {
              maxLength: { value: 60, message: '*60자 이하로 입력해 주세요.' },
            })}
          />
        </FieldGroup>

        <button
          type="submit"
          disabled={!canSubmit}
          className={`mt-4 h-11 w-full rounded-full text-sm font-medium text-white transition-colors ${
            canSubmit
              ? 'bg-green-400 hover:bg-green-500 active:scale-95'
              : 'cursor-not-allowed bg-green-200'
          }`}
        >
          {signUpMutation.isPending ? '가입 중...' : '알약마켓 시작하기'}
        </button>
      </form>
    </div>
  );
}
