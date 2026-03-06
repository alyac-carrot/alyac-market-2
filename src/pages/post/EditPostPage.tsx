import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { useGetPost, useUpdatePost } from '@/entities/post';
import { useUploadFiles } from '@/entities/upload';
import { useMeQuery } from '@/entities/user';
import { PostImagePicker } from '@/features/upload';
import { toImageUrl } from '@/shared/lib';
import { Avatar, Button } from '@/shared/ui';
import { UploadHeader } from '@/widgets/header';

interface ImageItem {
  src: string;
  isNew: boolean;
  originalPath?: string;
}

export default function EditPostPage() {
  const navigate = useNavigate();
  const { postId = '' } = useParams<{ postId: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getPostQuery = useGetPost(postId);

  if (getPostQuery.isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (getPostQuery.isError || !getPostQuery.data || !getPostQuery.data.post) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-sm text-gray-500">게시글을 불러오지 못했습니다.</p>
          <Button onClick={() => navigate(-1)}>뒤로가기</Button>
        </div>
      </div>
    );
  }

  return <EditPostForm key={postId} postId={postId} post={getPostQuery.data.post} />;
}

interface Post {
  content?: string;
  image?: string;
}

interface EditPostFormProps {
  postId: string;
  post: Post;
}

function EditPostForm({ postId, post }: EditPostFormProps) {
  const navigate = useNavigate();

  const updatePostMutation = useUpdatePost(postId);
  const uploadFilesMutation = useUploadFiles();
  const meQuery = useMeQuery();
  const user = meQuery.data?.user;

  const [text, setText] = useState(() => post.content ?? '');

  const [imageItems, setImageItems] = useState<ImageItem[]>(() => {
    const imageString = String(post.image ?? '');
    if (!imageString.trim()) return [];

    return imageString
      .split(',')
      .map((path) => path?.trim() ?? '')
      .filter(Boolean)
      .map((path) => ({
        src: toImageUrl(path),
        isNew: false,
        originalPath: path,
      }));
  });

  const [newFiles, setNewFiles] = useState<File[]>([]);

  const handleFilesSelect = (selectedFiles: File[], selectedPreviews: string[]) => {
    setNewFiles((prev) => [...prev, ...selectedFiles]);
    const newItems = selectedPreviews.map((src) => ({ src, isNew: true }));
    setImageItems((prev) => [...prev, ...newItems]);
  };

  const removeImage = (index: number) => {
    setImageItems((prev) => {
      const item = prev[index];
      if (item?.isNew) {
        // Remove corresponding from newFiles
        const newFileIndex = imageItems.slice(0, index).filter((i) => i.isNew).length;
        setNewFiles((prevFiles) => prevFiles.filter((_, i) => i !== newFileIndex));
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const hasContent = text.trim().length > 0 || imageItems.length > 0;

  const handleUpdate = async () => {
    if (!postId) {
      console.error('Post ID is missing');
      return;
    }

    try {
      let imageString = '';
      const oldFiles: string[] = [];
      const uploadedNewFileNames: string[] = [];

      // Separate old and new files
      for (const item of imageItems) {
        if (!item.isNew && item.originalPath) {
          oldFiles.push(item.originalPath);
        }
      }

      // Upload new files if there are any
      if (newFiles.length > 0) {
        const uploadedFiles = await uploadFilesMutation.mutateAsync(newFiles);
        uploadedNewFileNames.push(...uploadedFiles.map((f) => `uploadFiles/${f.filename}`));
      }

      // Combine old files and newly uploaded files
      imageString = [...oldFiles, ...uploadedNewFileNames].join(',');

      console.log('Updating post:', {
        postId,
        content: text.trim(),
        image: imageString,
      });

      // Update the post
      await updatePostMutation.mutateAsync({
        content: text.trim(),
        image: imageString,
      });

      navigate('/profile');
    } catch (error) {
      console.error('Post update failed:', error);
    }
  };

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <UploadHeader
        canUpload={hasContent}
        onUpload={handleUpdate}
        isLoading={updatePostMutation.isPending || uploadFilesMutation.isPending}
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
              placeholder="게시글 입력하기."
              className="min-h-125 w-full resize-none border-0 text-base outline-none placeholder:text-gray-400 focus:ring-0"
            />

            <PostImagePicker
              imageUrls={imageItems.map((item) => item.src)}
              onFilesSelect={handleFilesSelect}
              onRemoveImage={removeImage}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
