import { baseApi } from '../baseApi.ts';
import type { BankInfo } from '../../../types/bank-info.ts';
import type { Status } from '../../../types/account-types.ts';
import type { ProductType } from '../../../types/products-types.ts';

type Consent = {
  id: number;
  consent: string;
  bank: string;
  user: {
    id: string;
    username: string;
    password: string;
    name: string;
    surname: string;
    status: Status;
    statusExpireDate: string | null;
    consents: string[];
  }
};

type AddBankResponse = {
  bankId: string;
  name: string;
  url: string;
  token: string;
  expiresAt: string;
  consents: Consent[];
  status: string;
  expirationDate: string;
  clientId: string;
}

type AddBankRequest = { bankId: string, bankName: string, url: string }

export const banksApi = baseApi.injectEndpoints({
  endpoints: build => ({
    banks: build.query<BankInfo[], null>({
      query: () => ({
        url: `api/banks`,
        method: 'GET',
      }),
    }),
    addBank: build.mutation<AddBankResponse, AddBankRequest>({
      query: ({ bankId, bankName, url }) => ({
        url: `api/banks/addBank?bankId=${bankId}&bankName=${bankName}&url=${url}`,
        method: 'POST',
      }),
    }),
    getProducts: build.query<ProductType[], string>({
      query: (bankId) => ({
        url: `api/banks/availableProducts/${bankId}`,
        method: 'GET'
      })
    })
  }),
  overrideExisting: false,
});

export const { useLazyBanksQuery, useAddBankMutation, useLazyGetProductsQuery } = banksApi;