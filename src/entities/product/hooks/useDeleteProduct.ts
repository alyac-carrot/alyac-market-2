import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteProduct } from '../api/productApi';
import { productQueryKeys } from '../model/queries/queries';

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: productQueryKeys.user });
    },
  });
}
