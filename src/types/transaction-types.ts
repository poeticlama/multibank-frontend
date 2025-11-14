export type Amount = {
  amount: number;
  currency: string;
};

export type TransactionType = 'BUSINESS' | 'PERSONAL' | 'NONE';

export type Transaction = {
  accountId: string;
  bankId: string;
  transactionId: string;
  amount: Amount;
  type: TransactionType;
  creditDebitIndicator: 'Debit' | 'Credit';
  status: 'Pending' | 'Booked' | 'Rejected';
  bookingDateTime: string;
  valueDateTime: string;
  transactionInformation: string;
  bankTransactionCode: {
    code: string;
  };
};

export type TransactionsResponse = {
  transactions: Transaction[];
  meta: {
    totalPages: number;
    totalRecords: number;
    currentPage: number;
    pageSize: number;
  };
};
