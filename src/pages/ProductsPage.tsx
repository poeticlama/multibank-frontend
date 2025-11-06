import { useEffect, useMemo, useState } from 'react';
import productsMock from '../mocks/products-mock.ts';
import ProductsList from '../components/products/ProductsList.tsx';
import CustomSelect from '../components/shared/CustomSelect.tsx';
import productTypes from '../constants/productTypes.ts';
import { useAccounts } from '../hooks/useAccounts.ts';

const ProductsPage = () => {
  const [products, setProducts] = useState(productsMock);
  const {
    accounts,
    getAllAccounts,
    isLoading,
    hasError,
    hasAccounts
  } = useAccounts();

  useEffect(() => {
    getAllAccounts();
  }, [getAllAccounts]);

  const banks = useMemo(() => {
    if (!hasAccounts) return [];

    const uniqueBanks = Array.from(
      new Set(accounts.map(account => account.bank))
    ).map(bank => {
      const account = accounts.find(acc => acc.bank === bank);
      return {
        label: account?.bank || `Банк ${bank}`,
        value: bank
      };
    });

    return [
      { label: 'Все банки', value: "all" },
      ...uniqueBanks
    ];
  }, [accounts, hasAccounts]);

  const sortProductsByType = (productType: string) => {
    if (productType === 'all') {
      setProducts(productsMock);
      return;
    }
    setProducts(productsMock.filter(product => product.productType === productType));
  }

  if (isLoading) {
    return (
      <main className="pt-4 sm:pt-6 lg:pt-8 text-blue-900 max-w-screen-2xl mx-auto">
        <div className="text-center">Загрузка счетов...</div>
      </main>
    );
  }

  if (hasError) {
    return (
      <main className="pt-4 sm:pt-6 lg:pt-8 text-blue-900 max-w-screen-2xl mx-auto">
        <div className="text-center text-red-500">Ошибка загрузки счетов</div>
      </main>
    );
  }

  return (
    <main className="pt-4 sm:pt-6 lg:pt-8 text-blue-900 max-w-screen-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-5 lg:mb-10 lg:px-25 text-blue-900 text-center lg:text-left">
        Продукты банков
      </h1>

      {/* Фильтры */}
      <div className="lg:ml-25 flex flex-col lg:flex-row gap-1 sm:gap-2 lg:gap-3 px-2 sm:px-0 items-center">
        <CustomSelect
          options={banks}
        />
        <CustomSelect
          options={productTypes}
          onChange={sortProductsByType}
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