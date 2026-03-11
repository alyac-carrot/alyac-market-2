import { useEffect } from 'react';

import { useCreateProductForm } from '@/features/product-create';
import { SubmitActionButton } from '@/shared/ui';
import { Header, PageWithHeader } from '@/widgets/header';
import { ProductEditorForm } from '@/widgets/product-create';

export default function CreateProductPage() {
  const {
    fileInputRef,
    itemName,
    price,
    link,
    imagePreviewUrl,
    errorText,
    fieldErrors,
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
    <PageWithHeader
      header={
        <Header
          showBackButton
          right={
            <SubmitActionButton
              canSubmit={canUpload}
              isSubmitting={isSubmitting}
              onClick={handleSubmit}
              idleText="업로드"
              loadingText="업로드 중..."
            />
          }
        />
      }
    >
      <ProductEditorForm
        formId="product-form"
        fileInputRef={fileInputRef}
        itemName={itemName}
        price={price}
        link={link}
        imagePreviewUrl={imagePreviewUrl}
        errorText={errorText}
        itemNameError={fieldErrors.itemName?.message}
        priceError={fieldErrors.price?.message}
        linkError={fieldErrors.link?.message}
        onItemNameChange={setItemName}
        onPriceChange={handlePriceChange}
        onLinkChange={setLink}
        onImagePick={handleImagePick}
      />
    </PageWithHeader>
  );
}
