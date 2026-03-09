import { useEffect } from 'react';

import { useCreateProductForm } from '@/features/product-create';
import { UploadHeader } from '@/widgets/header';
import { ProductEditorForm } from '@/widgets/product-create';

export default function CreateProductPage() {
  const {
    fileInputRef,
    itemName,
    price,
    link,
    imagePreviewUrl,
    errorText,
    canUpload,
    isSubmitting,
    setItemName,
    setLink,
    handlePriceChange,
    handleImagePick,
    handleSubmit,
  } = useCreateProductForm();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ProductEditorForm
      formId="product-form"
      fileInputRef={fileInputRef}
      itemName={itemName}
      price={price}
      link={link}
      imagePreviewUrl={imagePreviewUrl}
      errorText={errorText}
      header={<UploadHeader canUpload={canUpload} onUpload={handleSubmit} isLoading={isSubmitting} />}
      onItemNameChange={setItemName}
      onPriceChange={handlePriceChange}
      onLinkChange={setLink}
      onImagePick={handleImagePick}
    />
  );
}
