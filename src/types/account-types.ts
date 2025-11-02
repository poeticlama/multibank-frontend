import type { Bank } from './bank-types.ts';

export type AccountData = {
  id: number;
  rubles: number;
  bank: Bank;
}
