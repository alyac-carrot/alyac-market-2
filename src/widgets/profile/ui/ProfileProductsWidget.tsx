import type { Product } from '@/entities/profile';

interface SellingProductsSectionProps {
  products: Product[];
  onProductClick: (id: string) => void;
}

function formatKRW(n: number) {
  return new Intl.NumberFormat('ko-KR').format(n) + '원';
}

export default function ProfileProductsWidget({
  products,
  onProductClick,
}: SellingProductsSectionProps) {
  return (
    <>
      <section className="mx-auto max-w-240 px-4 py-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold">판매 중인 상품</h2>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {products.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onProductClick(p.id)}
              className="text-left"
            >
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
          ))}
        </div>
      </section>

      <div className="h-px w-full bg-gray-100" />
    </>
  );
}
