import { SETTINGS } from '../../constants/settings.ts';
import type { JSX } from 'react';
import type { Transaction } from '../../types/transaction-types.ts';

export type OperationProps = {
  transaction: Transaction;
}

export const Operation = ({ transaction }: OperationProps): JSX.Element => {
  return (
    <div
      style={{ height: SETTINGS.itemHeight }}
      key={transaction.transactionId}
      className="py-1 box-border"
    >
      <div
        className="bg-white h-full rounded-xl px-10 border-1 border-gray-300 flex items-center justify-between hover:bg-blue-100 hover:cursor-pointer transition duration-300"
      >
        <div>
          <p className="text-lg">
            {transaction.transactionInformation}
          </p>
          <p className="text-xs text-gray-600 font-light">
            Счёт: {transaction.accountId}
          </p>
        </div>
        <div className="flex flex-col items-end">
          {transaction.creditDebitIndicator === 'Debit' ? (
            <p className="text-green-700 text-md mr-1">
              + {transaction.amount.amount + transaction.amount.currency}
            </p>
          ) : (
            <p className="text-red-500 text-md mr-1">
              - {transaction.amount.amount + " " + transaction.amount.currency}
            </p>
          )}
          <p className="text-xs text-gray-600">
            {new Intl.DateTimeFormat('ru-RU', {
              weekday: 'short',
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            }).format(transaction.valueDateTime)}
          </p>
        </div>
      </div>
    </div>
  );
};
