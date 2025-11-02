import { useRef, useState, type UIEvent, type JSX } from 'react';
import type { IRowTemplate } from './Operation.tsx';
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
  template: ({ item }: IRowTemplate) => JSX.Element;
  get: (offset: number, limit: number, settings: Settings) => Transaction[];
}

const setInitialState = (settings: Settings) => {
  const { maxIndex, itemHeight, amount, tolerance } = settings;
  const viewPortHeight = amount * itemHeight; // Высота видимой области
  const totalHeight = maxIndex * itemHeight; // Общая высота контейнера
  const bufferedItems = amount + 2 * tolerance; // Количество элементов, которые не отображаются на странице, но присутствуют в данных
  const topPaddingHeight = 0;
  const headHeight = document.getElementById("head")?.offsetHeight;
  const operationsHeadHeight = document.getElementById("operations-head")?.offsetHeight;

  const bottomPaddingHeight = totalHeight - viewPortHeight - Number(headHeight) - Number(operationsHeadHeight);
  console.log(bottomPaddingHeight);
  console.log(headHeight);
  console.log(operationsHeadHeight);

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

const VirtualScroll = ({ settings, template, get }: VirtualScrollProps) => {
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
      style={{ height: viewPortHeight, scrollbarWidth: 'none', msOverflowStyle: 'none', }}
      onScroll={handleScroll}
      className="overflow-auto mt-5 bg-gray-100 px-20 border-1 border-gray-300 py-3 rounded-2xl scrollbar-hide"
    >
      <div style={{ height: topPaddingHeight }}></div>
      {data.map((item) => (
        <RowTemplate key={item.transactionId} item={item} />
      ))}
      <div style={{ height: bottomPaddingHeight }}></div>
    </div>
  );
};

export default VirtualScroll;
