import { SETTINGS } from '../../constants/settings.ts';
import type { JSX } from 'react';
import type { Transaction } from '../../types/transaction-types.ts';
import { useState } from 'react';


export type OperationProps = {
  transaction: Transaction;
  premium: boolean;
}

export const Operation = ({ transaction, premium }: OperationProps): JSX.Element => {

  const [value, setValue] = useState(transaction.type);

  return (
    <div
      style={{ height: SETTINGS.itemHeight }}
      key={transaction.transactionId}
      className="py-1 xs:py-1.5 sm:py-2 box-border"
    >
      <div
        className="bg-white h-full rounded-xl px-2 xs:px-3 sm:px-5 lg:px-6 border-1 border-gray-300 flex items-center justify-between hover:bg-blue-100 hover:cursor-pointer transition duration-300"
      >

        <div className="flex-1 min-w-0 pr-2 xs:pr-3 sm:pr-4">
          <p className="text-sm xs:text-base sm:text-lg font-medium truncate xs:whitespace-normal xs:break-words">
            {transaction.transactionInformation}
          </p>


          {premium && (
            <select
              value={value}
              onChange={(e) => {

                //e.target.value = e.target.value == "BUSINESS" ? "PERSONAL" : "BUSINESS";
                setValue( value == "BUSINESS" ? "PERSONAL" : "BUSINESS" )
                console.log(e, e.target.value, e.target.value == "BUSINESS")
                // Сюда хук нужен


              }}
              className="text-xs text-gray-600 font-light mt-1 xs:mt-1.5 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
            >
              <option value="PERSONAL">Личное</option>
              <option value="BUSINESS">Бизнес</option>
            </select>
          )}


          <p className="text-xs text-gray-600 font-light mt-1 xs:mt-1.5 truncate">
            Счёт: {transaction.accountId}
          </p>
        </div>

        <div className="flex flex-col items-end flex-shrink-0 pl-2 xs:pl-3 sm:pl-4">
          {transaction.creditDebitIndicator === 'Debit' ? (
            <p className="text-green-700 text-sm xs:text-base sm:text-md font-semibold whitespace-nowrap">
              + {transaction.amount.amount} {transaction.amount.currency}
            </p>
          ) : (
            <p className="text-red-500 text-sm xs:text-base sm:text-md font-semibold whitespace-nowrap">
              - {transaction.amount.amount} {transaction.amount.currency}
            </p>
          )}
          <p className="text-xs text-gray-600 mt-1 xs:mt-1.5 text-right whitespace-nowrap">
            {new Intl.DateTimeFormat('ru-RU', {
              day: 'numeric',
              month: transaction.valueDateTime.getDate() === 1 ? 'long' : 'short',
              year: transaction.valueDateTime.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
            }).format(transaction.valueDateTime)}
          </p>
        </div>
      </div>
    </div>
  );
};
