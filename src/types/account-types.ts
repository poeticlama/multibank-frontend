export type AccountData = {
  accountId: string;
  bankId: string;
  status: "Enabled" | "Disabled" | "Pending";
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
  }[];
}

export type Status = "BUSINESS" | "PERSONAL" | "NONE";

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
