import { useEffect, useRef, useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useCreateProduct } from '@/entities/product';
import { useUploadFiles } from '@/entities/upload';
import { normalizeUploadPath } from '@/shared/lib';

export function useCreateProductForm() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const createProductMutation = useCreateProduct();
  const uploadFilesMutation = useUploadFiles();

  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [link, setLink] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  const canUpload =
    itemName.trim().length > 0 && Number(price) > 0 && link.trim().length > 0 && !!imageFile;

  const handlePriceChange = (nextValue: string) => {
    setPrice(nextValue.replace(/[^\d]/g, ''));
  };

  const handleImagePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
    }

    setImageFile(file);
    setImagePreviewUrl(URL.createObjectURL(file));
    setErrorText('');
  };

  const handleSubmit = async () => {
    if (!canUpload || !imageFile) return;

    try {
      setErrorText('');

      const uploaded = await uploadFilesMutation.mutateAsync([imageFile]);
      const filename = uploaded[0]?.filename;
      if (!filename) {
        throw new Error('Image upload failed');
      }

      await createProductMutation.mutateAsync({
        itemName: itemName.trim(),
        price: Number(price),
        link: link.trim(),
        itemImage: normalizeUploadPath(filename),
      });

      navigate('/profile');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiMessage =
          typeof error.response?.data?.message === 'string' ? error.response.data.message : null;
        setErrorText(apiMessage ?? '상품 등록에 실패했습니다. 다시 시도해 주세요.');
        console.error('Product creation failed:', error.response?.data ?? error.message);
        return;
      }

      console.error('Product creation failed:', error);
      setErrorText('상품 등록에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return {
    fileInputRef,
    itemName,
    price,
    link,
    imagePreviewUrl,
    errorText,
    canUpload,
    isSubmitting: createProductMutation.isPending || uploadFilesMutation.isPending,
    setItemName,
    setLink,
    handlePriceChange,
    handleImagePick,
    handleSubmit,
  };
}
