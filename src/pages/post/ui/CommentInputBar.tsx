import { Avatar } from '@/shared/ui/Avatar';

interface Props {
  avatarSrc?: string;
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function CommentInputBar({ avatarSrc, value, onChange, onSubmit, isSubmitting }: Props) {
  const hasText = value.trim().length > 0;

  return (
    <div className="border-border bg-background fixed right-0 bottom-0 left-0 z-10 border-t px-4 py-2">
      <div className="flex items-center gap-3">
        <div className="shrink-0">
          <Avatar src={avatarSrc} size="sm" />
        </div>

        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isSubmitting) onSubmit();
            }}
            placeholder="댓글 입력하기..."
            className="border-border bg-muted placeholder:text-muted-foreground h-10 w-full rounded-full border px-4 pr-14 text-sm outline-none focus:ring-0"
          />
          <button
            type="button"
            onClick={onSubmit}
            disabled={!hasText || isSubmitting}
            className={`absolute top-1/2 right-3 -translate-y-1/2 text-sm font-semibold transition-colors ${
              hasText && !isSubmitting
                ? 'text-green-500 hover:text-green-600'
                : 'text-muted-foreground cursor-not-allowed'
            }`}
          >
            {isSubmitting ? '로딩...' : '게시'}
          </button>
        </div>
      </div>
    </div>
  );
}
