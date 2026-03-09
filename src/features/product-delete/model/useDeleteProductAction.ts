import { useState } from 'react';

import { useDeleteProduct } from '@/entities/product';

export function useDeleteProductAction() {
  const deleteProductMutation = useDeleteProduct();
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);
  const [deleteTargetProductId, setDeleteTargetProductId] = useState<string | null>(null);

  const requestDeleteProduct = (productId: string) => {
    setDeleteTargetProductId(productId);
  };

  const closeDeleteDialog = () => {
    if (deleteProductMutation.isPending) return;
    setDeleteTargetProductId(null);
  };

  const confirmDeleteProduct = () => {
    if (!deleteTargetProductId) return;

    setDeletingProductId(deleteTargetProductId);
    deleteProductMutation.mutate(deleteTargetProductId, {
      onSettled: () => {
        setDeleteTargetProductId(null);
        setDeletingProductId(null);
      },
    });
  };

  return {
    deleteTargetProductId,
    deletingProductId,
    isDeleting: deleteProductMutation.isPending,
    requestDeleteProduct,
    closeDeleteDialog,
    confirmDeleteProduct,
  };
}
