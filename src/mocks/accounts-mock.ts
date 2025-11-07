import type { AccountData } from '../types/account-types.ts';

const accounts: AccountData[] = [
  {
    accountId: "314312",
    status: "Enabled",
    amount: 8765.00,
    currency: "RUB",
    purposeType: "BUSINESS",
    accountSubType: "Savings",
    nickname: "Счет накоплений для PALTUS",
    description: "Важный счет для стартапа",
    openingDate: new Date('2023-05-15'),
    account: {
      schemeName: "RU.IBAN",
      identification: "RU02123456780012345678",
      name: "ООО 'ПАЛТУС'"
    },
    bank: "ABank",
  },
  {
    accountId: "528741",
    status: "Enabled",
    amount: 431.34,
    currency: "USD",
    purposeType: "BUSINESS",
    accountSubType: "Checking",
    nickname: "Основной расчетный счет",
    description: "Бабки на казик",
    openingDate: new Date('2022-11-20'),
    account: {
      schemeName: "US.ABA",
      identification: "021000021",
      name: "PALTUS TRADING LTD"
    },
    bank: "VBank",
  },
  {
    accountId: "893456",
    status: "Disabled",
    amount: 432143.32,
    currency: "EUR",
    purposeType: "PERSONAL",
    accountSubType: "Card",
    nickname: "Карта для путешествий",
    description: "На путешествие в Ульяновск",
    openingDate: new Date('2024-01-10'),
    account: {
      schemeName: "EU.IBAN",
      identification: "DE89370400440532013000",
      name: "IVAN PETROV"
    },
    bank: "ABank",
  },
  {
    accountId: "893456",
    status: "Disabled",
    amount: 432143.32,
    currency: "EUR",
    purposeType: "PERSONAL",
    accountSubType: "Card",
    nickname: "Карта для путешествий",
    description: "ДЛИННННННОЕ ОПИСАНИЕ вфццццццццццццццццццццццццццццшгпгпргшрпашгрфыыыыыыыамыгрмшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввв",
    openingDate: new Date('2024-01-10'),
    account: {
      schemeName: "EU.IBAN",
      identification: "DE89370400440532013000",
      name: "IVAN PETROV"
    },
    bank: "ABank",
  },
  {
    accountId: "893456",
    status: "Disabled",
    amount: 432143.32,
    currency: "EUR",
    purposeType: "PERSONAL",
    accountSubType: "Card",
    nickname: "Карта для путешествий",
    description: null,
    openingDate: new Date('2024-01-10'),
    account: {
      schemeName: "EU.IBAN",
      identification: "DE89370400440532013000",
      name: "IVAN PETROV"
    },
    bank: "ABank",
  }
];

export default accounts