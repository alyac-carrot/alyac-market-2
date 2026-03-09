import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createProduct } from '../api/productApi';

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['product', 'user'] });
    },
  });
}
