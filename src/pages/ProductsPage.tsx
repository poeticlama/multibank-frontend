import { useEffect, useState } from 'react';
import ProductsList from '../components/products/ProductsList.tsx';
import CustomSelect, { type Option } from '../components/shared/CustomSelect.tsx';
import productTypes from '../constants/productTypes.ts';
import { useLazyBanksQuery, useLazyGetProductsQuery } from '../store/api/endpoints/banks.api.ts';
import type { ProductType } from '../types/products-types.ts';

const ProductsPage = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [fetchBanks, { isLoading: banksLoading, isError: banksError }] = useLazyBanksQuery();
  const [fetchProducts] = useLazyGetProductsQuery();
  const [banks, setBanks] = useState<Option[]>([]);
  const [typeFilter, setTypeFilter] = useState('all');

  useEffect(() => {
    const loadBanks = async () => {
      try {
        const fetchedBanks = await fetchBanks(null).unwrap();
        setBanks([
          { label: 'Все банки', value: 'all' },
          ...fetchedBanks.map(bank => {
            return { label: bank.name, value: bank.id };
          }),
        ]);
      } catch (error) {
        console.error('Ошибка при загрузке банков:', error);
      }
    };

    loadBanks();
  }, [fetchBanks]);

  useEffect(() => {
    const loadAllProducts = async () => {
      try {
        if (typeFilter === 'all') {
          const bankIds = banks.slice(1).map(bank => bank.value);
          const productPromises = bankIds.map(bankId =>
            fetchProducts(bankId).unwrap()
          );

          const results = await Promise.all(productPromises);

          const allProducts = results.flat();
          setProducts(allProducts);
        } else {
          const products = await fetchProducts(typeFilter).unwrap();
          setProducts(products.filter(product => product.productType === typeFilter));
        }
      } catch (error) {
        console.error('Ошибка при загрузке продуктов:', error);
        setProducts([]);
      }
    };

    loadAllProducts();
  }, [typeFilter, banks, fetchProducts]);

  if (banksLoading) {
    return (
      <main className='pt-4 sm:pt-6 lg:pt-8 text-blue-900 max-w-screen-2xl mx-auto'>
        <div className='text-center'>Загрузка продуктов...</div>
      </main>
    );
  }

  if (banksError) {
    return (
      <main className='pt-4 sm:pt-6 lg:pt-8 text-blue-900 max-w-screen-2xl mx-auto'>
        <div className='text-center text-red-500'>Ошибка загрузки продуктов</div>
      </main>
    );
  }

  return (
    <main className='pt-4 sm:pt-6 lg:pt-8 text-blue-900 max-w-screen-2xl mx-auto'>
      <h1 className='text-2xl font-bold mb-5 lg:mb-10 lg:px-25 text-blue-900 text-center lg:text-left'>
        Продукты банков
      </h1>

      {/* Фильтры */}
      <div className='lg:ml-25 flex flex-col lg:flex-row gap-1 sm:gap-2 lg:gap-3 px-2 sm:px-0 items-center'>
        <CustomSelect options={banks} />
        <CustomSelect options={productTypes} onChange={(option) => setTypeFilter(option)} />
      </div>

      {/* Список продуктов */}
      <div className='px-3 xs:px-4 sm:px-6 lg:px-25 pt-4 sm:pt-6 lg:pt-8 lg:mr-52'>
        <ProductsList products={products} />
      </div>
    </main>
  );
};

export default ProductsPage;