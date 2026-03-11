import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { useUpdateProductForm } from '@/features/product-update';
import { SubmitActionButton } from '@/shared/ui';
import { Header, PageWithHeader } from '@/widgets/header';
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
    fieldErrors,
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
    <PageWithHeader
      header={
        <Header
          showBackButton
          right={
            <SubmitActionButton
              canSubmit={canUpload}
              isSubmitting={isSubmitting}
              onClick={handleSubmit}
              idleText="저장"
              loadingText="저장 중..."
              className="px-5"
            />
          }
        />
      }
    >
      <ProductEditorForm
        formId="product-update-form"
        fileInputRef={fileInputRef}
        itemName={itemName}
        price={price}
        link={link}
        imagePreviewUrl={imagePreviewUrl}
        errorText={errorText}
        itemNameError={fieldErrors.itemName?.message}
        priceError={fieldErrors.price?.message}
        linkError={fieldErrors.link?.message}
        isLoading={isLoading}
        onItemNameChange={setItemName}
        onPriceChange={handlePriceChange}
        onLinkChange={setLink}
        onImagePick={handleImagePick}
      />
    </PageWithHeader>
  );
}
