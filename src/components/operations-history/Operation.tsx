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
        className="bg-white h-full rounded-xl px-10 border-1 border-gray-300 flex items-center justify-between"
      >
        <div>
          <p className="text-lg">
            {transaction.transactionInformation}
          </p>
          <p className="text-xs text-gray-600 font-light">
            Счёт: {transaction.accountId}
          </p>
        </div>
        {transaction.creditDebitIndicator === 'Debit' ? (
          <p className="text-green-700 text-md">
            + {transaction.amount.amount + transaction.amount.currency}
          </p>
        ) : (
          <p className="text-red-500 text-md">
            - {transaction.amount.amount + " " + transaction.amount.currency}
          </p>
        )}
      </div>
    </div>
  );
};
