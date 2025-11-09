import { baseApi } from '../baseApi.ts';
import type { ExpensesPredict } from '../../../types/account-types.ts';

export const statisticsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getStatistics: build.query<ExpensesPredict, null>({
      query: () => ({
        url: `/api/data/statistic?type=PERSONAL`,
        method: 'GET',
      })
    }),
  }),
  overrideExisting: false,
});

export const { useLazyGetStatisticsQuery } = statisticsApi;