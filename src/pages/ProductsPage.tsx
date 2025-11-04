import productsMock from '../mocks/products-mock.ts';
import ProductsList from '../components/products/ProductsList.tsx';
import CustomSelect from '../components/shared/CustomSelect.tsx';

const ProductsPage = () => {
  const products = productsMock;

  return (
    <main className="pt-10 px-25 text-blue-900">
      <h1 className="text-2xl font-bold mb-5">
        Доступные продукты банков
      </h1>
      <div className="flex gap-7 mb-5 ml-5">
        <CustomSelect
          options={[{label: "a", value: "b"}, {label: "c", value: "b"}]}
          placeholder="Все банки"
        />
        <CustomSelect
          options={[{label: "a", value: "b"}, {label: "c", value: "b"}]}
          placeholder="Все продукты"
        />
      </div>
      <ProductsList products={products} />
    </main>
  )
}

export default ProductsPage;
