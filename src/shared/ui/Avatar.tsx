import { memo } from 'react';
import { UserImageLg, UserImageSm } from '@/assets/icon';
import { cn } from '@/shared/lib/';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 'h-9 w-9',
  md: 'h-[42px] w-[42px]',
  lg: 'h-28 w-28',
};

export const Avatar = memo(function Avatar({ src, alt = 'avatar', size = 'md', className }: AvatarProps) {
  const hasImage = Boolean(src?.trim());

  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#d4d4d4] bg-[#dbdbdb]',
        sizeMap[size as keyof typeof sizeMap],
        className,
      )}
    >
      {hasImage ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-gray-500">
          {size === 'sm' ? (
            <UserImageSm className="h-full w-full" />
          ) : (
            <UserImageLg className="h-full w-full" />
          )}
        </div>
      )}
    </div>
  );
});

