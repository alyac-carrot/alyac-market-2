import { useMemo, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useUploadFiles } from '@/entities/upload';
import { useUpdateMyProfileMutation } from '@/entities/user';
import { toImageUrl, normalizeUploadPath } from '@/shared/lib';
import {
  ProfileImageUploadSection,
  ProfileInfoSection,
  ProfileUpdateActions,
} from '@/widgets/profile-update';

type FormState = {
  username: string;
  accountname: string;
  intro: string;
  image: string;
};


interface ProfileUpdateFormProps {
  initial: {
    _id: string;
    username: string;
    accountname: string;
    intro: string;
    image: string;
  };
}

export function ProfileUpdateForm({ initial }: ProfileUpdateFormProps) {
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

    const url = URL.createObjectURL(file);
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });

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
    <div className="min-h-screen w-full pt-4 pb-10">
      <div className="mx-auto px-4 pt-6">
        <ProfileImageUploadSection
          avatarSrc={avatarSrc}
          onPickImage={onPickImage}
          fileInputRef={fileInputRef}
          onChangeFile={onChangeFile}
        />

        <ProfileInfoSection form={form} setForm={setForm} />

        <ProfileUpdateActions
          canSave={canSave}
          onSave={onSave}
          isLoading={updateMutation.isPending}
        />
      </div>
    </div>
  );
}
