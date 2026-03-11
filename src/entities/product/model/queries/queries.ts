export const productQueryKeys = {
  userProducts: (accountname: string) => ['product', 'user', accountname] as const,
  detail: (productId: string) => ['product', 'detail', productId] as const,
};
