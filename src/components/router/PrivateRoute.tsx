import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../mocks/LoginMockContext.tsx';
import React from 'react';


const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <>loading...</>
  }

  if (!isAuthenticated) {

    return <Navigate to="/login" state={{ from: location }} replace />;

  }

  return children;
};

export default PrivateRoute;