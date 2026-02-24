import { useMemo, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { cn } from '@/shared/lib/';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/shared/ui/alert-dialog';

import { PostsSection } from './components/PostsSection';
import { ProfileSummary } from './components/ProfileSummary';
import { SellingProductsSection } from './components/SellingProductsSection';
import type { Post, PostViewMode, Product, Profile } from './model/types';

export default function ProfilePage() {
  const navigate = useNavigate();
  const params = useParams<{ userId?: string }>();

  const isMe = !params.userId;

  const profile: Profile = useMemo(
    () => ({
      id: params.userId ?? 'me',
      nickname: isMe ? '내프로필' : '타유저프로필',
      handle: isMe ? '@myprofile' : '@userprofile',
      bio: isMe ? '설명란' : '설명란',
      avatarUrl: '',
      followersCount: isMe ? 4 : 5,
      followingsCount: isMe ? 1 : 2,
    }),
    [isMe, params.userId],
  );

  const [isFollowing, setIsFollowing] = useState(false);
  const [postViewMode, setPostViewMode] = useState<PostViewMode>('normal');

  const [deleteTargetPostId, setDeleteTargetPostId] = useState<string | null>(null);

  const sellingProducts: Product[] = [
    { id: 'p1', title: '테스트 상품', price: 200000, thumbnailUrl: '' },
    { id: 'p2', title: '테스트 상품2', price: 12000, thumbnailUrl: '' },
    { id: 'p3', title: '테스트 상품3', price: 45000, thumbnailUrl: '' },
    { id: 'p4', title: '테스트 상품4', price: 9900, thumbnailUrl: '' },
  ];

  const posts: Post[] = [
    {
      id: 'post1',
      content: '기능 확인용 게시글 등록 (이미지 있음)',
      imageUrl: 'https://picsum.photos/seed/post1/600/600',
      likeCount: 1,
      commentCount: 1,
    },
    {
      id: 'post2',
      content: '테스트 입력2',
      imageUrl: '',
      likeCount: 0,
      commentCount: 0,
    },
    {
      id: 'post3',
      content: '이미지 모드 테스트',
      imageUrl: 'https://picsum.photos/seed/post3/600/600',
      likeCount: 3,
      commentCount: 2,
    },
  ];

  const goFollowers = () => navigate(`/profile/${profile.id}/follows?tab=followers`);
  const goFollowings = () => navigate(`/profile/${profile.id}/follows?tab=followings`);

  const goEditProfile = () => navigate('/profile/edit');
  const goCreateProduct = () => navigate('/products/new');

  const goProductDetail = (id: string) => navigate(`/products/${id}`);

  const handleDeleteConfirm = () => {
    if (!deleteTargetPostId) return;
    console.log('delete:', deleteTargetPostId);
    setDeleteTargetPostId(null);
  };

  return (
    <div className="w-full">
      <ProfileSummary
        profile={profile}
        isMe={isMe}
        isFollowing={isFollowing}
        onFollowingChange={setIsFollowing}
        onFollowersClick={goFollowers}
        onFollowingsClick={goFollowings}
        onEditProfile={goEditProfile}
        onCreateProduct={goCreateProduct}
      />

      <SellingProductsSection products={sellingProducts} onProductClick={goProductDetail} />

      <PostsSection
        profile={profile}
        posts={posts}
        viewMode={postViewMode}
        onViewModeChange={setPostViewMode}
        onDeletePost={setDeleteTargetPostId}
      />

      <AlertDialog
        open={deleteTargetPostId !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTargetPostId(null);
        }}
      >
        <AlertDialogContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          className={cn(
            'fixed top-[50%] left-[50%] z-50 grid h-38 w-75',
            'translate-x-[-50%] translate-y-[-50%] gap-0 overflow-hidden',
            'border-border bg-popover/95 rounded-lg border p-0',
            'shadow-lg backdrop-blur-sm',
          )}
        >
          <div className="flex flex-col space-y-2 px-4 pt-8 pb-6 text-center sm:text-left">
            <AlertDialogTitle className="text-center text-lg font-medium">
              게시글을 삭제할까요?
            </AlertDialogTitle>

            <AlertDialogDescription className="sr-only">
              이 게시글을 삭제합니다. 삭제된 게시글은 복구할 수 없습니다.
            </AlertDialogDescription>
          </div>

          <div className="border-border flex border-t">
            <AlertDialogCancel
              className={cn(
                'hover:bg-muted hover:text-foreground mt-0 h-14 flex-1 cursor-pointer rounded-none border-none',
                'bg-transparent text-base font-normal transition-colors focus-visible:ring-0',
              )}
            >
              취소
            </AlertDialogCancel>

            <div className="bg-border w-px" />

            <AlertDialogCancel
              onClick={handleDeleteConfirm}
              className={cn(
                'mt-0 h-14 flex-1 cursor-pointer rounded-none border-none bg-transparent text-base font-normal',
                'text-green-500 shadow-none transition-colors hover:text-green-600 focus-visible:ring-0',
              )}
            >
              삭제
            </AlertDialogCancel>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
