import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Account from './pages/Account.tsx';
import AccountLayout from './components/router/AccountLayout.tsx';
import OperationsHistory from './pages/OperationsHistory.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/account',
    element: <AccountLayout />,
    children: [
      {
        index: true,
        element: <Account />,
      },
      {
        path: 'history',
        element: <OperationsHistory />,
      },
    ],
  },
]);
