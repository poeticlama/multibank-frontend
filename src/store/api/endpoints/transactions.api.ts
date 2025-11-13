import { baseApi } from '../baseApi.ts';
import type { TransactionsResponse, TransactionType } from '../../../types/transaction-types.ts';

const transactionsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getTransactions: build.query<
      TransactionsResponse,
      { bank_id: string; account_id: string; page: number; limit: number }
    >({
      query: ({ bank_id, account_id, page, limit }) => ({
        url: `/api/transaction/getTransactions/${bank_id}/${account_id}?page=${page}&limit=${limit}&predictParam=true`,
        method: 'GET',
      }),
      providesTags: ['Transactions'],
    }),
    setTransactionType: build.mutation<void, { bankId: string; id: string; type: TransactionType }>(
      {
        query: body => ({
          url: '/api/transaction/setType',
          method: 'POST',
          body,
        }),
        invalidatesTags: ['Transactions'],
      }
    ),
  }),
  overrideExisting: false,
});

export const { useLazyGetTransactionsQuery, useSetTransactionTypeMutation } = transactionsApi;
