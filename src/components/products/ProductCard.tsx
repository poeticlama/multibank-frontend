import type { ProductType } from '../../types/products-types.ts';

type ProductCardProps = {
  product: ProductType;
}

const ProductCard = ({product}: ProductCardProps) => {
  return (
    <div>
      {product.productName}
    </div>
  )
}

export default ProductCard