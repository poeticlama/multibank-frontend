import VirtualScroll from '../components/operations-history/VirtualScroll.tsx';
import { SETTINGS } from '../constants/settings.ts';
import { Operation } from '../components/operations-history/Operation.tsx';
import CustomSelect from '../components/shared/CustomSelect.tsx';
import { useEffect, useState } from 'react';
import months from '../constants/options/months.ts';
import personalBusiness from '../constants/options/personal-business.ts';

import { useAuth } from '../hooks/auth/useAuth.ts';
import { useLazyGetTransactionsQuery } from '../store/api/endpoints/transactions.api.ts';
import { useAccounts } from '../hooks/useAccounts.ts';
import type { Transaction } from '../types/transaction-types.ts';
import Loader from '../components/shared/Loader.tsx';


const OperationsHistoryPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { user } = useAuth();
  const { getAllAccounts, accounts } = useAccounts();

  const [getTransactions, {isLoading: transactionsLoading, isError: transactionsError}] = useLazyGetTransactionsQuery();

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const fetchedAccounts = await getAllAccounts();

        const validAccounts = fetchedAccounts?.length ? fetchedAccounts : accounts;
        if (!validAccounts?.length) return;

        const transactionsByAccount = await Promise.all(
          validAccounts.map(async (account) => {
            try {
              const res = await getTransactions({
                bank_id: account.bankId,
                account_id: account.accountId,
                limit: 100,
                page: 1,
              }).unwrap();

              return res.transactions;
            } catch (error) {
              console.error(`Ошибка при загрузке транзакций для счёта ${account.accountId}:`, error);
              return [];
            }
          })
        );

        const allTransactions = transactionsByAccount.flat();
        setTransactions(allTransactions);
      } catch (error) {
        console.error('Ошибка при загрузке всех транзакций:', error);
      }
    };

    getAllTransactions();
  }, []);

  if (transactionsLoading) {
    return <Loader />;
  }

  if (transactionsError) {
    return <div className="text-lg text-red-600 text-center mt-10">Ошибка загрузки транзакций</div>
  }

  return (
    <main className="pt-4 sm:pt-6 lg:pt-8 text-blue-900 max-w-screen-2xl mx-auto">
      {/* Заголовок */}
      <div className="mb-4 sm:mb-6 lg:mb-5">
        <h1 className="text-2xl font-bold mb-5 lg:mb-10 lg:px-25 text-blue-900 text-center lg:text-left">
          Операции
        </h1>
        
        {/* Фильтры */}
        <div className="lg:ml-25 flex flex-col lg:flex-row gap-1 sm:gap-2 lg:gap-3 px-2 sm:px-0 items-center">
          <CustomSelect
              options={months}
            />

          { !!user &&
            (
              <div>
                {
                  user.status === "PREMIUM" ?
                  <CustomSelect
                    options={personalBusiness}
                  /> :
                  <div title="Только для premium аккаунтов">
                    {/*
                      У меня в Firefox cursor-not-allowed не показывает title,
                      вроде это нормально для многих браузеров,
                      поэтому лучше на блок вверх title подвинуть
                    */}
                    <div className="cursor-not-allowed opacity-50 pointer-events-none">
                      <CustomSelect
                        options={[ { label: "Личные и бизнес траты", value: "00"}, {label: "Только для premium аккаунтов", value: "01"}, ]}
                      />
                    </div>
                  </div>
                }
              </div>
            )
          }

        </div>
      </div>

      {/* Список операций */}
      <div className=" px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-25">
        {!!user && (
            <VirtualScroll settings={SETTINGS} template={Operation} premium={user.status === "PREMIUM"} transactions={transactions} />
          )
        }
      </div>
    </main>
  )
}

export default OperationsHistoryPage;