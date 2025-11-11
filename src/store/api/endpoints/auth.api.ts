import { baseApi } from '../baseApi';
import type { User } from '../../../types/account-types';

type LoginRequest = { username: string; password: string };
type LoginResponse = { token: string; expiresIn: number };

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: body => ({
        url: 'api/user/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth', 'User'],
    }),
    register: build.mutation<LoginResponse, LoginRequest>({
      query: body => ({
        url: 'api/user/register',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth', 'User'],
    }),
    generalData: build.query<User, null>({
      query: () => ({
        url: 'api/user/generalData',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useRegisterMutation, useLazyGeneralDataQuery } = authApi;
