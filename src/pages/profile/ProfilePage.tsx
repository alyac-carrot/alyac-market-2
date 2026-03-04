import { useMemo, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { useDeletePost } from '@/entities/post/hooks/useDeletePost';
import { useGetUserPosts } from '@/entities/post/hooks/useGetUserPosts';
import { useUserProductsQuery } from '@/entities/product';
import { useFollowMutation, useProfileQuery } from '@/entities/profile';
import { useMeQuery } from '@/entities/user';
import { cn, pickFirstImage, toImageUrl } from '@/shared/lib/';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/shared/ui';
import {
  type Post,
  type PostViewMode,
  type Product,
  type Profile,
  ProfilePostsWidget,
  ProfileProductsWidget,
  ProfileSummaryWidget,
} from '@/widgets/profile';

export default function ProfilePage() {
  const navigate = useNavigate();
  const params = useParams<{ userId?: string }>();

  const accountnameFromParam = params.userId;
  const isMeByRoute = !accountnameFromParam;

  const meQuery = useMeQuery();

  const targetAccountname = accountnameFromParam ?? meQuery.data?.user.accountname;

  const profileQuery = useProfileQuery(targetAccountname);
  const followMutation = useFollowMutation(targetAccountname ?? '');

  const productsQuery = useUserProductsQuery(targetAccountname);

  const userPostsQuery = useGetUserPosts(targetAccountname);
  const deletePostMutation = useDeletePost();

  const [postViewMode, setPostViewMode] = useState<PostViewMode>('normal');
  const [deleteTargetPostId, setDeleteTargetPostId] = useState<string | null>(null);

  const profile: Profile | null = useMemo(() => {
    const p = profileQuery.data;
    if (!p) return null;

    return {
      id: p.accountname,
      nickname: p.username,
      handle: `@${p.accountname}`,
      bio: p.intro ?? '',
      avatarUrl: p.image?.trim() ? toImageUrl(p.image) : '',
      followersCount: p.followerCount ?? 0,
      followingsCount: p.followingCount ?? 0,
    };
  }, [profileQuery.data]);

  const isMe = useMemo(() => {
    const meAccount = meQuery.data?.user.accountname;
    if (!meAccount || !targetAccountname) return isMeByRoute;
    return meAccount === targetAccountname;
  }, [isMeByRoute, meQuery.data?.user.accountname, targetAccountname]);

  const isFollowing = !!profileQuery.data?.isfollow;

  const sellingProducts: Product[] = useMemo(() => {
    const arr = productsQuery.data ?? [];
    return arr.map((p) => ({
      id: p.id,
      title: p.itemName,
      price: p.price,
      thumbnailUrl: toImageUrl(p.itemImage),
    }));
  }, [productsQuery.data]);

  const posts: Post[] = useMemo(() => {
    const arr = userPostsQuery.data?.post ?? [];
    return arr.map((p) => ({
      id: p.id,
      content: p.content,
      imageUrl: toImageUrl(pickFirstImage(p.image)),
      likeCount: p.heartCount ?? 0,
      commentCount: p.commentCount ?? 0,
    }));
  }, [userPostsQuery.data]);

  const isLoading =
    meQuery.isLoading ||
    profileQuery.isLoading ||
    productsQuery.isLoading ||
    userPostsQuery.isLoading;

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (profileQuery.isError || !profile) {
    return (
      <div className="p-6 text-center text-sm text-gray-500">프로필을 불러오지 못했습니다.</div>
    );
  }

  const goFollowers = () => navigate(`/followers/${profile.id}`);
  const goFollowings = () => navigate(`/followings/${profile.id}`);

  const goEditProfile = () => navigate('/profile/edit');
  const goCreateProduct = () => navigate('/products/new');
  const goProductDetail = (id: string) => navigate(`/products/${id}`);

  const handleDeleteConfirm = () => {
    if (!deleteTargetPostId) return;
    deletePostMutation.mutate(deleteTargetPostId);
    setDeleteTargetPostId(null);
  };

  return (
    <div className="w-full">
      <ProfileSummaryWidget
        profile={profile}
        isMe={isMe}
        isFollowing={isFollowing}
        onFollowingChange={(next) => {
          if (!targetAccountname) return;
          followMutation.mutate(next);
        }}
        onFollowersClick={goFollowers}
        onFollowingsClick={goFollowings}
        onEditProfile={goEditProfile}
        onCreateProduct={goCreateProduct}
      />

      <ProfileProductsWidget products={sellingProducts} onProductClick={goProductDetail} />

      <ProfilePostsWidget
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
