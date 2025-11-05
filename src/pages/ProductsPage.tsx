import productsMock from '../mocks/products-mock.ts';
import ProductsList from '../components/products/ProductsList.tsx';
import CustomSelect from '../components/shared/CustomSelect.tsx';

const ProductsPage = () => {
  const products = productsMock;

  return (
    <main className="pt-4 sm:pt-6 lg:pt-8 text-blue-900 max-w-screen-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-5 lg:mb-10 lg:px-25 text-blue-900 text-center lg:text-left">
        Продукты банков
      </h1>
      
      {/* Фильтры */}
      <div className="lg:ml-25 flex flex-col lg:flex-row gap-1 sm:gap-2 lg:gap-3 px-2 sm:px-0 items-center">
        <CustomSelect
          options={[{label: "a", value: "b"}, {label: "c", value: "b"}]}
          placeholder="Все банки"
        />
        <CustomSelect
          options={[{label: "a", value: "b"}, {label: "c", value: "b"}]}
          placeholder="Все продукты"
        />
      </div>

      {/* Список продуктов */}
      <div className="px-3 xs:px-4 sm:px-6 lg:px-25 pt-4 sm:pt-6 lg:pt-8 lg:mr-52">
        <ProductsList products={products} />
      </div>
    </main>
  )
}

export default ProductsPage;