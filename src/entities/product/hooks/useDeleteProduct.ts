import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteProduct } from '../api/productApi';

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['product', 'user'] });
    },
  });
}
