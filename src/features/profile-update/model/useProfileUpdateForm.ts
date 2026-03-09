import { useMemo, useRef, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useUploadFiles } from '@/entities/upload';
import { useUpdateMyProfileMutation } from '@/entities/user';
import { normalizeUploadPath, toImageUrl } from '@/shared/lib';

type ProfileFormValues = {
  username: string;
  accountname: string;
  intro: string;
};

interface UseProfileUpdateFormProps {
  initial: {
    _id: string;
    username: string;
    accountname: string;
    intro: string;
    image: string;
  };
}

export function useProfileUpdateForm({ initial }: UseProfileUpdateFormProps) {
  const navigate = useNavigate();
  const updateMutation = useUpdateMyProfileMutation();
  const uploadMutation = useUploadFiles();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ProfileFormValues>({
    mode: 'onChange',
    defaultValues: {
      username: initial.username ?? '',
      accountname: initial.accountname ?? '',
      intro: initial.intro ?? '',
    },
  });

  const [imageFilename, setImageFilename] = useState<string>(initial.image ?? '');
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const avatarSrc = useMemo(() => {
    if (previewUrl) return previewUrl;
    return toImageUrl(imageFilename);
  }, [previewUrl, imageFilename]);

  const canSave = useMemo(() => {
    if (updateMutation.isPending || uploadMutation.isPending) return false;
    return isValid;
  }, [isValid, updateMutation.isPending, uploadMutation.isPending]);

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
        setImageFilename(normalized);
      },
      onError: (err: unknown) => {
        const message = err instanceof Error ? err.message : '이미지 업로드에 실패했습니다.';
        alert(message);

        setPreviewUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return '';
        });
      },
    });
  };

  const onSave = (values: ProfileFormValues) => {
    if (!canSave) return;

    updateMutation.mutate(
      {
        username: values.username.trim(),
        accountname: values.accountname.trim(),
        intro: values.intro,
        image: normalizeUploadPath(imageFilename),
      },
      {
        onSuccess: () => {
          navigate('/profile', { replace: true });
        },
      },
    );
  };

  return {
    register,
    errors,
    fileInputRef,
    avatarSrc,
    canSave,
    isSaving: updateMutation.isPending,
    onPickImage,
    onChangeFile,
    submit: handleSubmit(onSave),
  };
}
