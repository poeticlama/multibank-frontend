import type { ProductType } from '../../types/products-types.ts';

type ProductCardProps = {
  product: ProductType;
  link: string;
}

const ProductCard = ({product, link}: ProductCardProps) => {
  return (
    <div className="h-auto min-h-40 sm:min-h-45 lg:min-h-50 bg-gray-100 rounded-xl px-4 xs:px-5 sm:px-6 lg:px-7 py-4 sm:py-5 flex flex-col sm:flex-row justify-between gap-4 sm:gap-3 lg:gap-4">
      {/* Левая часть - информация о продукте */}
      <div className="flex flex-col justify-between flex-1 min-w-0 gap-3 sm:gap-4">
        <div className="space-y-2">
          <h2 className="text-lg sm:text-xl lg:text-xl font-semibold line-clamp-2">
            {product.productName}
          </h2>
          <p className="text-sm text-gray-500 line-clamp-2 xs:line-clamp-3">
            {product.description}
          </p>
        </div>
        <div className="space-y-1">
          {product.minAmount && (
            <p className="text-sm sm:text-md text-gray-500">От {product.minAmount}</p>
          )}
          {product.maxAmount && (
            <p className="text-sm sm:text-md text-gray-500">До {product.maxAmount}</p>
          )}
        </div>
      </div>

      {/* Правая часть - срок и кнопка */}
      <div className="flex flex-col justify-between items-stretch sm:items-end gap-3 sm:gap-4 flex-shrink-0">
        <div className="text-center sm:text-right">
          {product.termMonths && (
            <p className="text-sm sm:text-md text-gray-500 whitespace-nowrap">
              На срок {product.termMonths} месяцев
            </p>
          )}
        </div>
        <a
          href={link + '/client'}
          className="bg-blue-900 hover:bg-blue-600 text-white font-semibold py-2 px-3 sm:py-2 sm:px-4 rounded-lg transition-colors duration-200 hover:cursor-pointer focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm sm:text-base whitespace-nowrap"
        >
          Оформить на {product.bankId}
        </a>
      </div>
    </div>
  )
}

export default ProductCard;