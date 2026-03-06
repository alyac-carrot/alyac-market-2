import { MoreVertical } from 'lucide-react';

import type { Comment } from '@/entities/post';
import { formatRelativeTime, toImageUrl } from '@/shared/lib';
import { Avatar } from '@/shared/ui/Avatar';

export function CommentItem({
  comment,
  onKebabClick,
}: {
  comment: Comment;
  onKebabClick: (commentId: string) => void;
}) {
  const authorImage = comment.author?.image ? toImageUrl(comment.author.image) : '';

  return (
    <div className="flex gap-3 px-4 py-4">
      <Avatar src={authorImage} alt={comment.author?.username} className="h-10 w-10" />

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-foreground font-semibold">
              {comment.author?.username ?? '알 수 없음'}
            </span>
            <span className="text-muted-foreground text-xs">
              · {formatRelativeTime(comment.createdAt)}
            </span>
          </div>
          <button type="button" className="h-6 w-6" onClick={() => onKebabClick(comment.id)}>
            <MoreVertical className="text-muted-foreground h-4 w-4" />
          </button>
        </div>
        <p className="text-foreground text-left text-sm leading-relaxed">{comment.content}</p>
      </div>
    </div>
  );
}
