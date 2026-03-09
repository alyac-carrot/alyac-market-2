import { useProfileIdentity } from './useProfileIdentity';
import { useProfilePosts } from './useProfilePosts';
import { useProfileProducts } from './useProfileProducts';
import { useProfileViewState } from './useProfileViewState';

interface UseProfilePageDataProps {
  targetAccountname?: string;
  isMeByRoute: boolean;
}

export function useProfilePageData({ targetAccountname, isMeByRoute }: UseProfilePageDataProps) {
  const identity = useProfileIdentity({ targetAccountname, isMeByRoute });
  const products = useProfileProducts(identity.actualAccountname);
  const postData = useProfilePosts(identity.actualAccountname);
  const viewState = useProfileViewState();

  const isLoading =
    identity.meQuery.isLoading ||
    identity.profileQuery.isLoading ||
    products.productsQuery.isLoading ||
    postData.userPostsQuery.isLoading;

  return {
    // Data
    profile: identity.profile,
    sellingProducts: products.sellingProducts,
    posts: postData.posts,
    postViewMode: viewState.postViewMode,
    deleteTargetPostId: viewState.deleteTargetPostId,
    // Flags
    isMe: identity.isMe,
    isFollowing: identity.isFollowing,
    isLoading,
    isError: identity.profileQuery.isError,
    // Mutations
    deletePostMutation: postData.deletePostMutation,
    followMutation: identity.followMutation,
    // Setters
    setPostViewMode: viewState.setPostViewMode,
    setDeleteTargetPostId: viewState.setDeleteTargetPostId,
  };
}
