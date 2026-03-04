import { useRef, useState } from 'react';

import { Image as ImageIcon, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetPost, useUpdatePost } from '@/entities/post';
import { useUploadFiles } from '@/entities/upload';
import { toImageUrl } from '@/shared/lib';
import { Button } from '@/shared/ui/button';
import { UploadHeader } from '@/widgets/header';

interface ImageItem {
  src: string;
  isNew: boolean;
  originalPath?: string;
}

export default function EditPostPage() {
  const navigate = useNavigate();
  const { postId = '' } = useParams<{ postId: string }>();

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

  // ✅ Initialize state directly from props — no useEffect needed
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
        const src = ev.target?.result as string;
        setImageItems((prev) => [...prev, { src, isNew: true }]);
      };
      reader.readAsDataURL(file);
      setNewFiles((prev) => [...prev, file]);
    });

    // reset so same file can be picked again
    e.target.value = '';
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
              className="min-h-125 w-full resize-none border-0 text-base outline-none placeholder:text-gray-400 focus:ring-0"
            />

            {/* image previews (full-size stacked) */}
            {imageItems.length > 0 && (
              <div className="mt-4 flex flex-col gap-3">
                {imageItems.map((item, i) => (
                  <div key={i} className="relative overflow-hidden rounded-lg">
                    <img
                      src={item.src}
                      alt={`수정된 이미지 ${i + 1}`}
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
