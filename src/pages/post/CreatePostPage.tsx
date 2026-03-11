import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useCreatePost } from '@/entities/post';
import { useUploadFiles } from '@/entities/upload';
import { useMeQuery } from '@/entities/user';
import { PostImagePicker } from '@/features/upload';
import { normalizeUploadPath, toImageUrl } from '@/shared/lib';
import { Avatar, SubmitActionButton } from '@/shared/ui';
import { Header, PageWithHeader } from '@/widgets/header';

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
        uploadedFiles.map((f) => normalizeUploadPath(f.filename)).join(',') || undefined;

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
    <PageWithHeader
      className="bg-background flex min-h-screen flex-col"
      header={
        <Header
          showBackButton
          right={
            <SubmitActionButton
              canSubmit={hasContent}
              isSubmitting={createPostMutation.isPending || uploadFilesMutation.isPending}
              onClick={handleUpload}
              idleText="업로드"
              loadingText="업로드 중..."
            />
          }
        />
      }
      contentClassName="flex-1"
    >
      <main className="px-4 py-4">
        <div className="flex gap-3">
          <div className="shrink-0">
            <Avatar src={toImageUrl(user?.image)} alt={user?.username} className="h-10 w-10" />
          </div>

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
    </PageWithHeader>
  );
}
