import type { ProductType } from '../types/products-types.ts';

const productsMock: ProductType[] = [
  {
    "productId": "prod-abank-deposit-001",
    "productType": "deposit",
    "productName": "Накопительный депозит",
    "description": "Выгодная ставка",
    "interestRate": 8.50,
    "minAmount": 50000.00,
    "termMonths": 12
  },
  {
    "productId": "prod-abank-card-001",
    "productType": "credit_card",
    "productName": "Кредитная карта Premium",
    "description": "Кэшбэк и бонусы",
    "interestRate": 15.90
  },
  {
    "productId": "prod-abank-loan-001",
    "productType": "loan",
    "productName": "Потребительский кредит",
    "description": "Быстрое одобрение",
    "interestRate": 12.90,
    "minAmount": 50000.00,
    "termMonths": 36
  },
  {
    "productId": "deposit-reliable",
    "productType": "deposit",
    "productName": "Вклад \"Надежный\"",
    "description": "Классический вклад с гарантированной доходностью",
    "interestRate": 8.50,
    "minAmount": 10000.00,
    "maxAmount": 10000000.00,
    "termMonths": 12
  },
  {
    "productId": "loan-consumer",
    "productType": "loan",
    "productName": "Потребительский кредит",
    "description": "Кредит на любые цели",
    "interestRate": 12.90,
    "minAmount": 50000.00,
    "maxAmount": 3000000.00,
    "termMonths": 60
  },
  {
    "productId": "card-debit",
    "productType": "card",
    "productName": "Дебетовая карта \"Свобода\"",
    "description": "Карта с кэшбэком 2%"
  },
  {
    "productId": "card-credit",
    "productType": "card",
    "productName": "Кредитная карта \"Лимит\"",
    "description": "Кредитная карта с льготным периодом",
    "interestRate": 19.90,
    "minAmount": 50000.00,
    "maxAmount": 500000.00
  }
];

export default productsMock;
