import { SETTINGS } from '../../constants/settings.ts';
import type { JSX } from 'react';
import type { Transaction } from '../../types/transaction-types.ts';

export interface IRowTemplate {
  item: Transaction;
}

export const Operation = ({ item }: IRowTemplate): JSX.Element => {
  return (
    <div
      style={{ height: SETTINGS.itemHeight }}
      key={item.transactionId}
      className="py-1 box-border"
    >
      <div
        className="bg-white h-full rounded-xl p-3"
      >
        {item.amount.amount + item.amount.currency}
      </div>
    </div>
  );
};
