import { baseApi } from '../baseApi.ts';
import type { AccountData, BankClientLink } from '../../../types/account-types.ts';

type ConsentAccountResponse = {
  status: string;
  requestId: string;
  consentId: string;
  autoApproved: boolean;
  createdAt: string;
}

export const accountsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getAccounts: build.query<AccountData[], BankClientLink>({
      query: ({ bankId, clientId }) => ({
        url: `api/account/getAccounts/${bankId}/${clientId}`,
        method: 'GET',
      }),
      providesTags: ['Accounts'],
    }),
    consentAccount: build.mutation<ConsentAccountResponse, { bank_id: string; client_id: string }>({
      query: (body) => ({
        url: 'api/consent/account',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Accounts'],
    }),
  }),
  overrideExisting: false,
});

export const { useLazyGetAccountsQuery, useConsentAccountMutation } = accountsApi;