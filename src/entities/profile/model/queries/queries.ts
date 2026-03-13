export const profileQueryKeys = {
  all: ['profile'] as const,
  followers: ['followers'] as const,
  followings: ['followings'] as const,
  profile: (accountname: string) => ['profile', accountname] as const,
  following: (accountname: string) => ['profile', accountname, 'following'] as const,
  follower: (accountname: string) => ['profile', accountname, 'follower'] as const,
};
