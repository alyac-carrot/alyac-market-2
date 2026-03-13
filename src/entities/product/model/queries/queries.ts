export const productQueryKeys = {
  all: ['product'] as const,
  user: ['product', 'user'] as const,
  detailAll: ['product', 'detail'] as const,
  userProducts: (accountname: string) => ['product', 'user', accountname] as const,
  detail: (productId: string) => ['product', 'detail', productId] as const,
};
