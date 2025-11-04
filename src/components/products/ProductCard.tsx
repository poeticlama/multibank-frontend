import type { ProductType } from '../../types/products-types.ts';

type ProductCardProps = {
  product: ProductType;
}

const ProductCard = ({product}: ProductCardProps) => {
  return (
    <div className="h-50 bg-gray-100 rounded-xl px-7 py-5 flex justify-between">
      <div className="flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold">{product.productName}</h2>
          <p className="text-sm text-gray-500">{product.description}</p>
        </div>
        <div>
          {product.minAmount && <p className="text-md text-gray-500">От {product.minAmount}</p>}
          {product.maxAmount && <p className="text-md text-gray-500">До {product.maxAmount}</p>}
        </div>
      </div>
      <div className="flex flex-col justify-between items-end">
        <div>
          {product.termMonths && <p className=" text-md text-gray-500">На срок {product.termMonths} месяцев</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 hover:cursor-pointer focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 h-fit"
        >
          Оформить
        </button>
      </div>
    </div>
  )
}

export default ProductCard