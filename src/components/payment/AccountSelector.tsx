import { useState, useRef, useEffect } from 'react';
import type { AccountData } from '../../types/account-types';
import getCurrency from '../../constants/get-currency.ts';

type AccountSelectorProps = {
  accounts: AccountData[];
  selectedAccount: string;
  onAccountChange: (accountId: string) => void;
  label?: string;
  showOnlyEnabled?: boolean;
};

export const AccountSelector = ({
                                  accounts,
                                  selectedAccount,
                                  onAccountChange,
                                  label = 'Выберите счет',
                                  showOnlyEnabled = true,
                                }: AccountSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<AccountData | null>(null);

  const ref = useRef<HTMLDivElement>(null);

  const filteredAccounts = showOnlyEnabled
    ? accounts.filter(account => account.status === 'Enabled')
    : accounts;

  const formatAccountDisplay = (account: AccountData) => {
    const lastFourDigits = account.account[0].identification.slice(-4);
    return `${account.nickname} (****${lastFourDigits}) - ${account.amount.toLocaleString()} ${getCurrency(account.currency)}`;
  };

  const handleSelect = (account: AccountData) => {
    onAccountChange(account.account[0].identification);
    setSelected(account);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (selectedAccount && filteredAccounts.length > 0) {
      const account = filteredAccounts.find(acc => acc.account[0].identification === selectedAccount);
      setSelected(account || null);
    } else {
      setSelected(null);
    }
  }, [selectedAccount, filteredAccounts]);

  return (
    <div ref={ref} className='relative w-full'>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex justify-between items-center p-3 rounded-lg border-1 border-gray-300 hover:bg-blue-100 transition ${
          selected ? 'text-black' : 'text-gray-500'
        } text-md`}
      >
        <span>{selected ? formatAccountDisplay(selected) : label}</span>
        <svg
          className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''} ${
            selected ? 'text-black' : 'text-gray-500'
          }`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
        </svg>
      </button>

      {isOpen && (
        <ul className='absolute left-0 top-full mt-1 w-full bg-white border border-blue-200 rounded-xl shadow-lg z-50 max-h-80 overflow-auto'>
          {filteredAccounts.map(account => (
            <li
              key={account.accountId + account.bankId}
              onClick={() => handleSelect(account)}
              className={`px-6 py-3 cursor-pointer bg-blue-50 hover:bg-blue-200 text-sm ${
                (selected?.account[0].identification || "") === account.account[0].identification ? 'bg-blue-100 font-medium' : ''
              }`}
            >
              {formatAccountDisplay(account)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};