import type { ProductType } from '../../types/products-types.ts';
import ProductCard from './ProductCard.tsx';

type ProductsListProps = {
  products: ProductType[];
}

const ProductsList = ({products}: ProductsListProps) => {
  return (
    <div className="flex flex-col gap-3 pr-52 mb-5">
      {products.map((product) => <ProductCard key={product.productId} product={product} />)}
    </div>
  )
}

export default ProductsList