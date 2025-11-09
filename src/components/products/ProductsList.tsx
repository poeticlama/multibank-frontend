import type { ProductType } from '../../types/products-types.ts';
import ProductCard from './ProductCard.tsx';
import type { BankInfo } from '../../types/bank-info.ts';

type ProductsListProps = {
  products: ProductType[];
  bankLinks: BankInfo[];
}

const ProductsList = ({products, bankLinks}: ProductsListProps) => {
  return (
    <div className="flex flex-col gap-3 xs:gap-4 sm:gap-5 lg:gap-6 px-2 sm:px-0 mb-4 sm:mb-5 lg:mb-6">
      {products.map((product) => <ProductCard key={product.productId + product.bankId} product={product} link={bankLinks.find((bank) => bank.id === product.bankId)?.url || "/accounts"} />)}
    </div>
  )
}

export default ProductsList