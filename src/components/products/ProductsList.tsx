import type { ProductType } from '../../types/products-types.ts';
import ProductCard from './ProductCard.tsx';

type ProductsListProps = {
  products: ProductType[];
}

const ProductsList = ({products}: ProductsListProps) => {
  return (
    <div>
      {products.map((product) => <ProductCard key={product.productId} product={product} />)}
    </div>
  )
}

export default ProductsList