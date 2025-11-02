import type { Amount, Transaction } from '../types/transaction-types.ts';

export const dataGenerator = (dataCount: number): Transaction[] => {
  const currencies = ['RUB', 'USD', 'EUR', 'GBP'];
  const statuses: Array<'Pending' | 'Booked' | 'Rejected'> = ['Pending', 'Booked', 'Rejected'];
  const transactionCodes = ['PMTS', 'TRFR', 'SALA', 'CASH', 'CARD'];
  const transactionDescriptions = [
    'Оплата услуг',
    'Перевод между счетами',
    'Зарплата',
    'Снятие наличных',
    'Оплата картой',
    'Пополнение счета'
  ];

  return [...Array(dataCount)].map((_, index) => {
    const isCredit = Math.random() > 0.5;
    const amountValue = Math.round(Math.random() * 100000) / 100; // случайная сумма до 1000
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() - Math.floor(Math.random() * 30)); // случайная дата в пределах 30 дней

    const amount: Amount = {
      amount: amountValue,
      currency: currencies[Math.floor(Math.random() * currencies.length)]
    };

    const transaction: Transaction = {
      accountId: `ACC${String(index + 1).padStart(8, '0')}`,
      transactionId: `TXN${String(index + 1).padStart(10, '0')}`,
      amount: amount,
      creditDebitIndicator: isCredit ? 'Credit' : 'Debit',
      status: statuses[Math.floor(Math.random() * statuses.length)],
      bookingDateTime: baseDate,
      valueDateTime: new Date(baseDate.getTime() + Math.floor(Math.random() * 86400000)), // + случайное время до 24 часов
      transactionInformation: transactionDescriptions[Math.floor(Math.random() * transactionDescriptions.length)],
      bankTransactionCode: {
        code: transactionCodes[Math.floor(Math.random() * transactionCodes.length)]
      }
    };

    return transaction;
  });
};