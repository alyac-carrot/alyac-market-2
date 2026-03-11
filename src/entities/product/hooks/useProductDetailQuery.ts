import { useQuery } from '@tanstack/react-query';

import { getProductDetail } from '../api/productApi';
import { productQueryKeys } from '../model/queries/queries';

export function useProductDetailQuery(productId?: string) {
  return useQuery({
    queryKey: productId ? productQueryKeys.detail(productId) : ['product', 'detail', 'disabled'],
    queryFn: async () => (await getProductDetail(productId!)).product,
    enabled: !!productId,
    staleTime: 1000 * 30,
    retry: false,
  });
}
