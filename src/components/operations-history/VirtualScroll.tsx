import { useRef, useState, type UIEvent, type JSX } from 'react';
import type { OperationProps } from './Operation.tsx';
import { getDataSlice } from '../../mocks/get-data-slice.ts';
import type { Transaction } from '../../types/transaction-types.ts';


export type Settings = {
  maxIndex: number;
  itemHeight: number;
  amount: number;
  tolerance: number;
}

type VirtualScrollProps = {
  settings: Settings;
  premium: boolean; 
  template: ({ transaction, premium }: OperationProps) => JSX.Element;
  get: (offset: number, limit: number, settings: Settings) => Transaction[];
}

const setInitialState = (settings: Settings) => {
  const { maxIndex, itemHeight, amount, tolerance } = settings;
  const viewPortHeight = amount * itemHeight;
  const totalHeight = maxIndex * itemHeight;
  const bufferedItems = amount + 2 * tolerance;
  const topPaddingHeight = 0;
  const bottomPaddingHeight = totalHeight - viewPortHeight;

  return {
    settings,
    viewPortHeight,
    totalHeight,
    bufferedItems,
    topPaddingHeight,
    bottomPaddingHeight,
    data: getDataSlice(0, bufferedItems, settings),
  };
};

const VirtualScroll = ({ settings, premium, template, get }: VirtualScrollProps) => {
  const viewPortElement = useRef<HTMLDivElement>(null);

  const [state, setState] = useState(setInitialState(settings));

  const { viewPortHeight, data, bottomPaddingHeight, topPaddingHeight } = state;
  const RowTemplate = template;

  const handleScroll = ({ currentTarget: { scrollTop } }: UIEvent<HTMLDivElement>) => {
    const {
      totalHeight,
      bufferedItems,
      settings: { itemHeight, tolerance },
    } = state;

    const index = Math.max(Math.floor(scrollTop / itemHeight) - tolerance, 0);
    const data = get(index, bufferedItems, state.settings);
    const topPaddingHeight = index * itemHeight;
    const bottomPaddingHeight = totalHeight - topPaddingHeight - data.length * itemHeight;

    setState((prevState) => ({ ...prevState, topPaddingHeight, bottomPaddingHeight, data }));
  };

  return (
    <div
      ref={viewPortElement}
      style={{ 
        height: viewPortHeight, 
        scrollbarWidth: 'none', 
        msOverflowStyle: 'none',
      }}
      onScroll={handleScroll}
      className="overflow-auto mt-3 xs:mt-4 sm:mt-5 bg-gray-100 px-2 xs:px-3 sm:px-4 lg:px-6 xl:px-8 border-1 border-gray-300 py-2 xs:py-2.5 sm:py-3 rounded-xl xs:rounded-2xl scrollbar-hide"
    >
      <div style={{ height: topPaddingHeight }}></div>
      {data.map((item) => (
        <RowTemplate key={item.transactionId} transaction={item} premium={premium} />
      ))}
      <div style={{ height: bottomPaddingHeight }}></div>
    </div>
  );
};

export default VirtualScroll;