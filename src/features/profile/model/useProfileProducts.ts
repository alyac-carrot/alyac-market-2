import { useMemo } from 'react';

import { useUserProductsQuery } from '@/entities/product';
import type { Product } from '@/entities/profile';
import { toImageUrl } from '@/shared/lib/';

export function useProfileProducts(accountname?: string) {
  const productsQuery = useUserProductsQuery(accountname);

  const sellingProducts: Product[] = useMemo(() => {
    const arr = productsQuery.data ?? [];
    return arr.map((p) => ({
      id: p.id,
      title: p.itemName,
      price: p.price,
      thumbnailUrl: toImageUrl(p.itemImage),
    }));
  }, [productsQuery.data]);

  return {
    productsQuery,
    sellingProducts,
  };
}
