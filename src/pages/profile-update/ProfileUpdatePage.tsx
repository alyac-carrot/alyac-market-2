import { useEffect, useMemo, useRef, useState } from 'react';

import type { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import { ProfileImageEditIcon } from '@/assets/icon';
import { useUploadFiles } from '@/entities/upload';
import { type User, useMeQuery, useUpdateMyProfileMutation } from '@/entities/user';
import { toImageUrl } from '@/shared/lib';
import { Avatar } from '@/shared/ui';
import { ProfileUpdateHeader } from '@/widgets/header/ui/ProfileUpdateHeader';

type FormState = {
  username: string;
  accountname: string;
  intro: string;
  image: string;
};

function normalizeUploadPath(filename: string) {
  const trimmed = filename?.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('uploadFiles/')) return trimmed;
  if (trimmed.startsWith('/uploadFiles/')) return trimmed.replace(/^\/+/, '');
  return `uploadFiles/${trimmed.replace(/^\/+/, '')}`;
}

const sampleInputClass =
  'border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground ' +
  'focus-visible:ring-ring flex w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent ' +
  'file:text-sm file:font-medium focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ' +
  'h-12 border-t-0 border-r-0 border-b-2 border-l-0 pl-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none';

const sampleDisabledClass = sampleInputClass.replace('disabled:opacity-50', 'disabled:opacity-60');

export default function ProfileUpdatePage() {
  const meQuery = useMeQuery();

  if (meQuery.isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (meQuery.isError || !meQuery.data?.user) {
    return (
      <div className="text-muted-foreground p-6 text-center text-sm">
        내 정보를 불러오지 못했습니다.
      </div>
    );
  }

  const me = meQuery.data.user;

  return <ProfileUpdateForm key={me._id} me={me} />;
}

function ProfileUpdateForm({ me }: { me: User }) {
  const navigate = useNavigate();

  const updateMutation = useUpdateMyProfileMutation();
  const uploadMutation = useUploadFiles();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [form, setForm] = useState<FormState>(() => ({
    username: me.username ?? '',
    accountname: me.accountname ?? '',
    intro: me.intro ?? '',
    image: me.image ?? '',
  }));

  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const avatarSrc = useMemo(() => {
    if (previewUrl) return previewUrl;
    if (!form.image?.trim()) return '';
    return toImageUrl(form.image);
  }, [previewUrl, form.image]);

  const canSave = useMemo(() => {
    if (updateMutation.isPending || uploadMutation.isPending) return false;
    if (!form.username.trim()) return false;
    if (!form.accountname.trim()) return false;
    return true;
  }, [form.username, form.accountname, updateMutation.isPending, uploadMutation.isPending]);

  const onPickImage = () => fileInputRef.current?.click();

  const onChangeFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    uploadMutation.mutate([file], {
      onSuccess: (data) => {
        const filename = data?.[0]?.filename ?? '';
        const normalized = normalizeUploadPath(filename);

        setForm((prev) => ({
          ...prev,
          image: normalized,
        }));
      },
      onError: (err: unknown) => {
        const axiosErr = err as AxiosError<{ message?: string }>;

        const message =
          axiosErr?.response?.data?.message ??
          (axiosErr instanceof Error ? axiosErr.message : 'unknown');

        alert('업로드 실패: ' + message);

        setPreviewUrl('');
      },
    });
  };

  const onSave = () => {
    if (!canSave) return;

    updateMutation.mutate(
      {
        username: form.username.trim(),
        accountname: form.accountname.trim(),
        intro: form.intro,
        image: normalizeUploadPath(form.image),
      },
      {
        onSuccess: () => {
          navigate('/profile');
        },
      },
    );
  };

  return (
    <>
      <ProfileUpdateHeader canSave={canSave} onSave={onSave} isLoading={updateMutation.isPending} />

      <div className="min-h-screen w-full pt-4 pb-10">
        <div className="mx-auto px-4 pt-6">
          <div className="flex flex-col items-center">
            <div className="relative overflow-visible">
              <Avatar src={avatarSrc} alt="프로필 이미지" size="md" className="h-32 w-32" />

              <button
                type="button"
                onClick={onPickImage}
                className="absolute -right-1 -bottom-1 flex h-10 w-10 items-center justify-center rounded-full bg-green-500 shadow-lg"
              >
                <ProfileImageEditIcon className="h-6 w-6 text-white" />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onChangeFile}
              />
            </div>
          </div>

          <form className="space-y-6 px-4 py-8">
            <div className="space-y-2">
              <label className="text-sm font-medium">사용자 이름</label>

              <input
                value={form.username}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
                className={sampleInputClass}
                placeholder="이름을 입력하세요."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">계정 ID</label>

              <input
                value={form.accountname}
                disabled
                className={sampleDisabledClass}
                placeholder="계정 아이디"
              />

              <p className="text-muted-foreground text-xs">계정 ID는 변경할 수 없습니다.</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">소개</label>

              <input
                value={form.intro}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    intro: e.target.value,
                  }))
                }
                className={sampleInputClass}
                placeholder="간단한 자기 소개를 입력하세요."
                maxLength={60}
              />

              <p className="text-muted-foreground text-xs">최대 60자</p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
