import { useEffect } from 'react';

import { useCreateProductForm } from '@/features/product-create';
import { UploadHeader } from '@/widgets/header';
import { ProductFormSection, ProductImageSection } from '@/widgets/product-create';

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
    <div className="bg-background flex flex-col">
      <UploadHeader canUpload={canUpload} onUpload={handleSubmit} isLoading={isSubmitting} />

      <main className="mx-auto mt-6 w-full flex-1 px-4">
        <form id="product-form" className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <ProductImageSection
            fileInputRef={fileInputRef}
            imagePreviewUrl={imagePreviewUrl}
            onImagePick={handleImagePick}
          />

          <ProductFormSection
            itemName={itemName}
            price={price}
            link={link}
            onItemNameChange={setItemName}
            onPriceChange={handlePriceChange}
            onLinkChange={setLink}
          />

          {errorText && <div className="text-sm text-red-500">{errorText}</div>}
        </form>
      </main>
    </div>
  );
}
