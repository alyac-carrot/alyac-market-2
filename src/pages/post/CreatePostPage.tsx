import { useRef, useState } from 'react';

import { Image as ImageIcon, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useCreatePost } from '@/entities/post';
import { useUploadFiles } from '@/entities/upload';
import { useMeQuery } from '@/entities/user';
import { toImageUrl } from '@/shared/lib';
import { Avatar, Button } from '@/shared/ui';
import { UploadHeader } from '@/widgets/header';

export default function UploadPage() {
  const navigate = useNavigate();
  const createPostMutation = useCreatePost();
  const uploadFilesMutation = useUploadFiles();
  const meQuery = useMeQuery();
  const user = meQuery.data?.user;

  const [text, setText] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageAdd = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    Array.from(fileList).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImages((prev) => [...prev, ev.target?.result as string]);
      };
      reader.readAsDataURL(file);
      setFiles((prev) => [...prev, file]);
    });

    // reset so same file can be picked again
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const hasContent = text.trim().length > 0 || images.length > 0;

  const handleUpload = async () => {
    try {
      let imageString: string | undefined;

      // Upload files if there are any
      if (files.length > 0) {
        const uploadedFiles = await uploadFilesMutation.mutateAsync(files);
        imageString = uploadedFiles.map((f) => `uploadFiles/${f.filename}`).join(',');
      }

      // Create the post
      await createPostMutation.mutateAsync({
        content: text.trim(),
        image: imageString,
      });

      navigate('/profile');
    } catch (error) {
      console.error('Post creation failed:', error);
    }
  };

  return (
    <div className="bg-background flex min-h-screen flex-col">
      {/* ─ sticky top nav ─ */}
      {/* <header className="border-border bg-background sticky top-0 z-10 flex items-center justify-between border-b px-4 py-3">
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
      </header> */}

      <UploadHeader
        canUpload={hasContent}
        onUpload={handleUpload}
        isLoading={createPostMutation.isPending || uploadFilesMutation.isPending}
      />

      {/* ─ main ─ */}
      <main className="flex-1 px-4 py-4">
        <div className="flex gap-3">
          {/* avatar */}
          <div className="shrink-0">
            <Avatar
              src={toImageUrl(user?.image)}
              alt={user?.username}
              className="h-10 w-10"
            />
          </div>

          {/* textarea + images */}
          <div className="flex-1">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="게시글 입력하기."
              className="min-h-125 w-full resize-none border-0 text-base outline-none placeholder:text-gray-400 focus:ring-0"
            />

            {/* image previews (full-size stacked) */}
            {images.length > 0 && (
              <div className="mt-4 flex flex-col gap-3">
                {images.map((src, i) => (
                  <div key={i} className="relative overflow-hidden rounded-lg">
                    <img
                      src={src}
                      alt={`업로드된 이미지 ${i + 1}`}
                      className="w-full rounded-lg"
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
