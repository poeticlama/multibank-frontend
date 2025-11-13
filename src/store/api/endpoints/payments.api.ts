import { baseApi } from '../baseApi.ts';

type PaymentConsentRequest = {
  bank_id: string;
  debtor_account: string;
  amount: number;
  currency: string;
  creditor_account: string;
  creditor_name: string;
  reference: string;
};

type PaymentRequest = {
  accountId: string;
  debtor_account: string;
  creditor_account: string;
  debtor_bank: string;
  creditor_bank: string;
  amount: number;
  currency: string;
  comment: string;
  debtor_scheme: string;
  creditor_scheme: string;
};

const paymentsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    singlePaymentConsent: build.mutation<string, PaymentConsentRequest>({
      query: body => ({
        url: 'api/consent/singlePayment',
        method: 'POST',
        body,
      }),
    }),
    payment: build.mutation<string, PaymentRequest>({
      query: body => ({
        url: 'api/payment',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSinglePaymentConsentMutation, usePaymentMutation } = paymentsApi;
