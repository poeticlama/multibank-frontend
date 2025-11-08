import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './rtk.ts';
import type { BankClientLink } from '../types/account-types.ts';
import { useLazyGetAccountsQuery } from '../store/api/endpoints/accounts.api.ts';
import { setAccounts } from '../store/slices/accounts.slice.ts';
import { setError } from '../store/slices/accounts.slice.ts';

export const useAccounts = () => {
  const dispatch = useAppDispatch();
  const accounts = useAppSelector((state) => state.accounts);
  const user = useAppSelector((state) => state.auth.user);

  const [fetchAccounts, { isLoading: getAccountsLoading }] = useLazyGetAccountsQuery();

  const handleGetAccountsByBank = useCallback(async (bankClientLink: BankClientLink) => {
    try {
      const resAccounts = await fetchAccounts(bankClientLink).unwrap();

      dispatch(setAccounts(resAccounts ? resAccounts : []));

      return accounts.accounts;
    } catch (err: any) {
      dispatch(setError(err?.data?.message || 'Ошибка при загрузке счетов'));
      return [];
    }
  }, [fetchAccounts, dispatch, accounts.accounts]);

  const handleGetAllAccounts = useCallback(async () => {
    const links = user?.bankClientLinks;
    if (!links?.length) return [];

    try {
      const allResults = await Promise.all(
        links.map((link) => handleGetAccountsByBank(link))
      );

      const mergedAccounts = allResults.flat();

      dispatch(setAccounts(mergedAccounts));

      return mergedAccounts;
    } catch (err: any) {
      dispatch(setError(err?.data?.message || 'Ошибка при загрузке счетов'));
      return [];
    }
  }, [dispatch, handleGetAccountsByBank, user?.bankClientLinks]);

  return {
    accounts: accounts.accounts,
    isLoading: getAccountsLoading,
    error: accounts.error,

    getAccountsByBank: handleGetAccountsByBank,
    getAllAccounts: handleGetAllAccounts,

    hasAccounts: accounts.accounts.length > 0,
    accountsCount: accounts.accounts.length,
  };
};