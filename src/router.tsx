import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Account from './pages/Account.tsx';
import AccountLayout from './components/router/AccountLayout.tsx';
import OperationsHistory from './pages/OperationsHistory.tsx';
import Payments from './pages/Payments.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import PrivateRoute from './components/router/PrivateRoute.tsx';





export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
  {
    path: '/account',
    element: (
      <PrivateRoute>
        <AccountLayout />
      </PrivateRoute>
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
      <Login />
    )
  },
  {
    path: '/register',
    element: (
      <Register />
    )
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]);