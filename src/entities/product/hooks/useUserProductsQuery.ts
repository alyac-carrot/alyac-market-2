import { useQuery } from '@tanstack/react-query';

import { getUserProducts } from '../api/productApi';
import { productQueryKeys } from '../model/queries/queries';

export function useUserProductsQuery(accountname?: string) {
  return useQuery({
    queryKey: accountname ? productQueryKeys.userProducts(accountname) : ['product', 'disabled'],
    queryFn: async () => (await getUserProducts(accountname!)).product,
    enabled: !!accountname,
    staleTime: 1000 * 30,
    retry: false,
  });
}
