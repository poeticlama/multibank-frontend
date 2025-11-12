import type { Transaction } from '../types/transaction-types.ts';
import { useEffect, useState } from 'react';
import { useLazyGetTransactionsQuery } from '../store/api/endpoints/transactions.api.ts';
import { useAccounts } from './useAccounts.ts';

export const useTransactions = () => {
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [transactionsLoading, setTransactionsLoading] = useState(true);
  const [hookError, setHookError] = useState(false);

  const [getTransactions, { isError: transactionsError }] =
    useLazyGetTransactionsQuery();
  const { accounts, isLoading } = useAccounts();

  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const validAccounts = accounts.filter(
          account => account.status !== 'Pending'
        );
        if (!validAccounts?.length) return;

        const transactionsByAccount = await Promise.all(
          validAccounts.map(async account => {
            try {
              const res = await getTransactions({
                bank_id: account.bankId,
                account_id: account.accountId,
                limit: 100,
                page: 1,
              }).unwrap();

              return res.transactions;
            } catch (error) {
              console.error(
                `Ошибка при загрузке транзакций для счёта ${account.accountId}:`,
                error
              );
              setHookError(true);
              return [];
            }
          })
        );
        setHookError(false);
        setTransactionsLoading(true);
        const allTransactions = transactionsByAccount.flat();
        setAllTransactions(allTransactions);
        setTransactionsLoading(false);
      } catch (error) {
        setHookError(true);
        setTransactionsLoading(false);
        console.error('Ошибка при загрузке всех транзакций:', error);
      }
    };

    getAllTransactions();
  }, [accounts, getTransactions]);

  return {
    allTransactions,
    isLoading: isLoading || transactionsLoading,
    isError: transactionsError || hookError,
  }
}