import ProductFormSection from './ProductFormSection';
import ProductImageSection from './ProductImageSection';

type ProductEditorFormProps = {
  formId: string;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  itemName: string;
  price: string;
  link: string;
  imagePreviewUrl: string;
  errorText: string;
  itemNameError?: string;
  priceError?: string;
  linkError?: string;
  isLoading?: boolean;
  onItemNameChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  onLinkChange: (value: string) => void;
  onImagePick: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ProductEditorForm({
  formId,
  fileInputRef,
  itemName,
  price,
  link,
  imagePreviewUrl,
  errorText,
  itemNameError,
  priceError,
  linkError,
  isLoading = false,
  onItemNameChange,
  onPriceChange,
  onLinkChange,
  onImagePick,
}: ProductEditorFormProps) {
  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="bg-background flex flex-col">
      <main className="mx-auto mt-6 w-full flex-1 px-4">
        <form id={formId} className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <ProductImageSection
            fileInputRef={fileInputRef}
            imagePreviewUrl={imagePreviewUrl}
            onImagePick={onImagePick}
          />

          <ProductFormSection
            itemName={itemName}
            price={price}
            link={link}
            itemNameError={itemNameError}
            priceError={priceError}
            linkError={linkError}
            onItemNameChange={onItemNameChange}
            onPriceChange={onPriceChange}
            onLinkChange={onLinkChange}
          />

          {errorText && <div className="text-sm text-red-500">{errorText}</div>}
        </form>
      </main>
    </div>
  );
}
