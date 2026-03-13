import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createProduct } from '../api/productApi';
import { productQueryKeys } from '../model/queries/queries';

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: productQueryKeys.user });
    },
  });
}
