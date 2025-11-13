import type { Transaction } from '../types/transaction-types.ts';
import { useEffect, useState } from 'react';
import { useLazyGetTransactionsQuery } from '../store/api/endpoints/transactions.api.ts';
import { useAccounts } from './useAccounts.ts';

export const useTransactions = (accountFilter: string) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionsLoading, setTransactionsLoading] = useState(true);
  const [hookError, setHookError] = useState(false);

  const [fetchTransactions, { isError: transactionsError }] = useLazyGetTransactionsQuery();
  const { accounts, isLoading } = useAccounts();

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const account = accountFilter.length
          ? accounts.find(acc => acc.account[0].identification === accountFilter)
          : accounts[0];

        if (!account) return;

        const { transactions } = await fetchTransactions({
          bank_id: account.bankId,
          account_id: account.accountId,
          limit: 100,
          page: 1,
        }).unwrap();

        setTransactions(transactions);
        setTransactionsLoading(false);
      } catch (error) {
        setHookError(true);
        setTransactionsLoading(false);
        console.error('Ошибка при загрузке всех транзакций:', error);
      }
    };

    getTransactions();
  }, [accounts, fetchTransactions, accountFilter]);

  return {
    transactions,
    isLoading: isLoading || transactionsLoading,
    isError: transactionsError || hookError,
    accounts,
  };
};
