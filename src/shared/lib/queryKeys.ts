export const queryKeys = {
  me: ['me'] as const,

  followers: (accountname: string) => ['followers', accountname] as const,
  followings: (accountname: string) => ['followings', accountname] as const,
};
