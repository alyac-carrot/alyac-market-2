import { ProfileImageEditIcon } from '@/assets/icon';
import { Avatar } from '@/shared/ui';

interface ProfileImageUploadSectionProps {
  avatarSrc: string;
  onPickImage: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onChangeFile: React.ChangeEventHandler<HTMLInputElement>;
}

export function ProfileImageUploadSection({
  avatarSrc,
  onPickImage,
  fileInputRef,
  onChangeFile,
}: ProfileImageUploadSectionProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative overflow-visible">
        <Avatar src={avatarSrc} alt="프로필 이미지" size="md" className="h-32 w-32" />

        <button
          type="button"
          onClick={onPickImage}
          className="absolute -right-1 -bottom-1 flex h-10 w-10 items-center justify-center rounded-full bg-green-500 shadow-lg"
          aria-label="프로필 이미지 변경"
          title="프로필 이미지 변경"
        >
          <ProfileImageEditIcon className="h-6 w-6" />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onChangeFile}
        />
      </div>
    </div>
  );
}
