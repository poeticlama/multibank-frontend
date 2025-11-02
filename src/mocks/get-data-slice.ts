import { SETTINGS } from '../constants/settings.ts';
import type { Settings } from '../components/operations-history/VirtualScroll.tsx';
import { dataGenerator } from './data-generator.ts';
import type { Transaction } from '../types/transaction-types.ts';

const data = dataGenerator(SETTINGS.maxIndex);

export const getDataSlice = (offset: number, limit: number, settings: Settings) => {
  const start = offset;
  const end = Math.min(settings.maxIndex, limit + offset - 1);

  return data.slice(start, end) ?? ([] as Transaction[]);
};
