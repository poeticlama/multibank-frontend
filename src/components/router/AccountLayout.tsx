import { Outlet } from 'react-router-dom';
import AccountHeader from '../header/AccountHeader.tsx';

const AccountLayout = () => {
  return (
    <>
      <AccountHeader />
      <Outlet />
    </>
  )
}

export default AccountLayout
