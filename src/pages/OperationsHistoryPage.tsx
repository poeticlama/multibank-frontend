import VirtualScroll from '../components/operations-history/VirtualScroll.tsx';
import { SETTINGS } from '../constants/settings.ts';
import { Operation } from '../components/operations-history/Operation.tsx';
import { useEffect } from 'react';
import { useAuth } from '../hooks/auth/useAuth.ts'
import Loader from '../components/shared/Loader.tsx';
import { useTransactions } from '../hooks/useTransactions.ts';

const OperationsHistoryPage = () => {
  const {allTransactions, isLoading, isError} = useTransactions();
  const { user } = useAuth();

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div className='text-lg text-red-600 text-center mt-10'>Ошибка загрузки транзакций</div>;
  }

  return (
    <main className='pt-4 sm:pt-6 lg:pt-8 text-blue-900 max-w-screen-2xl mx-auto'>
      {/* Заголовок */}
      <div className='mb-4 sm:mb-6 lg:mb-5'>
        <h1 className='text-2xl font-bold mb-5 lg:mb-10 lg:px-25 text-blue-900 text-center lg:text-left'>
          Операции
        </h1>

        {/* Фильтры */}
        {/*<div className="lg:ml-25 flex flex-col lg:flex-row gap-1 sm:gap-2 lg:gap-3 px-2 sm:px-0 items-center">*/}
        {/*  <CustomSelect*/}
        {/*      options={months}*/}
        {/*    />*/}

        {/*  { !!user &&*/}
        {/*    (*/}
        {/*      <div>*/}
        {/*        {*/}
        {/*          user.status === "PREMIUM" ?*/}
        {/*          <CustomSelect*/}
        {/*            options={personalBusiness}*/}
        {/*          /> :*/}
        {/*          <div title="Только для premium аккаунтов">*/}
        {/*            /!**/}
        {/*              У меня в Firefox cursor-not-allowed не показывает title,*/}
        {/*              вроде это нормально для многих браузеров,*/}
        {/*              поэтому лучше на блок вверх title подвинуть*/}
        {/*            *!/*/}
        {/*            <div className="cursor-not-allowed opacity-50 pointer-events-none">*/}
        {/*              <CustomSelect*/}
        {/*                options={[ { label: "Личные и бизнес траты", value: "00"}, {label: "Только для premium аккаунтов", value: "01"}, ]}*/}
        {/*              />*/}
        {/*            </div>*/}
        {/*          </div>*/}
        {/*        }*/}
        {/*      </div>*/}
        {/*    )*/}
        {/*  }*/}

        {/*</div>*/}
      </div>

      {/* Список операций */}
      <div className=' px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-25'>
        {!!user && (
          <VirtualScroll
            settings={SETTINGS}
            template={Operation}
            premium={user.status === 'PREMIUM'}
            transactions={allTransactions}
          />
        )}
      </div>
    </main>
  );
};

export default OperationsHistoryPage;
