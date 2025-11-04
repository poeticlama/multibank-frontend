import { useState, useEffect } from 'react';
import { AccountSelector } from './AccountSelector';
import { AmountInput } from './AmountInput';
import type { AccountData } from '../../types/account-types';

interface AccountPaymentFormProps {
  amount: string;
  onAmountChange: (amount: string) => void;
  fromAccount: string;
  onFromAccountChange: (accountId: string) => void;
  toAccount: string;
  onToAccountChange: (accountId: string) => void;
  accounts: AccountData[];
}

export const AccountPaymentForm: React.FC<AccountPaymentFormProps> = ({
  amount,
  onAmountChange,
  fromAccount,
  onFromAccountChange,
  toAccount,
  onToAccountChange,
  accounts,
}) => {
  const [currency, setCurrency] = useState<string>('RUB');


  useEffect(() => {
    if (fromAccount) {
      const selectedAccount = accounts.find(acc => acc.accountId === fromAccount);
      if (selectedAccount) {
        setCurrency(selectedAccount.currency);
      }
    } else {
      setCurrency('RUB'); // Валюта по умолчанию
    }
  }, [fromAccount, accounts]);

  return (
    <div className="space-y-4">
      <AccountSelector
        accounts={accounts}
        selectedAccount={fromAccount}
        onAccountChange={onFromAccountChange}
        label="Счета"
        showOnlyEnabled={true}
      />
      
      <AccountSelector
        accounts={accounts}
        selectedAccount={toAccount}
        onAccountChange={onToAccountChange}
        label="Выберите счет получателя"
        showOnlyEnabled={true}
      />

      {/* Key меняется при смене валюты, чтобы пересоздать компонент */}
      <AmountInput
        key={`amount-input-${currency}`}
        value={amount}
        onChange={onAmountChange}
        placeholder="Введите сумму..."
        currency={currency}
      />
    </div>
  );
};