import { baseApi } from '../baseApi.ts';
import type { AccountData, BankClientLink } from '../../../types/account-types.ts';

export const accountsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAccounts: build.query<AccountData[], BankClientLink>({
      query: ({ bankId, clientId }) => ({
        url: `api/account/getAccounts/${bankId}/${clientId}`,
        method: 'GET',
      }),
      providesTags: ['Accounts'],
    }),
  }),
  overrideExisting: false,
})

export const { useLazyGetAccountsQuery } = accountsApi;