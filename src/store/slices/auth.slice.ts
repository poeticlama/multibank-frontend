import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Credentials, User } from '../../types/account-types';
import mockUsers from '../../mocks/users-mock.ts';

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: Credentials, { rejectWithValue }) => {
    try {
      // Имитация API запроса и регистрации (заменим на запросы потом все)
      await new Promise(resolve => setTimeout(resolve, 500));
      const foundUser = mockUsers.find(
        user => user.login === credentials.login && user.password === credentials.password
      );

      if (foundUser) {
        if (credentials.rememberMe) {
          localStorage.setItem('bankUser', JSON.stringify(foundUser));
        } else {
          sessionStorage.setItem('bankUser', JSON.stringify(foundUser));
        }
        return foundUser;
      }

      return rejectWithValue('Неверный логин или пароль');
    } catch (error) {
      return rejectWithValue('Ошибка при авторизации');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (credentials: { login: string; password: string }, { rejectWithValue }) => {
    try {
      // Проверяем, существует ли пользователь (вся логика эта будет на бэке потом)
      const userExists = mockUsers.find(user => user.login === credentials.login);
      if (userExists) {
        return rejectWithValue('Пользователь с таким логином уже существует');
      }

      // Создаем нового пользователя
      const newUser: User = {
        id: mockUsers.length + 1,
        login: credentials.login,
        password: credentials.password,
        name: credentials.login,
        status: 'DEFAULT',
      };

      // В реальном приложении здесь был бы API вызов
      mockUsers.push(newUser);

      return newUser;
    } catch (error) {
      return rejectWithValue('Ошибка при регистрации');
    }
  }
);

export const initAuthListener = createAsyncThunk('auth/initAuthListener', async () => {
  const savedUser = localStorage.getItem('bankUser') || sessionStorage.getItem('bankUser');
  if (savedUser) {
    try {
      return JSON.parse(savedUser);
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('bankUser');
      sessionStorage.removeItem('bankUser');
      return null;
    }
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('bankUser');
      sessionStorage.removeItem('bankUser');
    },
    switchStatus: state => {
      if (state.user) {
        const newStatus = state.user.status === 'PREMIUM' ? 'DEFAULT' : 'PREMIUM';
        state.user.status = newStatus;

        // Обновляем в хранилище
        const updatedUser = { ...state.user, status: newStatus };
        if (localStorage.getItem('bankUser')) {
          localStorage.setItem('bankUser', JSON.stringify(updatedUser));
        }
        if (sessionStorage.getItem('bankUser')) {
          sessionStorage.setItem('bankUser', JSON.stringify(updatedUser));
        }
      }
    },
    setUserFromStorage: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(register.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;

        localStorage.setItem('bankUser', JSON.stringify(action.payload));
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(initAuthListener.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      });
  },
});

export const { logout, switchStatus, setUserFromStorage, clearError } = authSlice.actions;
export default authSlice.reducer;