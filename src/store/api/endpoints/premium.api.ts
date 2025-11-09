import { baseApi } from '../baseApi.ts';

export const premiumApi = baseApi.injectEndpoints({
  endpoints: build => ({
    activatePremium: build.mutation<void, number>({
      query: (days) => ({
        url: `/api/user/activatePremium/${days}`,
        method: 'POST',
      })
    }),
  }),
  overrideExisting: false,
});

export const { useActivatePremiumMutation } = premiumApi;