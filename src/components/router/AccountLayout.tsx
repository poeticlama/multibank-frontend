import { Outlet } from 'react-router-dom';
import AccountHeader from '../account/AccountHeader.tsx';
import AccountFooter from '../account/AccountFooter.tsx';

const AccountLayout = () => {
  return (
    <>
      <AccountHeader />
      <main>
        <Outlet />
      </main>
      <AccountFooter />
    </>
  )
}

export default AccountLayout
