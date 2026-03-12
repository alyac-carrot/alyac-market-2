import { toImageUrl } from '@/shared/lib';
import { Avatar } from '@/shared/ui';

interface ProfileImagePickerProps {
  imageFilename: string;
  isUploading: boolean;
  uploadError: string;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ProfileImagePicker({
  imageFilename,
  isUploading,
  uploadError,
  onImageChange,
}: ProfileImagePickerProps) {
  return (
    <div className="relative mx-auto mt-8 w-fit">
      <label
        htmlFor="profile-image-input"
        className="block cursor-pointer rounded-full transition-opacity hover:opacity-80 focus-within:ring-2 focus-within:ring-ring"
        aria-label="프로필 사진 변경"
      >
        <Avatar
          src={imageFilename ? toImageUrl(imageFilename) : undefined}
          alt="프로필"
          size="md"
          className="h-28 w-28"
        />
        {/* green upload badge */}
        <span
          aria-hidden="true"
          className="absolute right-0 bottom-0 flex h-9 w-9 items-center justify-center rounded-full bg-green-400 shadow-md transition-colors hover:bg-green-500"
        >
          <svg
            className="h-4 w-4 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </span>
      </label>
      <input
        id="profile-image-input"
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={onImageChange}
      />
      {isUploading && (
        <p className="mt-2 text-center text-xs text-muted-foreground">업로드 중...</p>
      )}
      {uploadError && <p className="mt-2 text-center text-xs text-destructive">{uploadError}</p>}
    </div>
  );
}
