import { useEffect, useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  type ProductFormValues,
  productFormSchema,
  productRequestSchema,
  useProductDetailQuery,
  useUpdateProduct,
} from '@/entities/product';
import { useUploadFiles } from '@/entities/upload';
import { normalizeUploadPath, toImageUrl } from '@/shared/lib';

export function useUpdateProductForm(productId?: string) {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const productQuery = useProductDetailQuery(productId);
  const updateProductMutation = useUpdateProduct();
  const uploadFilesMutation = useUploadFiles();

  const {
    watch,
    reset,
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
  const [itemImagePath, setItemImagePath] = useState('');
  const [errorText, setErrorText] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!productQuery.data || isInitialized) return;

    reset({
      itemName: productQuery.data.itemName ?? '',
      price: String(productQuery.data.price ?? ''),
      link: productQuery.data.link ?? '',
    });
    setItemImagePath(productQuery.data.itemImage ?? '');
    setImagePreviewUrl(toImageUrl(productQuery.data.itemImage));
    setIsInitialized(true);
  }, [isInitialized, productQuery.data, reset]);

  useEffect(() => {
    return () => {
      if (imageFile && imagePreviewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imageFile, imagePreviewUrl]);

  const canUpload = isValid && imagePreviewUrl.trim().length > 0;

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

    if (imagePreviewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreviewUrl);
    }

    setImageFile(file);
    setImagePreviewUrl(URL.createObjectURL(file));
    setErrorText('');
  };

  const onSubmit = async (values: ProductFormValues) => {
    if (!productId) return;

    if (!imagePreviewUrl.trim()) {
      setErrorText('상품 이미지를 등록해 주세요.');
      return;
    }

    try {
      setErrorText('');

      let nextItemImage = itemImagePath;
      if (imageFile) {
        const uploaded = await uploadFilesMutation.mutateAsync([imageFile]);
        const filename = uploaded[0]?.filename;
        if (!filename) throw new Error('Image upload failed');
        nextItemImage = normalizeUploadPath(filename);
      }

      const payload = {
        itemName: values.itemName.trim(),
        price: Number(values.price),
        link: values.link.trim(),
        itemImage: nextItemImage,
      };
      const result = productRequestSchema.safeParse(payload);
      if (!result.success) {
        setErrorText(
          result.error.issues[0]?.message ?? '상품 수정에 실패했습니다. 다시 시도해 주세요.',
        );
        return;
      }

      await updateProductMutation.mutateAsync({
        productId,
        data: result.data,
      });

      navigate('/profile');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiMessage =
          typeof error.response?.data?.message === 'string' ? error.response.data.message : null;
        setErrorText(apiMessage ?? '상품 수정에 실패했습니다. 다시 시도해 주세요.');
        console.error('Product update failed:', error.response?.data ?? error.message);
        return;
      }

      console.error('Product update failed:', error);
      setErrorText('상품 수정에 실패했습니다. 다시 시도해 주세요.');
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
    isLoading: productQuery.isLoading && !isInitialized,
    isSubmitting: updateProductMutation.isPending || uploadFilesMutation.isPending,
    setItemName,
    setLink,
    handlePriceChange,
    handleImagePick,
    handleSubmit: handleSubmit(onSubmit),
  };
}
