import { useEffect, useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  type ProductFormValues,
  productFormSchema,
  productRequestSchema,
  useCreateProduct,
} from '@/entities/product';
import { useUploadFiles } from '@/entities/upload';
import { normalizeUploadPath } from '@/shared/lib';

export function useCreateProductForm() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const createProductMutation = useCreateProduct();
  const uploadFilesMutation = useUploadFiles();

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    mode: 'onChange',
    defaultValues: {
      itemName: '',
      price: '',
      link: '',
    },
  });

  const itemName = watch('itemName');
  const price = watch('price');
  const link = watch('link');

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

  const canUpload = isValid && !!imageFile;

  const setItemName = (value: string) => {
    setValue('itemName', value, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const setLink = (value: string) => {
    setValue('link', value, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handlePriceChange = (nextValue: string) => {
    setValue('price', nextValue.replace(/[^\d]/g, ''), {
      shouldDirty: true,
      shouldValidate: true,
    });
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

  const onSubmit = async (values: ProductFormValues) => {
    if (!imageFile) {
      setErrorText('상품 이미지를 등록해 주세요.');
      return;
    }

    try {
      setErrorText('');

      const uploaded = await uploadFilesMutation.mutateAsync([imageFile]);
      const filename = uploaded[0]?.filename;
      if (!filename) {
        throw new Error('Image upload failed');
      }

      const payload = {
        itemName: values.itemName.trim(),
        price: Number(values.price),
        link: values.link.trim(),
        itemImage: normalizeUploadPath(filename),
      };
      const result = productRequestSchema.safeParse(payload);
      if (!result.success) {
        setErrorText(
          result.error.issues[0]?.message ?? '상품 등록에 실패했습니다. 다시 시도해 주세요.',
        );
        return;
      }

      await createProductMutation.mutateAsync(result.data);

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
    fieldErrors: errors,
    canUpload,
    isSubmitting: createProductMutation.isPending || uploadFilesMutation.isPending,
    setItemName,
    setLink,
    handlePriceChange,
    handleImagePick,
    handleSubmit: handleSubmit(onSubmit),
  };
}
