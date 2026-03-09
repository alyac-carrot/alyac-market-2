import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useCreatePost } from '@/entities/post';
import { useUploadFiles } from '@/entities/upload';
import { useMeQuery } from '@/entities/user';
import { PostImagePicker } from '@/features/upload';
import { toImageUrl } from '@/shared/lib';
import { Avatar } from '@/shared/ui';
import { UploadHeader } from '@/widgets/header';

export default function CreatePostPage() {
  const navigate = useNavigate();
  const createPostMutation = useCreatePost();
  const uploadFilesMutation = useUploadFiles();
  const meQuery = useMeQuery();
  const user = meQuery.data?.user;

  const [text, setText] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [images, setImages] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const handleFilesSelect = (newFiles: File[], newPreviews: string[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
    setImages((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const hasContent = text.trim().length > 0 || images.length > 0;

  const handleUpload = async () => {
    try {
      const uploadedFiles = files.length > 0 ? await uploadFilesMutation.mutateAsync(files) : [];
      const imageString =
        uploadedFiles.map((f) => `uploadFiles/${f.filename}`).join(',') || undefined;

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
            <Avatar src={toImageUrl(user?.image)} alt={user?.username} className="h-10 w-10" />
          </div>

          {/* textarea + images */}
          <div className="flex-1">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="게시글 입력하기"
              className="min-h-125 w-full resize-none border-0 bg-transparent text-base text-zinc-900 outline-none placeholder:text-gray-400 focus:ring-0 dark:text-zinc-100 dark:placeholder:text-zinc-500"
            />

            <PostImagePicker
              imageUrls={images}
              onFilesSelect={handleFilesSelect}
              onRemoveImage={removeImage}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
