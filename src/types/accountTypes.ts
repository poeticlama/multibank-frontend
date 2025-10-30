import type { Bank } from './bankTypes.ts';

export type AccountData = {
  id: number;
  rubles: number;
  bank: Bank;
}
