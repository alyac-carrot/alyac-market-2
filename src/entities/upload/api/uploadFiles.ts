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

  // Multi-file response can be returned as { filename: ["a.jpg", "b.jpg"] }
  if (Array.isArray(data?.filename)) {
    return data.filename
      .filter((filename: unknown): filename is string => typeof filename === 'string')
      .map((filename: string) => ({ filename }));
  }

  // Single file response (e.g. { filename: "..." })
  if (typeof data?.filename === 'string') {
    return [{ filename: data.filename }];
  }

  return [];
};
