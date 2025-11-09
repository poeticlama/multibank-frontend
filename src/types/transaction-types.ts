export type Amount = {
  amount: number;
  currency: string;
}

export type Transaction = {
  accountId: string;
  transactionId: string;
  amount: Amount;
  type: "BUSINESS" | "PERSONAL" | "NONE";
  creditDebitIndicator: "Debit" | "Credit";
  status: "Pending" | "Booked" | "Rejected";
  bookingDateTime: string;
  valueDateTime: string;
  transactionInformation: string;
  bankTransactionCode: {
    code: string;
  };
}

export type TransactionsResponse = {
  transactions: Transaction[];
  meta: {
    totalPages: number;
    totalRecords: number;
    currentPage: number;
    pageSize: number;
  }
}
