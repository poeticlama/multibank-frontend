import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';
import Loader from '../shared/Loader.tsx';
import { useAppSelector } from '../../hooks/rtk.ts';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;