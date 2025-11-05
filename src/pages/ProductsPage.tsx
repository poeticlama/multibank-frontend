import productsMock from '../mocks/products-mock.ts';
import ProductsList from '../components/products/ProductsList.tsx';
import CustomSelect from '../components/shared/CustomSelect.tsx';

const ProductsPage = () => {
  const products = productsMock;

  return (
    <main className="pt-4 sm:pt-6 lg:pt-8 px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-25 text-blue-900 max-w-screen-2xl mx-auto">
      {/* Заголовок */}
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-5 lg:mb-6 px-2 sm:px-0 text-center">
        Доступные продукты банков
      </h1>
      
      {/* Фильтры */}
      <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-5 px-2 sm:px-0 justify-center items-center lg:items-stretch">
        <div className="w-full xs:w-auto xs:flex-1 min-w-0 max-w-xs">
          <CustomSelect
            options={[{label: "a", value: "b"}, {label: "c", value: "b"}]}
            placeholder="Все банки"
          />
        </div>
        <div className="w-full xs:w-auto xs:flex-1 min-w-0 max-w-xs">
          <CustomSelect
            options={[{label: "a", value: "b"}, {label: "c", value: "b"}]}
            placeholder="Все продукты"
          />
        </div>
      </div>

      {/* Список продуктов */}
      <div className="px-1 sm:px-2 lg:px-0 pt-4 sm:pt-6 lg:pt-8">
        <ProductsList products={products} />
      </div>
    </main>
  )
}

export default ProductsPage;