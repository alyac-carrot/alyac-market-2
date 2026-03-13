import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateProduct } from '../api/productApi';
import { productQueryKeys } from '../model/queries/queries';
import type { UpdateProductRequest } from '../model/type';

type UpdateProductVariables = {
  productId: string;
  data: UpdateProductRequest;
};

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, data }: UpdateProductVariables) => updateProduct(productId, data),
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: productQueryKeys.detail(variables.productId),
      });
      await queryClient.invalidateQueries({ queryKey: productQueryKeys.user });
    },
  });
}
