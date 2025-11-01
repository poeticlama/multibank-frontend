import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './mocks/loginMock.tsx';


const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {

    return <Navigate to="/login" state={{ from: location }} replace />;

  }

  return children;
};

export default PrivateRoute;