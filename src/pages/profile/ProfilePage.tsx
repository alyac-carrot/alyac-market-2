import { useNavigate, useParams } from 'react-router-dom';

import { useProfilePageData } from '@/features/profile';
import {
  ProfileDeleteDialog,
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
  const goCreateProduct = () => navigate('/products/new');
  const goProductDetail = (id: string) => navigate(`/products/${id}`);

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

      <ProfileProductsWidget products={sellingProducts} onProductClick={goProductDetail} />

      <ProfilePostsWidget
        profile={profile}
        posts={posts}
        viewMode={postViewMode}
        onViewModeChange={setPostViewMode}
        onDeletePost={setDeleteTargetPostId}
      />

      <ProfileDeleteDialog
        open={deleteTargetPostId !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTargetPostId(null);
        }}
        onConfirm={handleDeleteConfirm}
        isLoading={deletePostMutation.isPending}
      />
    </div>
  );
}
