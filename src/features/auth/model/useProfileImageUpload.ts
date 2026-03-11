import { useState } from 'react';

import uploadApi from '@/shared/api/uploadApi';
import { normalizeUploadPath } from '@/shared/lib';

export function useProfileImageUpload() {
  const [imageFilename, setImageFilename] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError('');
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await uploadApi.post<{ filename: string }>('/image/uploadfile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setImageFilename(normalizeUploadPath(res.data.filename));
    } catch {
      setUploadError('이미지 업로드에 실패했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  return { imageFilename, uploadError, isUploading, handleImageChange };
}
