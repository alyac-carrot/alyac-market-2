import { useMemo, useState } from 'react';

import { EllipsisVertical, Heart, MessageCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { PostAlbumOff, PostAlbumOn, PostListOff, PostListOn } from '@/assets/icon';
import { Avatar } from '@/shared/ui/Avatar';
import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';

import type { Post, PostViewMode, Profile } from '../model/types';

interface PostsSectionProps {
  profile: Profile;
  posts: Post[];
  viewMode: PostViewMode;
  onViewModeChange: (mode: PostViewMode) => void;
  onDeletePost: (postId: string) => void;
}

export default function PostsSection({
  profile,
  posts,
  viewMode,
  onViewModeChange,
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
            className="h-8 w-8"
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
            className="h-8 w-8"
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
              to={`/posts/${p.id}`}
              className="aspect-square overflow-hidden bg-gray-100 transition hover:opacity-80"
            >
              <img src={p.imageUrl!} alt="" className="h-full w-full object-cover" />
            </Link>
          ))}
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {posts.map((post) => (
            <article key={post.id} className="w-full py-5 text-left hover:bg-gray-50">
              <div className="flex items-start gap-3">
                <Avatar src={profile.avatarUrl} alt="프로필 이미지" size="sm" />

                <div className="flex-1">
                  <div className="font-semibold">{profile.nickname}</div>
                  <div className="text-sm text-gray-500">{profile.handle}</div>

                  <Link to={`/posts/${post.id}`} className="block">
                    <div className="mt-2 text-sm">{post.content}</div>
                  </Link>
                </div>

                <DropdownMenu
                  modal={true}
                  open={openMenuPostId === post.id}
                  onOpenChange={(open) => setOpenMenuPostId(open ? post.id : null)}
                >
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:text-gray-600"
                      aria-label="게시글 메뉴"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <EllipsisVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    sideOffset={8}
                    className="w-44 rounded-xl border border-gray-200 bg-white shadow-lg"
                    onCloseAutoFocus={(e) => e.preventDefault()}
                  >
                    <div className="flex justify-center pt-2">
                      <div className="h-1 w-10 rounded-full bg-gray-300" />
                    </div>

                    <div className="py-2">
                      <DropdownMenuItem
                        className="cursor-pointer px-5 py-3 text-lg"
                        onClick={() => {
                          setOpenMenuPostId(null);
                          navigate(`/posts/${post.id}/edit`);
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
                  to={`/posts/${post.id}`}
                  className="mt-3 block aspect-video max-h-64 overflow-hidden rounded-lg bg-gray-100"
                >
                  <img src={post.imageUrl} alt="" className="h-full w-full object-cover" />
                </Link>
              )}

              <div className="mt-4 flex items-center gap-4 px-2 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  <span>{post.likeCount}</span>
                </div>

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
