import AccountCard from '../components/account/accounts-block/AccountCard.tsx';
import ExpenseStatistics from '../components/account/statistics-block/ExpenseStatistics.tsx';

import { Button } from '../components/shared/Button';
import { useNavigate } from 'react-router-dom';

import { useAccounts } from '../hooks/useAccounts.ts';
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/auth/useAuth.ts';
import { useLazyGetStatisticsQuery } from '../store/api/endpoints/statistics.api.ts';
import type { ExpensesPredict } from '../types/account-types.ts';
import { useSetDescriptionMutation } from '../store/api/endpoints/accounts.api.ts';



const AccountPage = () => {
  const navigate = useNavigate();

  const { accounts, hasAccounts, getAllAccounts, isLoading } = useAccounts();
  const { refreshUser } = useAuth();
  const [statistics, setStatistics] = useState<ExpensesPredict | null>(null);

  const [fetchStatistics, {isLoading: statisticsLoading, isError: statisticsError}] = useLazyGetStatisticsQuery();
  const [setDescription] = useSetDescriptionMutation();



  const onDescriptionUpdate = async (accountId: string, bankId: string, newDescription: string) => {
    try {
      await setDescription({
        bankId,
        id: accountId,
        text: newDescription,
      });
      await getAllAccounts();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await refreshUser();
        await getAllAccounts();
        const res = await fetchStatistics(null).unwrap();
        setStatistics(res);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className='py-4 sm:py-6 lg:py-8 xl:py-10 px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-25 text-blue-900 max-w-screen-2xl mx-auto'>
      <h2 className='text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-light pl-2 sm:pl-4 lg:pl-6 xl:pl-10 mb-4 sm:mb-5'>
        Добро пожаловать!
      </h2>

      <div className='flex flex-col xl:flex-row gap-4 sm:gap-5 lg:gap-6 xl:gap-8 2xl:gap-10'>
        {/* Блок с картами счетов */}
        <div className='flex flex-col gap-2 sm:gap-3 bg-gray-100 p-3 sm:p-4 lg:p-5 rounded-xl w-full xl:w-auto xl:min-w-[300px] 2xl:min-w-[350px] h-fit'>
          {!hasAccounts && !isLoading && (
            <div className='text-center my-3 opacity-40'>
              У вас пока не добавлены счета
            </div>
          )}
          {isLoading ? "Загрузка..." : accounts.map(account => (
              <AccountCard key={account.accountId} accountData={account} onDescriptionUpdate={onDescriptionUpdate} />
          ))}

          <Button 
            onClick={ ()=>{navigate('/account/add')} } 
            disabled={false}
          >
            Добавить счет
          </Button>

        </div>


        {/* Блок со статистикой */}
        <div className='bg-gray-100 p-3 sm:p-4 lg:p-5 rounded-xl w-full h-fit flex flex-col justify-around'>
          <h2 className='text-base sm:text-lg lg:text-xl mb-4 sm:mb-6 lg:mb-8 xl:mb-12'>
            Расходы за последние 12 месяцев
          </h2>
          {(statisticsLoading || !statistics) ?
            statisticsError ? "Статистика недоступна" : "Загрузка..."
            :
            <ExpenseStatistics
              months={Object.keys(statistics.statistic)}
              expenses={Object.values(statistics.statistic)}
              currentPredict={statistics.currentPredict}
              nextPredict={statistics.nextPredict}
            />
          }
        </div>
      </div>
    </main>
  );
}

export default AccountPage;