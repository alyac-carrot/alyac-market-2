import { useRef, useState } from 'react';

import axios from 'axios';
import { useForm } from 'react-hook-form';

import { checkAccountname, checkEmail, useSignUpMutation } from '@/entities/auth';
import { toImageUrl } from '@/shared/lib';
import uploadApi from '@/shared/api/uploadApi';
import { Avatar } from '@/shared/ui/Avatar';

/* ─── types ─── */
type Step1Values = { email: string; password: string };
type Step2Values = { username: string; accountname: string; intro: string };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const accountnamePattern = /^[a-zA-Z0-9_.]+$/;

/* ─── shared field wrapper ─── */
function FieldGroup({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-medium text-zinc-500">{label}</label>
      {children}
      {error && <p className="text-xs text-green-500">{error}</p>}
      {!error && hint && <p className="text-xs text-zinc-400">{hint}</p>}
    </div>
  );
}

/* ─── underline input ─── */
function UnderlineInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full border-0 border-b border-zinc-200 bg-transparent pb-1 text-sm text-zinc-900 placeholder-zinc-300 outline-none focus:border-green-500 transition-colors"
    />
  );
}

/* ───────────────────────────────────────────
   STEP 1 — 이메일 + 비밀번호
─────────────────────────────────────────── */
function Step1({
  onNext,
}: {
  onNext: (data: Step1Values) => void;
}) {
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
      if (axios.isAxiosError(e)) {
        setError('email', { message: `*${e.response?.data?.message ?? '이메일 확인 실패'}` });
        return;
      }
    }
    onNext({ email: values.email.trim(), password: values.password });
  };

  const canSubmit = isValid && !isSubmitting;

  return (
    <div className="flex min-h-screen flex-col bg-white px-8">
      <h1 className="mt-14 text-2xl font-medium text-black">이메일로 회원가입</h1>

      <form className="mt-12 flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)} noValidate>
        <FieldGroup label="이메일" error={errors.email?.message}>
          <UnderlineInput
            id="signup-email"
            type="email"
            placeholder="이메일 주소를 입력해 주세요."
            autoComplete="email"
            {...register('email', {
              required: '*이메일을 입력해 주세요.',
              pattern: { value: emailPattern, message: '*올바른 이메일 형식을 입력해 주세요.' },
            })}
          />
        </FieldGroup>

        <FieldGroup label="비밀번호" error={errors.password?.message}>
          <UnderlineInput
            id="signup-password"
            type="password"
            placeholder="비밀번호를 설정해 주세요."
            autoComplete="new-password"
            {...register('password', {
              required: '*비밀번호를 입력해 주세요.',
              minLength: { value: 6, message: '*비밀번호는 6자 이상이어야 합니다.' },
            })}
          />
        </FieldGroup>

        <button
          type="submit"
          disabled={!canSubmit}
          className={`mt-4 h-11 w-full rounded-full text-sm font-medium text-white transition-colors ${
            canSubmit ? 'bg-green-400 hover:bg-green-500 active:scale-95' : 'bg-green-200 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? '확인 중...' : '다음'}
        </button>
      </form>
    </div>
  );
}

/* ───────────────────────────────────────────
   STEP 2 — 프로필 설정
─────────────────────────────────────────── */
function Step2({
  step1Data,
  onBack,
}: {
  step1Data: Step1Values;
  onBack: () => void;
}) {
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
      // Use the dedicated uploadApi (VITE_UPLOAD_BASE_URL) — not the general axiosInstance
      const res = await uploadApi.post<{ filename: string }>('/image/uploadfile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // Store only filename; the server expects this relative value
      setImageFilename(res.data.filename);
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
        setError('accountname', { message: `*${e.response?.data?.message ?? '계정 ID 확인 실패'}` });
        return;
      }
    }

    signUpMutation.mutate({
      email: step1Data.email,
      password: step1Data.password,
      username: values.username.trim(),
      accountname: values.accountname.trim(),
      intro: values.intro.trim(),
      image: imageFilename ? `uploadFiles/${imageFilename}` : '',
    }, {
      onError: (err) => {
        if (axios.isAxiosError(err)) {
          const msg = err.response?.data?.message ?? '회원가입에 실패했습니다.';
          setError('username', { message: `*${msg}` });
        }
      },
    });
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
      <p className="mt-2 text-center text-sm text-zinc-400">나중에 언제든지 변경할 수 있습니다.</p>

      {/* profile image picker */}
      <div className="relative mx-auto mt-8">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="hover:opacity-80 transition-opacity focus:outline-none"
          aria-label="프로필 사진 변경"
        >
          <Avatar
            src={imageFilename ? toImageUrl(`uploadFiles/${imageFilename}`) : undefined}
            alt="프로필"
            size="md"
            className="h-28 w-28"
          />
        </button>
        {/* green upload badge */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="absolute right-0 bottom-0 flex h-9 w-9 items-center justify-center rounded-full bg-green-400 shadow-md hover:bg-green-500 transition-colors"
        >
          <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
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
              maxLength: { value: 50, message: '*50자 이하로 입력해 주세요.' },
            })}
          />
        </FieldGroup>

        <button
          type="submit"
          disabled={!canSubmit}
          className={`mt-4 h-11 w-full rounded-full text-sm font-medium text-white transition-colors ${
            canSubmit
              ? 'bg-green-400 hover:bg-green-500 active:scale-95'
              : 'bg-green-200 cursor-not-allowed'
          }`}
        >
          {signUpMutation.isPending ? '가입 중...' : '알약마켓 시작하기'}
        </button>
      </form>
    </div>
  );
}

/* ───────────────────────────────────────────
   ROOT — orchestrates both steps
─────────────────────────────────────────── */
export default function SignUpPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [step1Data, setStep1Data] = useState<Step1Values>({ email: '', password: '' });

  if (step === 1) {
    return (
      <Step1
        onNext={(data) => {
          setStep1Data(data);
          setStep(2);
        }}
      />
    );
  }

  return <Step2 step1Data={step1Data} onBack={() => setStep(1)} />;
}
