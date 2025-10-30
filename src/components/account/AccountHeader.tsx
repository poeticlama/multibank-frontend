import AccountLink from './AccountLink.tsx';

const AccountHeader = () => {
  return (
    <header className="bg-gray-100 px-50 py-10 text-blue-900">
      <nav className="flex items-center justify-around">
        <AccountLink to="/account">
          Мои счета
        </AccountLink>
        <AccountLink to="/account/history">
          Операции
        </AccountLink>
        <AccountLink to="/account/payments">
          Платежи
        </AccountLink>
      </nav>
    </header>
  )
}

export default AccountHeader