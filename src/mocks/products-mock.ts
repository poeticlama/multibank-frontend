import type { ProductType } from '../types/products-types.ts';

const productsMock: ProductType[] = [
  {
    productId: 'prod-abank-deposit-001',
    productType: 'deposit',
    productName: 'Накопительный депозит',
    description: 'Выгодная ставка',
    interestRate: 8.5,
    minAmount: 50000.0,
    termMonths: 12,
  },
  {
    productId: 'prod-abank-card-001',
    productType: 'credit_card',
    productName: 'Кредитная карта Premium',
    description: 'Кэшбэк и бонусы',
    interestRate: 15.9,
  },
  {
    productId: 'prod-abank-loan-001',
    productType: 'loan',
    productName: 'Потребительский кредит',
    description: 'Быстрое одобрение',
    interestRate: 12.9,
    minAmount: 50000.0,
    termMonths: 36,
  },
  {
    productId: 'deposit-reliable',
    productType: 'deposit',
    productName: 'Вклад "Надежный"',
    description: 'Классический вклад с гарантированной доходностью',
    interestRate: 8.5,
    minAmount: 10000.0,
    maxAmount: 10000000.0,
    termMonths: 12,
  },
  {
    productId: 'loan-consumer',
    productType: 'loan',
    productName: 'Потребительский кредит',
    description: 'Кредит на любые цели',
    interestRate: 12.9,
    minAmount: 50000.0,
    maxAmount: 3000000.0,
    termMonths: 60,
  },
  {
    productId: 'card-debit',
    productType: 'card',
    productName: 'Дебетовая карта "Свобода"',
    description: 'Карта с кэшбэком 2%',
  },
  {
    productId: 'card-credit',
    productType: 'card',
    productName: 'Кредитная карта "Лимит"',
    description: 'Кредитная карта с льготным периодом',
    interestRate: 19.9,
    minAmount: 50000.0,
    maxAmount: 500000.0,
  },
];

export default productsMock;
