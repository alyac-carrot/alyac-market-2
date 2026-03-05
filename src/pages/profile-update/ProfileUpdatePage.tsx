import { useMemo, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { ProfileImageEditIcon } from '@/assets/icon';
import { useProfileQuery } from '@/entities/profile';
import { useUploadFiles } from '@/entities/upload';
import { useMeQuery, useUpdateMyProfileMutation } from '@/entities/user';
import { toImageUrl } from '@/shared/lib';
import { Avatar, Input } from '@/shared/ui';
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

export default function ProfileUpdatePage() {
  const meQuery = useMeQuery();
  const myAccountname = meQuery.data?.user.accountname;

  const myProfileQuery = useProfileQuery(myAccountname);

  if (meQuery.isLoading || myProfileQuery.isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (meQuery.isError || !myAccountname || myProfileQuery.isError || !myProfileQuery.data) {
    return (
      <div className="text-muted-foreground p-6 text-center text-sm">
        내 정보를 불러오지 못했습니다.
      </div>
    );
  }

  const profile = myProfileQuery.data;

  return <ProfileUpdateForm key={profile._id} initial={profile} />;
}

function ProfileUpdateForm({
  initial,
}: {
  initial: {
    _id: string;
    username: string;
    accountname: string;
    intro: string;
    image: string;
  };
}) {
  const navigate = useNavigate();

  const updateMutation = useUpdateMyProfileMutation();
  const uploadMutation = useUploadFiles();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [form, setForm] = useState<FormState>(() => ({
    username: initial.username ?? '',
    accountname: initial.accountname ?? '',
    intro: initial.intro ?? '',
    image: initial.image ?? '',
  }));

  const [previewUrl, setPreviewUrl] = useState<string>('');

  const avatarSrc = useMemo(() => {
    if (previewUrl) return previewUrl;
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

    // 1) 즉시 미리보기
    const url = URL.createObjectURL(file);
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });

    // 2) 서버 업로드
    uploadMutation.mutate([file], {
      onSuccess: (data) => {
        const filename = data?.[0]?.filename ?? '';
        const normalized = normalizeUploadPath(filename);
        setForm((prev) => ({ ...prev, image: normalized }));
      },
      onError: (err: unknown) => {
        const message = err instanceof Error ? err.message : '업로드에 실패했습니다.';
        alert(message);

        setPreviewUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return '';
        });
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
          navigate('/profile', { replace: true });
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
                aria-label="프로필 이미지 변경"
                title="프로필 이미지 변경"
              >
                <ProfileImageEditIcon className="h-6 w-6" />
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

          {/* ✅ 디자인 건드리지 말라고 해서: 네가 쓰던 underline 스타일 그대로 */}
          <form className="space-y-6 px-4 py-8" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label htmlFor="username" className="text-foreground block text-sm font-medium">
                사용자 이름
              </label>

              <Input
                id="username"
                value={form.username}
                onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
                placeholder="이름을 입력하세요."
                className="h-12 border-t-0 border-r-0 border-b-2 border-l-0 pl-0 focus:outline-none focus-visible:ring-0"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="accountId" className="text-foreground block text-sm font-medium">
                계정 ID
              </label>

              <Input
                id="accountId"
                value={form.accountname}
                disabled
                placeholder="계정 아이디를 입력하세요."
                className="h-12 border-t-0 border-r-0 border-b-2 border-l-0 pl-0 focus:outline-none focus-visible:ring-0 disabled:opacity-60"
              />

              <p className="text-muted-foreground text-xs">계정 ID는 변경할 수 없습니다.</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="bio" className="text-foreground block text-sm font-medium">
                소개
              </label>

              <Input
                id="bio"
                value={form.intro}
                onChange={(e) => setForm((prev) => ({ ...prev, intro: e.target.value }))}
                placeholder="간단한 자기 소개를 입력하세요."
                maxLength={60}
                className="h-12 border-t-0 border-r-0 border-b-2 border-l-0 pl-0 focus:outline-none focus-visible:ring-0"
              />

              <p className="text-muted-foreground text-xs">최대 60자</p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
