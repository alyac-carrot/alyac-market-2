import { useRef } from 'react';

import { Image as ImageIcon, X } from 'lucide-react';

import { Button } from '@/shared/ui';

interface PostImagePickerProps {
  imageUrls: string[];
  onFilesSelect: (newFiles: File[], newPreviews: string[]) => void;
  onRemoveImage: (index: number) => void;
}

export function PostImagePicker({ imageUrls, onFilesSelect, onRemoveImage }: PostImagePickerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageAdd = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    const files = Array.from(fileList);
    const previews: string[] = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        previews.push(ev.target?.result as string);
        if (previews.length === files.length) {
          onFilesSelect(files, previews);
        }
      };
      reader.readAsDataURL(file);
    });

    // reset so same file can be picked again
    e.target.value = '';
  };

  return (
    <>
      {/* image previews (full-size stacked) */}
      {imageUrls.length > 0 && (
        <div className="mt-4 flex flex-col gap-3">
          {imageUrls.map((src, i) => (
            <div key={i} className="relative overflow-hidden rounded-lg">
              <img src={src} alt={`업로드된 이미지 ${i + 1}`} className="w-full rounded-lg" />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => onRemoveImage(i)}
                className="absolute top-2 right-2 h-6 w-6 rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                aria-label="이미지 삭제"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      {/* ─ FAB ─ */}
      <button
        type="button"
        onClick={handleImageAdd}
        className="fixed right-6 bottom-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#6FCA3C] text-white shadow-lg transition-colors hover:bg-[#5CB32A]"
      >
        <ImageIcon className="h-8 w-8" />
      </button>
    </>
  );
}
