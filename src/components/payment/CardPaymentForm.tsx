import { useState, useEffect } from 'react';
import { AccountSelector } from './AccountSelector';
import { AmountInput } from './AmountInput';
import type { AccountData } from '../../types/account-types';

type CardPaymentFormProps = {
  cardNumber: string;
  onCardNumberChange: (number: string) => void;
  amount: string;
  onAmountChange: (amount: string) => void;
  selectedAccount: string;
  onAccountChange: (accountId: string) => void;
  accounts: AccountData[];
};

export const CardPaymentForm = ({
  cardNumber,
  onCardNumberChange,
  amount,
  onAmountChange,
  selectedAccount,
  onAccountChange,
  accounts,
}: CardPaymentFormProps) => {
  const [currency, setCurrency] = useState<string>('RUB');

  useEffect(() => {
    if (selectedAccount) {
      const selectedAccountData = accounts.find(acc => acc.accountId === selectedAccount);
      if (selectedAccountData) {
        setCurrency(selectedAccountData.currency);
      }
    } else {
      setCurrency('RUB'); // Валюта по умолчанию
    }
  }, [selectedAccount, accounts]);

  return (
    <div className='space-y-4'>
      <AccountSelector
        accounts={accounts}
        selectedAccount={selectedAccount}
        onAccountChange={onAccountChange}
        label='Выберите счет для списания'
        showOnlyEnabled={true}
      />

      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          Номер карты получателя
        </label>
        <input
          type='text'
          value={cardNumber}
          onChange={e => onCardNumberChange(e.target.value)}
          placeholder='Введите номер карты...'
          className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-colors outline-none'
        />
      </div>

      {/* Key меняется при смене валюты, чтобы пересоздать компонент */}
      <AmountInput
        key={`amount-input-${currency}`}
        value={amount}
        onChange={onAmountChange}
        placeholder='Введите сумму...'
        currency={currency}
        label='Введите сумму перевода на карту'
      />
    </div>
  );
};
