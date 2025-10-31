import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Account from './pages/Account.tsx';
import AccountLayout from './components/router/AccountLayout.tsx';
import OperationsHistory from './pages/OperationsHistory.tsx';
import Payments from './pages/Payments.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
//import { useAuth } from './mocks/loginMock.tsx';


import { ProtectedRoute, GuestRoute } from './mocks/loginMock.tsx';


const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  );
};
const GuestLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <GuestRoute>
      {children}
    </GuestRoute>
  );
};


export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedLayout>
        <Home />
      </ProtectedLayout>
    ),
  },
  {
    path: '/account',
    element: (
      <ProtectedLayout>
        <AccountLayout />
      </ProtectedLayout>
    ),
    children: [
      {
        index: true,
        element: <Account />,
      },
      {
        path: 'history',
        element: <OperationsHistory />,
      },
      {
        path: 'payments',
        element: <Payments />
      }
    ],
  },
  {
    path: '/login',
    element: (
      <GuestLayout>
        <Login />
      </GuestLayout>
    )
  },
  {
    path: '/register',
    element: (
      <GuestLayout>
        <Register />
      </GuestLayout>
    )
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]);