import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Image as ImageIcon, X } from 'lucide-react';

import { Button } from '@/shared/ui/button';

export function UploadPage() {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageAdd = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImages((prev) => [...prev, ev.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });

    // reset so same file can be picked again
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const hasContent = text.trim().length > 0 || images.length > 0;

  return (
    <div className="bg-background flex min-h-screen flex-col">
      {/* ─ sticky top nav ─ */}
      <header className="border-border bg-background sticky top-0 z-10 flex items-center justify-between border-b px-4 py-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="text-foreground hover:text-foreground/80"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>

        <Button
          type="button"
          disabled={!hasContent}
          className="rounded-full bg-[#6FCA3C] px-8 py-0.5 font-medium text-white transition-colors hover:bg-[#5CB32A] disabled:cursor-not-allowed disabled:opacity-50"
        >
          업로드
        </Button>
      </header>

      {/* ─ main ─ */}
      <main className="flex-1 px-4 py-4">
        <div className="flex gap-3">
          {/* avatar */}
          <div className="shrink-0">
            <div className="bg-muted flex h-10 w-10 items-center justify-center overflow-hidden rounded-full">
              <span className="text-muted-foreground text-xs">A</span>
            </div>
          </div>

          {/* textarea + images */}
          <div className="flex-1">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="게시글 입력하기."
              className="min-h-[500px] w-full resize-none border-0 text-base outline-none placeholder:text-gray-400 focus:ring-0"
            />

            {/* image previews (2-column grid) */}
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-2">
                {images.map((src, i) => (
                  <div key={i} className="relative overflow-hidden rounded-lg">
                    <img
                      src={src}
                      alt={`업로드된 이미지 ${i + 1}`}
                      className="h-40 w-full object-cover"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => removeImage(i)}
                      className="absolute top-2 right-2 h-6 w-6 rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                      aria-label="이미지 삭제"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

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
    </div>
  );
}
