import { useCallback } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { useDeleteProductAction } from '@/features/product-delete';
import { useProfilePageData } from '@/features/profile';
import { ConfirmDialog } from '@/shared/ui';
import { PageWithFooter } from '@/widgets/footer';
import { Header, PageWithHeader } from '@/widgets/header';
import { ProfilePostsWidget, ProfileProductsWidget, ProfileSummaryWidget } from '@/widgets/profile';

export default function ProfilePage() {
  const navigate = useNavigate();
  const params = useParams<{ userId?: string }>();

  const accountnameFromParam = params.userId;
  const isMeByRoute = !accountnameFromParam;
  const {
    deleteTargetProductId,
    deletingProductId,
    isDeleting,
    requestDeleteProduct,
    closeDeleteDialog,
    confirmDeleteProduct,
  } = useDeleteProductAction();

  const {
    profile,
    sellingProducts,
    posts,
    postViewMode,
    deleteTargetPostId,
    isMe,
    isFollowing,
    isLoading,
    isError,
    deletePostMutation,
    togglePostLike,
    followMutation,
    setPostViewMode,
    setDeleteTargetPostId,
  } = useProfilePageData({
    targetAccountname: accountnameFromParam,
    isMeByRoute,
  });

  const goFollowers = useCallback(() => {
    if (!profile?.id) return;
    navigate(`/followers/${profile.id}`);
  }, [profile?.id, navigate]);

  const goFollowings = useCallback(() => {
    if (!profile?.id) return;
    navigate(`/followings/${profile.id}`);
  }, [profile?.id, navigate]);

  const goEditProfile = useCallback(() => navigate('/profile-update'), [navigate]);
  const goCreateProduct = useCallback(() => navigate('/product/create'), [navigate]);
  const goProductUpdate = useCallback((id: string) => navigate(`/product/${id}/edit`), [navigate]);

  const handleDeleteConfirm = useCallback(() => {
    if (!deleteTargetPostId) return;
    deletePostMutation.mutate(deleteTargetPostId);
    setDeleteTargetPostId(null);
  }, [deleteTargetPostId, deletePostMutation, setDeleteTargetPostId]);

  if (isLoading) {
    return (
      <PageWithFooter>
        <div className="flex h-screen items-center justify-center">Loading...</div>
      </PageWithFooter>
    );
  }

  if (isError || !profile) {
    return (
      <PageWithFooter>
        <div className="p-6 text-center text-sm text-gray-500">프로필을 불러오지 못했습니다.</div>
      </PageWithFooter>
    );
  }

  return (
    <PageWithFooter>
      <PageWithHeader className="w-full" header={<Header showBackButton showMenu />}>
        <ProfileSummaryWidget
          profile={profile}
          isMe={isMe}
          isFollowing={isFollowing}
          onFollowingChange={(next) => {
            if (!accountnameFromParam) return;
            followMutation.mutate(next);
          }}
          onFollowersClick={goFollowers}
          onFollowingsClick={goFollowings}
          onEditProfile={goEditProfile}
          onCreateProduct={goCreateProduct}
        />

        <ProfileProductsWidget
          products={sellingProducts}
          canDelete={isMe}
          deletingProductId={deletingProductId}
          onProductClick={goProductUpdate}
          onDeleteProduct={requestDeleteProduct}
        />

        <ProfilePostsWidget
          profile={profile}
          posts={posts}
          viewMode={postViewMode}
          canManagePosts={isMe}
          onViewModeChange={setPostViewMode}
          onToggleLikePost={togglePostLike}
          onDeletePost={setDeleteTargetPostId}
        />

        <ConfirmDialog
          open={deleteTargetPostId !== null}
          onOpenChange={(open) => {
            if (!open) setDeleteTargetPostId(null);
          }}
          title="게시글을 삭제할까요?"
          confirmText="삭제"
          confirmLoadingText="삭제 중..."
          onConfirm={handleDeleteConfirm}
          isLoading={deletePostMutation.isPending}
        />

        <ConfirmDialog
          open={deleteTargetProductId !== null}
          onOpenChange={(open) => {
            if (!open) closeDeleteDialog();
          }}
          title="상품을 삭제할까요?"
          confirmText="삭제"
          confirmLoadingText="삭제 중..."
          onConfirm={confirmDeleteProduct}
          isLoading={isDeleting || deletingProductId !== null}
        />
      </PageWithHeader>
    </PageWithFooter>
  );
}
