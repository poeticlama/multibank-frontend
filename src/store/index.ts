import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice.ts';
import accountsReducer from './slices/accounts.slice.ts';

const store = configureStore({
  reducer: {
    auth: authReducer,
    accounts: accountsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
