import { Image as ImageIcon } from 'lucide-react';

type ProductImageSectionProps = {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  imagePreviewUrl: string;
  onImagePick: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ProductImageSection({
  fileInputRef,
  imagePreviewUrl,
  onImagePick,
}: ProductImageSectionProps) {
  return (
    <section className="space-y-2">
      <label className="text-muted-foreground block text-sm">이미지 등록</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="bg-muted hover:bg-muted/80 relative flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl p-0 transition-colors"
        >
          {imagePreviewUrl ? (
            <img src={imagePreviewUrl} alt="상품 이미지 미리보기" className="h-full w-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <ImageIcon className="h-8 w-8" />
              <span className="text-sm">이미지를 등록해 주세요</span>
            </div>
          )}
        </button>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="absolute right-3 bottom-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-md hover:bg-white"
          aria-label="이미지 선택"
        >
          <ImageIcon className="h-6 w-6" />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onImagePick}
        />
      </div>
    </section>
  );
}
