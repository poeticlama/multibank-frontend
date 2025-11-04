import productsMock from '../mocks/products-mock.ts';
import ProductsList from '../components/products/ProductsList.tsx';

const ProductsPage = () => {
  const products = productsMock;

  return (
    <main className="pt-10 px-25 text-blue-900">
      <h1 className="text-2xl font-bold mb-3">
        Доступные продукты банков
      </h1>
      <ProductsList products={products} />
    </main>
  )
}

export default ProductsPage;
