import { useAppDispatch, useAppSelector } from './rtk.ts';
import {
  useLoginMutation,
  useRegisterMutation,
  useLazyGeneralDataQuery,
} from '../store/api/endpoints/auth.api.ts';
import {
  clearError,
  logout,
  switchStatus,
  setUser,
  setToken,
  saveUserToStorage,
  setError,
} from '../store/slices/auth.slice.ts';
import { useCallback } from 'react';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth);

  const [loginMutation, { isLoading: loginLoading }] = useLoginMutation();
  const [registerMutation, { isLoading: registerLoading }] = useRegisterMutation();
  const [fetchGeneralData, { isLoading: generalDataLoading }] = useLazyGeneralDataQuery();

  const handleLogin = async (loginStr: string, password: string, rememberMe: boolean) => {
    try {
      const resLogin = await loginMutation({ username: loginStr, password }).unwrap();
      if (!resLogin.token || !resLogin.expiresIn)
        throw new Error('Сервер не вернул токен или expiresIn');

      dispatch(setToken(resLogin.token));

      const userData = await fetchGeneralData(null).unwrap();

      dispatch(setUser(userData));
      dispatch(
        saveUserToStorage({
          user: userData,
          token: resLogin.token,
          expiresIn: resLogin.expiresIn,
          remember: rememberMe,
        })
      );

      return true;
    } catch (err: any) {
      dispatch(setError(err?.data?.message || 'Ошибка при логине'));
      return false;
    }
  };

  const handleRegister = async (loginStr: string, password: string, rememberMe = true) => {
    try {
      const res = await registerMutation({ username: loginStr, password }).unwrap();

      if (!res.token || !res.expiresIn) throw new Error('Сервер не вернул токен или expiresIn');

      dispatch(setToken(res.token));

      const userData = await fetchGeneralData(null).unwrap();

      dispatch(setUser(userData));
      dispatch(
        saveUserToStorage({
          user: userData,
          token: res.token,
          expiresIn: res.expiresIn,
          remember: rememberMe,
        })
      );

      return true;
    } catch (err: any) {
      dispatch(setError(err?.data?.message || 'Ошибка при регистрации'));
      return false;
    }
  };

  const refreshUser = useCallback(async () => {
    try {
      const userData = await fetchGeneralData(null).unwrap();
      dispatch(setUser(userData));

      if (auth.token && auth.expiresAt && auth.user) {
        dispatch(
          saveUserToStorage({
            user: userData,
            token: auth.token,
            expiresIn: auth.expiresAt - Date.now(),
            remember: !!localStorage.getItem('bankUser'),
          })
        );
      }

      return userData;
    } catch (err: any) {
      dispatch(setError(err?.data?.message || 'Ошибка при обновлении данных пользователя'));
      return null;
    }
  }, [auth.expiresAt, auth.token, auth.user, dispatch, fetchGeneralData]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSwitchStatus = () => {
    dispatch(switchStatus());
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return {
    user: auth.user,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    refreshUser,
    switchStatus: handleSwitchStatus,
    clearError: handleClearError,
    isAuthenticated: auth.isAuthenticated,
    loading: auth.loading || loginLoading || registerLoading || generalDataLoading,
    error: auth.error,
  };
};
