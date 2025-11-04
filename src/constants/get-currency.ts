const getCurrencySymbol = (curr: string) => {
  const symbols: { [key: string]: string } = {
    'RUB': '₽',
    'USD': '$',
    'EUR': '€',
    'GBP': '£'
  };
  return symbols[curr] || curr;
};

export default getCurrencySymbol;