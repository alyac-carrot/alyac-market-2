export const productQueryKeys = {
  userProducts: (accountname: string) => ['product', 'user', accountname] as const,
};
