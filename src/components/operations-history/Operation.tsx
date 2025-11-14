import { SETTINGS } from '../../constants/settings.ts';
import type { JSX } from 'react';
import type { Transaction, TransactionType } from '../../types/transaction-types.ts';
import { useState } from 'react';
import getCurrency from '../../constants/get-currency.ts';
import { useSetTransactionTypeMutation } from '../../store/api/endpoints/transactions.api.ts';

export type OperationProps = {
  transaction: Transaction;
  premium: boolean;
};

export const Operation = ({ transaction, premium }: OperationProps): JSX.Element => {
  const [value, setValue] = useState(transaction.type);

  const [setTransactionType] = useSetTransactionTypeMutation();

  const handleSetValue = async (value: TransactionType) => {
    await setTransactionType({
      ...transaction,
      type: transaction.type === "BUSINESS" ? "PERSONAL" : "BUSINESS"
    }).unwrap();
    setValue(value);
  };

  return (
    <div
      style={{ height: SETTINGS.itemHeight }}
      key={transaction.transactionId}
      className='py-1 xs:py-1.5 sm:py-2 box-border'
    >
      <div className='bg-white h-full rounded-xl px-2 xs:px-3 sm:px-5 lg:px-6 border-1 border-gray-300 flex items-center justify-between transition duration-300'>
        <div className='flex-1 min-w-0 pr-2 xs:pr-3 sm:pr-4'>
          <p className='text-sm xs:text-base sm:text-lg font-medium truncate xs:whitespace-normal xs:break-words'>
            {transaction.transactionInformation}
          </p>

          <p className='text-xs text-gray-600 font-light mt-1 xs:mt-1.5 truncate'>
            Счёт: {transaction.accountId}
          </p>

          {/*{premium &&*/}
          {/*  <div className="text-xs text-gray-600 font-light mt-1 xs:mt-1.5">*/}
          {/*    Тип расходов: <span className="font-semibold text-blue-900 opacity-60">{value === "BUSINESS"? "Бизнес" : "Личное"}</span>*/}
          {/*  </div>*/}
          {/*}*/}

          {premium && (
            <select
              value={value}
              onChange={e => {
                handleSetValue(e.target.value as TransactionType);
              }}
              className='text-xs text-blue-800 font-medium px-1 py-0.5 border border-blue-200 rounded-md bg-white/80 backdrop-blur-sm transition-all duration-200 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm'
            >
              <option value='PERSONAL'>Личное</option>
              <option value='BUSINESS'>Бизнес</option>
            </select>
          )}
        </div>

        <div className='flex flex-col items-end flex-shrink-0 pl-2 xs:pl-3 sm:pl-4'>
          {transaction.creditDebitIndicator === 'Credit' ? (
            <p className='text-green-700 text-lg xs:text-base sm:text-md font-semibold whitespace-nowrap'>
              + {transaction.amount.amount} {getCurrency(transaction.amount.currency)}
            </p>
          ) : (
            <p className='text-red-500 text-lg xs:text-base sm:text-md font-semibold whitespace-nowrap'>
              - {transaction.amount.amount} {getCurrency(transaction.amount.currency)}
            </p>
          )}
          <p className='text-xs text-gray-600 mt-1 xs:mt-1.5 text-right whitespace-nowrap'>
            {new Intl.DateTimeFormat('ru-RU', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }).format(new Date(transaction.valueDateTime))}
          </p>
        </div>
      </div>
    </div>
  );
};
