import ExpenseStatistics from '../components/account/statistics-block/ExpenseStatistics.tsx';

import { useGetStatisticsQuery } from '../store/api/endpoints/statistics.api.ts';
import AccountsBlock from '../components/account/accounts-block/AccountsBlock.tsx';
import Loader from '../components/shared/Loader.tsx';

const AccountPage = () => {
  const {
    data: statistics,
    isLoading: statisticsLoading,
    isError: statisticsError,
  } = useGetStatisticsQuery(null);

  return (
    <main className='py-4 sm:py-6 lg:py-8 xl:py-10 px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-25 text-blue-900 max-w-screen-2xl mx-auto'>
      <h2 className='text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-light pl-2 sm:pl-4 lg:pl-6 xl:pl-10 mb-4 sm:mb-5'>
        Добро пожаловать!
      </h2>

      <div className='flex flex-col xl:flex-row gap-4 sm:gap-5 lg:gap-6 xl:gap-8 2xl:gap-10'>
        {/* Блок с картами счетов */}
        <AccountsBlock />

        {/* Блок со статистикой */}
        <div className='bg-gray-100 p-3 sm:p-4 lg:p-5 rounded-xl w-full h-fit flex flex-col justify-around sticky top-40'>
          <h2 className='text-base sm:text-lg lg:text-xl mb-4 sm:mb-6 lg:mb-8 xl:mb-12'>
            Расходы за последние 12 месяцев
          </h2>
          {statisticsLoading || !statistics ? (
            statisticsError ? (
              <h2 className="text-sm text-center opacity-40">Статистика недоступна</h2>
            ) : (
              <Loader />
            )
          ) : (
            <ExpenseStatistics
              months={Object.keys(statistics.statistic)}
              expenses={Object.values(statistics.statistic)}
              currentPredict={statistics.currentPredict}
              nextPredict={statistics.nextPredict}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default AccountPage;
