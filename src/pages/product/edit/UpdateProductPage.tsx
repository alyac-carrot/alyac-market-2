import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { useUpdateProductForm } from '@/features/product-update';
import { UploadHeader } from '@/widgets/header';
import { ProductEditorForm } from '@/widgets/product-create';

export default function UpdateProductPage() {
  const params = useParams<{ productId: string }>();
  const {
    fileInputRef,
    itemName,
    price,
    link,
    imagePreviewUrl,
    errorText,
    canUpload,
    isLoading,
    isSubmitting,
    setItemName,
    setLink,
    handlePriceChange,
    handleImagePick,
    handleSubmit,
  } = useUpdateProductForm(params.productId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ProductEditorForm
      formId="product-update-form"
      fileInputRef={fileInputRef}
      itemName={itemName}
      price={price}
      link={link}
      imagePreviewUrl={imagePreviewUrl}
      errorText={errorText}
      header={<UploadHeader canUpload={canUpload} onUpload={handleSubmit} isLoading={isSubmitting} />}
      isLoading={isLoading}
      onItemNameChange={setItemName}
      onPriceChange={handlePriceChange}
      onLinkChange={setLink}
      onImagePick={handleImagePick}
    />
  );
}
