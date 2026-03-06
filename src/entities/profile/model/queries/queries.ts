export const profileQueryKeys = {
  profile: (accountname: string) => ['profile', accountname] as const,
  following: (accountname: string) => ['profile', accountname, 'following'] as const,
  follower: (accountname: string) => ['profile', accountname, 'follower'] as const,
};
