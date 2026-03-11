import { Input } from '@/shared/ui';

type ProductFormSectionProps = {
  itemName: string;
  price: string;
  link: string;
  itemNameError?: string;
  priceError?: string;
  linkError?: string;
  onItemNameChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  onLinkChange: (value: string) => void;
};

export default function ProductFormSection({
  itemName,
  price,
  link,
  itemNameError,
  priceError,
  linkError,
  onItemNameChange,
  onPriceChange,
  onLinkChange,
}: ProductFormSectionProps) {
  return (
    <>
      <section className="space-y-2">
        <label htmlFor="product-name" className="text-foreground block text-sm font-medium">
          상품명
        </label>
        <Input
          id="product-name"
          value={itemName}
          onChange={(e) => onItemNameChange(e.target.value)}
          placeholder="2~15자 이내여야 합니다."
          maxLength={15}
          className="h-12 rounded-md border-t-0 border-r-0 border-b-2 border-l-0 pl-0 focus-visible:ring-0"
        />
        {itemNameError && <p className="text-sm text-red-500">{itemNameError}</p>}
      </section>

      <section className="space-y-2">
        <label htmlFor="product-price" className="text-foreground block text-sm font-medium">
          가격
        </label>
        <Input
          id="product-price"
          inputMode="numeric"
          value={price}
          onChange={(e) => onPriceChange(e.target.value)}
          placeholder="숫자만 입력 가능합니다."
          className="h-12 rounded-md border-t-0 border-r-0 border-b-2 border-l-0 pl-0 focus-visible:ring-0"
        />
        {priceError && <p className="text-sm text-red-500">{priceError}</p>}
      </section>

      <section className="space-y-2">
        <label htmlFor="product-link" className="text-foreground block text-sm font-medium">
          판매 링크
        </label>
        <Input
          id="product-link"
          value={link}
          onChange={(e) => onLinkChange(e.target.value)}
          placeholder="URL을 입력해 주세요."
          className="h-12 rounded-md border-t-0 border-r-0 border-b-2 border-l-0 pl-0 focus-visible:ring-0"
        />
        {linkError && <p className="text-sm text-red-500">{linkError}</p>}
        <p className="text-muted-foreground text-xs">필수 항목 (http:// 또는 https://로 시작)</p>
      </section>
    </>
  );
}
