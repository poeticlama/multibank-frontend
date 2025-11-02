import { SETTINGS } from '../../constants/settings.ts';
import type { JSX } from 'react';
import type { Transaction } from '../../types/transaction-types.ts';

export interface IRowTemplate {
  item: Transaction;
}

export const RowTemplate = ({ item }: IRowTemplate): JSX.Element => {
  return (
    <div
      style={{ height: SETTINGS.itemHeight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      key={item.transactionId}
    >
      {item.creditDebitIndicator}
    </div>
  );
};
