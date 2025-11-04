import AccountLink from './AccountLink.tsx';
import UserInfo from './UserInfo.tsx';

const AccountHeader = () => {
  return (
    <header id="head" className="bg-gray-100 pl-50 pr-20 py-10 text-blue-900 sticky top-0 z-10">
      <nav className="flex items-center justify-between text-sm">
        <AccountLink to="/account">
          Мои счета
        </AccountLink>
        <AccountLink to="/account/history">
          Операции
        </AccountLink>
        <AccountLink to="/account/payments">
          Платежи
        </AccountLink>
        <AccountLink to="/account/products">
          Продукты
        </AccountLink>
        <div className="ml-60">
          <UserInfo />
        </div>
      </nav>
    </header>
  )
}

export default AccountHeader