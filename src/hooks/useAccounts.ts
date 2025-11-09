import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './rtk.ts';
import type { AccountData, BankClientLink } from '../types/account-types.ts';
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

      dispatch(setAccounts(resAccounts));
      return resAccounts;
    } catch (err: any) {
      if (err?.data?.message === "Consent is not approved yet") {
        return [{
          accountId: "waitingforapproval",
          bankId: bankClientLink.bankId,
          status: "Pending",
          amount: 0,
          currency: "cur",
          purposeType: "NONE",
          accountSubType: "Card",
          nickname: "nick",
          description: null,
          openingDate: new Date(''),
          account: [],
        }] as AccountData[];
      }
      dispatch(setError(err?.data?.message || 'Ошибка при загрузке счетов'));
      return [];
    }
  }, [fetchAccounts, dispatch, accounts.accounts]);

  const handleGetAllAccounts = useCallback(async () => {
    const links = user?.bankClientLinks;
    if (!links?.length) return [];

    try {
      const allResults = await Promise.all(
        links.map(async (link) => {
          const res = await handleGetAccountsByBank(link);

          return Array.isArray(res) ? res : [];
        })
      );

      const mergedAccounts = allResults.flat().filter(Boolean);

      dispatch(setAccounts(mergedAccounts));
      return mergedAccounts;
    } catch (err: any) {
      dispatch(setError(err?.data?.message || 'Ошибка при загрузке счетов'));
      return [];
    }
  }, [dispatch, handleGetAccountsByBank, user]);

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