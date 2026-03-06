export const queryKeys = {
  me: ['me'] as const,
  profile: (accountname: string) => ['profile', accountname] as const,
  posts: ['posts'] as const,
  post: (id: string) => ['post', id] as const,
  userPosts: (accountname: string) => ['userPosts', accountname] as const,
  followers: (accountname: string) => ['followers', accountname] as const,
  followings: (accountname: string) => ['followings', accountname] as const,
};
