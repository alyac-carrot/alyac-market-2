import { cn } from '@/shared/lib/';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md';
  className?: string;
}

const sizeMap = {
  sm: 'h-9 w-9',
  md: 'h-[42px] w-[42px]',
};

export function Avatar({ src, alt = '', size = 'md', className }: AvatarProps) {
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#d4d4d4] bg-[#dbdbdb]',
        sizeMap[size],
        className,
      )}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div className="h-full w-full bg-[#dbdbdb]" />
      )}
    </div>
  );
}
