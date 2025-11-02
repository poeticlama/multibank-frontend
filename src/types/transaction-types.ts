export type Amount = {
  amount: number;
  currency: string;
}

export type Transaction = {
  accountId: string;
  transactionId: string;
  amount: Amount;
  creditDebitIndicator: "Debit" | "Credit";
  status: "Pending" | "Booked" | "Rejected";
  bookingDateTime: Date;
  valueDateTime: Date;
  transactionInformation: string;
  bankTransactionCode: {
    code: string;
  };
}
