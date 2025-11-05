import type { Bank } from './bank-types.ts';

export type AccountData = {
  accountId: string;
  status: "Enabled" | "Disabled";
  amount: number;
  currency: string;
  purposeType: "BUSINESS" | "PERSONAL" | "NONE";
  accountSubType: "Savings" | "Checking" | "Card";
  nickname: string;
  openingDate: Date
  description: null | string;
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

export type User = {
  id: number;
  login: string;
  password: string;
  name: string;
  status: "Premium" | "Default";
}
