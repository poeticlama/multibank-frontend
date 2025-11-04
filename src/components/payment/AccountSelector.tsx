import type { AccountData } from '../../types/account-types';
import React from 'react';

interface AccountSelectorProps {
  accounts: AccountData[];
  selectedAccount: string;
  onAccountChange: (accountId: string) => void;
  label?: string;
  showOnlyEnabled?: boolean;
}

export const AccountSelector: React.FC<AccountSelectorProps> = ({
  accounts,
  selectedAccount,
  onAccountChange,
  label = "Выберите счет",
  showOnlyEnabled = true,
}) => {
  const filteredAccounts = showOnlyEnabled 
    ? accounts.filter(account => account.status === "Enabled")
    : accounts;

  const formatAccountDisplay = (account: AccountData) => {
    const lastFourDigits = account.account.identification.slice(-4);
    return `${account.nickname} (****${lastFourDigits}) - ${account.amount.toLocaleString()} ${account.currency}`;
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <select
        value={selectedAccount}
        onChange={(e) => onAccountChange(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      >
        <option value="">{label}</option>
        {filteredAccounts.map((account) => (
          <option key={account.accountId} value={account.accountId}>
            {formatAccountDisplay(account)}
          </option>
        ))}
      </select>
    </div>
  );
};