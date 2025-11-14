import AccountLink from './AccountLink.tsx';
import UserInfo from './UserInfo.tsx';
import { useState } from 'react';

const AccountHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      id='head'
      className='bg-gray-100 px-4 sm:px-5 lg:pl-50 lg:pr-20 py-3 sm:py-10 text-blue-900 sticky top-0 z-10 border-b-1 border-gray-200'
    >
      <div className='lg:hidden'>
        <div className='flex items-center justify-between'>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='p-2 rounded-md text-blue-900 hover:bg-gray-200 transition-colors'
            aria-label='Открыть меню'
          >
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              {isMenuOpen ? (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              ) : (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              )}
            </svg>
          </button>

          <div className='flex-1 flex justify-end'>
            <UserInfo />
          </div>
        </div>

        {isMenuOpen && (
          <div className='mt-4 pb-4 border-t border-gray-200 pt-4'>
            <nav className='flex flex-col space-y-3'>
              <AccountLink
                to='/account'
                // onClick={() => setIsMenuOpen(false)}
                // className="block py-2 px-3 hover:bg-gray-200 rounded transition-colors"
              >
                Мои счета
              </AccountLink>
              <AccountLink
                to='/account/history'
                // onClick={() => setIsMenuOpen(false)}
                // className="block py-2 px-3 hover:bg-gray-200 rounded transition-colors"
              >
                Операции
              </AccountLink>
              <AccountLink
                to='/account/payments'
                // onClick={() => setIsMenuOpen(false)}
                // className="block py-2 px-3 hover:bg-gray-200 rounded transition-colors"
              >
                Платежи
              </AccountLink>
              <AccountLink
                to='/account/products'
                // onClick={() => setIsMenuOpen(false)}
                // className="block py-2 px-3 hover:bg-gray-200 rounded transition-colors"
              >
                Продукты
              </AccountLink>
            </nav>
          </div>
        )}
      </div>

      {/* Desktop */}
      <div className='hidden lg:block'>
        <nav className='flex items-center justify-between text-sm'>
          <div className='flex space-x-6 xl:space-x-24 md:space-x-5'>
            <AccountLink to='/account'>Мои счета</AccountLink>
            <AccountLink to='/account/history'>Операции</AccountLink>
            <AccountLink to='/account/payments'>Платежи</AccountLink>
            <AccountLink to='/account/products'>Продукты</AccountLink>
          </div>
          <div className='ml-60'>
            <UserInfo />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default AccountHeader;
