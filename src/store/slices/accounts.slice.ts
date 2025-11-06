import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { AccountData, BankClientLink } from '../../types/account-types.ts';
import accountsMock from '../../mocks/accounts-mock.ts';

type AccountsState = {
  accounts: AccountData[];
  loading: boolean;
  error: string | null;
}

const initialState: AccountsState = {
  accounts: [],
  loading: false,
  error: null,
}

export const getAccounts = createAsyncThunk(
  'accounts/getAccounts',
  async (bankClientLinks: BankClientLink[], { rejectWithValue }) => {
    const accounts: AccountData[] = [];
    bankClientLinks.map(() => {
      // Должны будем для каждого банка получать счета тут, пока тупо из заглушки берем
      accountsMock.map((account) => accounts.push(account));
    })

    if (accounts.length === 0) {
      rejectWithValue("Нет добавленных счетов");
    }

    return accounts;
  }
)

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAccounts.fulfilled, (state, action) => {
        state.accounts = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(getAccounts.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
  }
})

export default accountsSlice.reducer;