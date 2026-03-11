import type { Comment } from '@/entities/post';
import { CommentItem } from '@/features/post';

interface Props {
  comments: Comment[];
  isLoading: boolean;
  onKebabClick: (id: string) => void;
}

export function CommentList({ comments, isLoading, onKebabClick }: Props) {
  if (isLoading) {
    return (
      <div className="text-muted-foreground px-4 py-8 text-center text-sm" aria-busy="true">
        로딩 중...
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="text-muted-foreground px-4 py-8 text-center text-sm">
        댓글이 없습니다.
      </div>
    );
  }

  return (
    <div className="divide-muted divide-y">
      {comments.map((c) => (
        <CommentItem key={c.id} comment={c} onKebabClick={onKebabClick} />
      ))}
    </div>
  );
}
