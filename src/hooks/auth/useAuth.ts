import { useAppDispatch, useAppSelector } from '../rtk.ts';
import { clearError, login, logout, register, switchStatus } from '../../store/slices/auth.slice.ts';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  const handleLogin = async (loginStr: string, password: string, rememberMe: boolean) => {
    const result = await dispatch(login({ login: loginStr, password, rememberMe }));
    return result.meta.requestStatus === 'fulfilled';
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSwitchStatus = () => {
    dispatch(switchStatus());
  };

  const handleRegister = async (loginStr: string, password: string) => {
    const result = await dispatch(register({ login: loginStr, password }));
    return result.meta.requestStatus === 'fulfilled';
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return {
    user: auth.user,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    switchStatus: handleSwitchStatus,
    clearError: handleClearError,
    isAuthenticated: auth.isAuthenticated,
    loading: auth.loading,
    error: auth.error,
  };
};