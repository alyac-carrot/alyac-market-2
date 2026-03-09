import { X } from 'lucide-react';

import type { Product } from '@/entities/profile';

interface SellingProductsSectionProps {
  products: Product[];
  canDelete?: boolean;
  deletingProductId?: string | null;
  onProductClick: (id: string) => void;
  onDeleteProduct?: (id: string) => void;
}

function formatKRW(n: number) {
  return `${new Intl.NumberFormat('ko-KR').format(n)}원`;
}

export default function ProfileProductsWidget({
  products,
  canDelete = false,
  deletingProductId = null,
  onProductClick,
  onDeleteProduct,
}: SellingProductsSectionProps) {
  return (
    <>
      <section className="mx-auto max-w-240 px-4 py-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold">판매 중인 상품</h2>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {products.map((p) => {
            const isDeleting = deletingProductId === p.id;

            return (
              <div key={p.id} className="group relative">
                <button type="button" onClick={() => onProductClick(p.id)} className="w-full text-left">
                  <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                    {p.thumbnailUrl?.trim() ? (
                      <img src={p.thumbnailUrl} alt={p.title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-gray-400">
                        이미지
                      </div>
                    )}
                  </div>
                  <div className="mt-1 text-xs">{p.title}</div>
                  <div className="text-xs font-semibold text-green-600">{formatKRW(p.price)}</div>
                </button>

                {canDelete && onDeleteProduct && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteProduct(p.id);
                    }}
                    disabled={isDeleting}
                    className="absolute right-1 top-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/55 text-white opacity-0 transition hover:bg-black/70 group-hover:opacity-100 group-focus-within:opacity-100 disabled:cursor-not-allowed disabled:opacity-70"
                    aria-label="상품 삭제"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <div className="h-px w-full bg-gray-100" />
    </>
  );
}
