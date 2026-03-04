import uploadApi from '@/shared/api/uploadApi';

export interface UploadResponse {
  filename: string;
}

export const uploadFiles = async (files: File[]): Promise<UploadResponse[]> => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('image', file);
  });

  const response = await uploadApi.post('/image/uploadfiles', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  // Normalize response: API may return a single object or an array
  const data = response.data;
  if (Array.isArray(data)) {
    return data.map((item: { filename?: string }) => ({
      filename: item.filename ?? '',
    }));
  }

  // Single file response (e.g. { filename: "..." })
  if (data?.filename) {
    return [{ filename: data.filename }];
  }

  return [];
};
