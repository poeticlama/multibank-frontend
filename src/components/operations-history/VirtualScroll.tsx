import { useRef, useState, useEffect, type UIEvent, type JSX } from 'react';
import type { OperationProps } from './Operation.tsx';
import type { Transaction } from '../../types/transaction-types.ts';

export type Settings = {
  itemHeight: number;
  amount: number;
  tolerance: number;
};

type VirtualScrollProps = {
  settings: Settings;
  premium: boolean;
  transactions: Transaction[];
  template: ({ transaction, premium }: OperationProps) => JSX.Element;
};

const setInitialState = (settings: Settings, transactions: Transaction[]) => {
  const { itemHeight, amount, tolerance } = settings;
  const viewPortHeight = amount * itemHeight;
  const bufferedItems = amount + 2 * tolerance;

  return {
    settings,
    viewPortHeight,
    bufferedItems,
    topPaddingHeight: 0,
    bottomPaddingHeight: Math.max(transactions.length * itemHeight - viewPortHeight, 0),
    data: transactions.slice(0, bufferedItems),
  };
};

const VirtualScroll = ({ settings, premium, transactions, template }: VirtualScrollProps) => {
  const viewPortElement = useRef<HTMLDivElement>(null);
  const [state, setState] = useState(() => setInitialState(settings, transactions));

  const { data, bottomPaddingHeight, topPaddingHeight } = state;
  const RowTemplate = template;

  useEffect(() => {
    // при изменении массива транзакций — обновляем список
    setState(setInitialState(settings, transactions));
  }, [transactions, settings]);

  const handleScroll = ({ currentTarget: { scrollTop } }: UIEvent<HTMLDivElement>) => {
    const {
      settings: { itemHeight, tolerance, amount },
    } = state;

    const totalItems = transactions.length;
    const totalHeight = totalItems * itemHeight;
    const bufferedItems = amount + 2 * tolerance;

    const startIndex = Math.max(Math.floor(scrollTop / itemHeight) - tolerance, 0);
    const endIndex = Math.min(startIndex + bufferedItems, totalItems);

    const visibleData = transactions.slice(startIndex, endIndex);
    const topPaddingHeight = startIndex * itemHeight;
    const bottomPaddingHeight = Math.max(
      totalHeight - topPaddingHeight - visibleData.length * itemHeight,
      0
    );

    setState(prevState => ({
      ...prevState,
      data: visibleData,
      topPaddingHeight,
      bottomPaddingHeight,
    }));
  };

  return (
    <div
      ref={viewPortElement}
      style={{
        height: state.viewPortHeight,
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
      onScroll={handleScroll}
      className='overflow-auto mt-3 xs:mt-4 sm:mt-5 bg-gray-100 px-2 xs:px-3 sm:px-4 lg:px-6 xl:px-8 border-1 border-gray-300 py-2 xs:py-2.5 sm:py-3 rounded-xl xs:rounded-2xl scrollbar-hide'
    >
      <div style={{ height: topPaddingHeight }} />
      {data.map(item => (
        <RowTemplate key={item.transactionId} transaction={item} premium={premium} />
      ))}
      <div style={{ height: bottomPaddingHeight }} />
    </div>
  );
};

export default VirtualScroll;
