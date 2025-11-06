import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './rtk.ts';
import { getAccounts } from '../store/slices/accounts.slice.ts';
import type { BankClientLink } from '../types/account-types.ts';

export const useAccounts = () => {
  const dispatch = useAppDispatch();
  const { accounts, loading, error } = useAppSelector((state) => state.accounts);

  const handleGetAccounts = useCallback((bankClientLinks: BankClientLink[]) => {
    return dispatch(getAccounts(bankClientLinks));
  }, [dispatch]);

  const handleGetAllAccounts = useCallback(() => {
    const defaultLinks: BankClientLink[] = [
      {
        bankId: '0',
        clientId: '0',
      }
    ];
    return dispatch(getAccounts(defaultLinks));
  }, [dispatch]);

  return {
    accounts,
    loading,
    error,

    getAccounts: handleGetAccounts,
    getAllAccounts: handleGetAllAccounts,

    hasAccounts: accounts.length > 0,
    accountsCount: accounts.length,

    isLoading: loading,
    hasError: error !== null,
  };
};