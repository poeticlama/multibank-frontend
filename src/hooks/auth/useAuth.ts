import { useAppDispatch, useAppSelector } from '../rtk';
import {
  useLoginMutation,
  useRegisterMutation,
  useLazyGeneralDataQuery,
} from '../../store/api/endpoints/auth.api';
import {
  clearError,
  logout,
  switchStatus,
  setUser,
  setToken,
  saveUserToStorage,
  setError,
} from '../../store/slices/auth.slice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

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

      if (!res.token || !res.expiresIn)
        throw new Error('Сервер не вернул токен или expiresIn');

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
    switchStatus: handleSwitchStatus,
    clearError: handleClearError,
    isAuthenticated: auth.isAuthenticated,
    loading: auth.loading || loginLoading || registerLoading || generalDataLoading,
    error: auth.error,
  };
};
