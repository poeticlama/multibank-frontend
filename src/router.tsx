import { createBrowserRouter, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import AccountPage from './pages/AccountPage.tsx';
import AccountLayout from './components/router/AccountLayout.tsx';
import OperationsHistoryPage from './pages/OperationsHistoryPage.tsx';
import PaymentsPage from './pages/PaymentsPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import PrivateRoute from './components/router/PrivateRoute.tsx';
import ProductsPage from './pages/ProductsPage.tsx';
import PremiumPage from './pages/PremiumPage.tsx';
import ProductFormPage from './pages/ProductFormPage.tsx';
import AddBankPage from './pages/AddBankPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
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
        element: <AccountPage />,
      },
      {
        path: 'history',
        element: (
          <div className='overflow-hidden'>
            <OperationsHistoryPage />
          </div>
        ),
      },
      {
        path: 'payments',
        element: <PaymentsPage />,
      },
      {
        path: 'add',
        element: <AddBankPage />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'product/:productId',
        element: <ProductFormPage />,
      },
      {
        path: 'premium',
        element: <PremiumPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '*',
    element: <Navigate to='/' replace />,
  },
]);
