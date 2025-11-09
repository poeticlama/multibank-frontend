export type ProductType = {
  bankId: string,
  productId: string;
  productType: 'deposit' | 'credit_card' | 'loan' | 'card';
  productName: string;
  description: string;
  interestRate?: number;
  minAmount?: number;
  maxAmount?: number;
  termMonths?: number;
};