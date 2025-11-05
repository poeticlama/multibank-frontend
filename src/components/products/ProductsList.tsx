import type { ProductType } from '../../types/products-types.ts';
import ProductCard from './ProductCard.tsx';

type ProductsListProps = {
  products: ProductType[];
}

const ProductsList = ({products}: ProductsListProps) => {
  return (
    <div className="flex flex-col gap-3 xs:gap-4 sm:gap-5 lg:gap-6 px-2 sm:px-0 mb-4 sm:mb-5 lg:mb-6">
      {products.map((product) => <ProductCard key={product.productId} product={product} />)}
    </div>
  )
}

export default ProductsList