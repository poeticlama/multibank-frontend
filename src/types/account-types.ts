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

export type BankClientLink = {
  bankId: string;
  clientId: string;
}

export type User = {
  name: string;
  surname: string;
  username: string;
  status: "PREMIUM" | "DEFAULT";
  premiumExpireDate: Date | null;
  bankClientLinks: BankClientLink[];
}

export type Credentials = {
  login: string;
  password: string;
  rememberMe: boolean;
}
