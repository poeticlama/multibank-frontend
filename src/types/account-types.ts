import type { Bank } from './bank-types.ts';

export type AccountData = {
  accountId: string;
  status: "Enabled" | "Disabled";
  amount: number;
  currency: string;
  accountType: "Business" | "Personal";
  accountSubType: "Savings" | "Checking" | "Card";
  nickname: string;
  openingDate: Date;
  account: {
    schemeName: string;
    identification: string;
    name: string;
  };
  bank: Bank;
}

export type ExpensesPredict = {
  statistic: Record<string, number>;
  currentPredict: number;
  nextPredict: number;
}
