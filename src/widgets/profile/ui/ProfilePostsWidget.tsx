import { useMemo, useState } from 'react';

import { EllipsisVertical, Heart, MessageCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { PostAlbumOff, PostAlbumOn, PostListOff, PostListOn } from '@/assets/icon';
import type { Post, PostViewMode, UIProfile as Profile } from '@/entities/profile';
import {
  Avatar,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui';

interface PostsSectionProps {
  profile: Profile;
  posts: Post[];
  viewMode: PostViewMode;
  canManagePosts?: boolean;
  onViewModeChange: (mode: PostViewMode) => void;
  onToggleLikePost: (postId: string) => void;
  onDeletePost: (postId: string) => void;
}

export default function ProfilePostsWidget({
  profile,
  posts,
  viewMode,
  canManagePosts = false,
  onViewModeChange,
  onToggleLikePost,
  onDeletePost,
}: PostsSectionProps) {
  const navigate = useNavigate();

  const [openMenuPostId, setOpenMenuPostId] = useState<string | null>(null);

  const mediaPosts = useMemo(() => posts.filter((p) => Boolean(p.imageUrl?.trim())), [posts]);

  return (
    <section className="mx-auto max-w-240 px-4 py-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold">게시글</h2>

        <div className="flex items-center gap-2 text-gray-500">
          <Button
            type="button"
            variant={viewMode === 'normal' ? 'secondary' : 'ghost'}
            size="icon"
            className="h-8 w-8 cursor-pointer"
            onClick={() => onViewModeChange('normal')}
            aria-label="일반 보기"
            title="일반 보기"
          >
            {viewMode === 'normal' ? (
              <PostListOn className="h-4 w-4" />
            ) : (
              <PostListOff className="h-4 w-4" />
            )}
          </Button>

          <Button
            type="button"
            variant={viewMode === 'media' ? 'secondary' : 'ghost'}
            size="icon"
            className="h-8 w-8 cursor-pointer"
            onClick={() => onViewModeChange('media')}
            aria-label="이미지 보기"
            title="이미지 보기"
          >
            {viewMode === 'media' ? (
              <PostAlbumOn className="h-4 w-4" />
            ) : (
              <PostAlbumOff className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {viewMode === 'media' ? (
        <div className="grid grid-cols-3 gap-1 sm:grid-cols-4 md:grid-cols-6">
          {mediaPosts.map((p) => (
            <Link
              key={p.id}
              to={`/post/${p.id}`}
              className="aspect-square cursor-pointer overflow-hidden bg-gray-100 transition hover:opacity-80"
            >
              <img src={p.imageUrl!} alt="" className="h-full w-full object-cover" />
            </Link>
          ))}
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {posts.map((post) => (
            <article key={post.id} className="hover:bg-accent w-full py-5 text-left">
              <div className="flex items-start gap-3">
                <Avatar src={profile.avatarUrl} alt="프로필 이미지" size="sm" />

                <div className="flex-1">
                  <div className="font-semibold">{profile.nickname}</div>
                  <div className="text-sm text-gray-500">{profile.handle}</div>

                  <Link to={`/post/${post.id}`} className="block cursor-pointer">
                    <div className="mt-2 text-sm">{post.content}</div>
                  </Link>
                </div>

                <DropdownMenu
                  modal={true}
                  open={canManagePosts && openMenuPostId === post.id}
                  onOpenChange={(open) =>
                    setOpenMenuPostId(open && canManagePosts ? post.id : null)
                  }
                >
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 cursor-pointer text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="게시글 메뉴"
                      disabled={!canManagePosts}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <EllipsisVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    sideOffset={8}
                    className="border-border bg-popover w-44 rounded-xl border shadow-lg"
                    onCloseAutoFocus={(e) => e.preventDefault()}
                  >
                    <div className="flex justify-center pt-2">
                      <div className="bg-muted-foreground/30 h-1 w-10 rounded-full" />
                    </div>

                    <div className="py-2">
                      <DropdownMenuItem
                        className="cursor-pointer px-5 py-3 text-lg"
                        onClick={() => {
                          setOpenMenuPostId(null);
                          navigate(`/post/${post.id}/edit`);
                        }}
                      >
                        수정
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="cursor-pointer px-5 py-3 text-lg"
                        onClick={() => {
                          setOpenMenuPostId(null);
                          onDeletePost(post.id);
                        }}
                      >
                        삭제
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {post.imageUrl?.trim() && (
                <Link
                  to={`/post/${post.id}`}
                  className="mt-3 block aspect-video max-h-64 cursor-pointer overflow-hidden rounded-lg bg-gray-100"
                >
                  <img src={post.imageUrl} alt="" className="h-full w-full object-cover" />
                </Link>
              )}

              <div className="mt-4 flex items-center gap-4 px-2 text-sm text-gray-500">
                <button
                  type="button"
                  className="flex cursor-pointer items-center gap-1 transition-transform duration-150 active:scale-90"
                  onClick={() => onToggleLikePost(post.id)}
                  aria-label={post.liked ? '좋아요 취소' : '좋아요'}
                >
                  <Heart
                    className={[
                      'h-4 w-4 transition-colors',
                      post.liked ? 'fill-red-500 text-red-500' : 'text-gray-500',
                    ].join(' ')}
                  />
                  <span>{post.likeCount}</span>
                </button>

                <div className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  <span>{post.commentCount}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
