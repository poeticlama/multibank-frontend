import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AccountData } from '../../types/account-types.ts';

type AccountsState = {
  accounts: AccountData[];
  error: string | null;
}

const initialState: AccountsState = {
  accounts: [],
  error: null,
}

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    setAccounts: (state, action: PayloadAction<AccountData[]>) => {
      state.accounts = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
})

export const { setAccounts, setError } = accountsSlice.actions;

export default accountsSlice.reducer;