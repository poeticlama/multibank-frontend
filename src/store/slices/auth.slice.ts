import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types/account-types';

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  token: string | null;
  expiresAt: number | null;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  token: null,
  expiresAt: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;

      if (action.payload) {
        const userJson = JSON.stringify(action.payload);
        if (localStorage.getItem('bankUser')) {
          localStorage.setItem('bankUser', userJson);
        }
        if (sessionStorage.getItem('bankUser')) {
          sessionStorage.setItem('bankUser', userJson);
        }
      }
    },

    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    saveUserToStorage: (
      _state,
      action: PayloadAction<{
        user: User;
        token: string;
        expiresIn: number; // миллисекунды
        remember: boolean;
      }>
    ) => {
      const { user, token, expiresIn, remember } = action.payload;
      const expiresAt = Date.now() + expiresIn;

      const storage = remember ? localStorage : sessionStorage;

      storage.setItem('bankUser', JSON.stringify(user));
      storage.setItem('token', token);
      storage.setItem('expiresAt', String(expiresAt));
    },

    initFromStorage: state => {
      const savedUser = localStorage.getItem('bankUser') || sessionStorage.getItem('bankUser');
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const expiresAtStr = localStorage.getItem('expiresAt') || sessionStorage.getItem('expiresAt');

      if (!savedUser || !token || !expiresAtStr) {
        return;
      }

      try {
        const expiresAt = Number(expiresAtStr);
        const now = Date.now();

        if (now > expiresAt) {
          localStorage.clear();
          sessionStorage.clear();
          state.user = null;
          state.token = null;
          state.expiresAt = null;
          state.isAuthenticated = false;
          return;
        }

        state.user = JSON.parse(savedUser) as User;
        state.token = token;
        state.expiresAt = expiresAt;
        state.isAuthenticated = true;
      } catch {
        localStorage.clear();
        sessionStorage.clear();
        state.user = null;
        state.token = null;
        state.expiresAt = null;
        state.isAuthenticated = false;
      }
    },

    logout: state => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.expiresAt = null;

      localStorage.clear();
      sessionStorage.clear();
    },

    switchStatus: state => {
      if (state.user) {
        const newStatus = state.user.status === 'PREMIUM' ? 'DEFAULT' : 'PREMIUM';
        state.user = { ...state.user, status: newStatus };

        if (localStorage.getItem('bankUser')) {
          localStorage.setItem('bankUser', JSON.stringify(state.user));
        }
        if (sessionStorage.getItem('bankUser')) {
          sessionStorage.setItem('bankUser', JSON.stringify(state.user));
        }
      }
    },

    clearError: state => {
      state.error = null;
    },
  },
});

export const {
  setUser,
  setToken,
  setLoading,
  setError,
  saveUserToStorage,
  initFromStorage,
  logout,
  switchStatus,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
