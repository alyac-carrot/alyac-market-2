import { Heart, MessageCircle } from 'lucide-react';

import type { Post } from '@/entities/post';
import { formatDate } from '@/shared/lib';
import { Avatar } from '@/shared/ui/Avatar';

interface Props {
  post: Pick<Post, 'id' | 'author' | 'content' | 'createdAt' | 'commentCount'>;
  authorAvatar?: string;
  postImages?: string[];
  isHearted: boolean;
  heartCount: number;
  isLikePending: boolean;
  onLike: () => void;
}

export function PostArticle({
  post,
  authorAvatar,
  postImages = [],
  isHearted,
  heartCount,
  isLikePending,
  onLike,
}: Props) {
  return (
    <article className="border-border border-b pb-4">
      {/* author row */}
      <div className="flex items-center gap-3 px-4 py-4">
        <Avatar src={authorAvatar} size="md" />
        <div className="flex flex-col text-left">
          <span className="text-foreground text-sm font-normal">
            {post.author?.username ?? '이름없음'}
          </span>
          <span className="text-muted-foreground text-xs">
            @{post.author?.accountname ?? ''}
          </span>
        </div>
      </div>

      {/* content */}
      {post.content?.trim() && (
        <div className="px-4 pb-4">
          <p className="text-foreground text-left text-base leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
        </div>
      )}

      {/* image */}
      {postImages.length > 0 && (
        <div className="mb-4 space-y-2 px-4">
          {postImages.map((image, index) => (
            <img
              key={`${post.id}-image-${index}`}
              src={image}
              alt={`게시글 이미지 ${index + 1}`}
              className="h-auto w-full rounded-xl object-cover"
            />
          ))}
        </div>
      )}

      {/* action row */}
      <div className="flex items-center gap-4 px-4">
        <button
          type="button"
          onClick={onLike}
          disabled={isLikePending}
          aria-label={isHearted ? '좋아요 취소' : '좋아요'}
          aria-pressed={isHearted}
          className="flex items-center gap-1.5 transition-transform active:scale-90 disabled:opacity-70"
        >
          <Heart
            className="h-5 w-5 transition-colors"
            strokeWidth={1.5}
            fill={isHearted ? '#ef4444' : 'none'}
            stroke={isHearted ? '#ef4444' : 'currentColor'}
            style={isHearted ? {} : { color: 'var(--muted-foreground)' }}
          />
          <span
            className="text-xs transition-colors"
            style={{ color: isHearted ? '#ef4444' : 'var(--muted-foreground)' }}
          >
            {heartCount}
          </span>
        </button>

        <span className="flex items-center gap-1.5">
          <MessageCircle className="text-muted-foreground h-5 w-5" strokeWidth={1.5} />
          <span className="text-muted-foreground text-xs">{post.commentCount ?? 0}</span>
        </span>
      </div>

      {/* date */}
      <p className="text-muted-foreground mt-3 px-4 text-left text-xs">
        {formatDate(post.createdAt)}
      </p>
    </article>
  );
}
