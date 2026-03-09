import { useNavigate, useParams } from 'react-router-dom';

import { useDeleteProductAction } from '@/features/product-delete';
import { useProfilePageData } from '@/features/profile';
import { ConfirmDialog } from '@/shared/ui';
import {
  ProfilePostsWidget,
  ProfileProductsWidget,
  ProfileSummaryWidget,
} from '@/widgets/profile';

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
    followMutation,
    setPostViewMode,
    setDeleteTargetPostId,
  } = useProfilePageData({
    targetAccountname: accountnameFromParam,
    isMeByRoute,
  });

  const goFollowers = () => {
    if (!profile?.id) return;
    navigate(`/followers/${profile.id}`);
  };

  const goFollowings = () => {
    if (!profile?.id) return;
    navigate(`/followings/${profile.id}`);
  };

  const goEditProfile = () => navigate('/profile-update');
  const goCreateProduct = () => navigate('/product/create');
  const goProductUpdate = (id: string) => navigate(`/product/${id}/edit`);

  const handleDeleteConfirm = () => {
    if (!deleteTargetPostId) return;
    deletePostMutation.mutate(deleteTargetPostId);
    setDeleteTargetPostId(null);
  };

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (isError || !profile) {
    return (
      <div className="p-6 text-center text-sm text-gray-500">프로필을 불러오지 못했습니다.</div>
    );
  }

  return (
    <div className="w-full">
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
    </div>
  );
}
