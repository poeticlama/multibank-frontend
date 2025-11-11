import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../shared/Loader.tsx';
import { useAppSelector } from '../../hooks/rtk.ts';
import type { ReactNode } from 'react';

type PrivateRouteProps = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const location = useLocation();

  const { isAuthenticated, loading } = useAppSelector(state => state.auth);

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
