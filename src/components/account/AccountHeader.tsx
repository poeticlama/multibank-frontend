import AccountLink from './AccountLink.tsx';

const AccountHeader = () => {
  return (
    <header className="bg-gray-50 px-50 py-10">
      <nav className="flex items-center justify-around">
        <AccountLink to="/account">
          Мои счета
        </AccountLink>
        <AccountLink to="/account/history">
          Операции
        </AccountLink>
        <AccountLink to="/account/">
          Платежи
        </AccountLink>
      </nav>
    </header>
  )
}

export default AccountHeader