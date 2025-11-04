interface AmountInputProps {
  value: string;
  onChange: (amount: string) => void;
  placeholder?: string;
  currency?: string;
}

export const AmountInput: React.FC<AmountInputProps> = ({
  value,
  onChange,
  placeholder = "Введите сумму...",
  currency = "RUB"
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Только числа и точку для десятичных
    if (inputValue === '' || /^\d*\.?\d*$/.test(inputValue)) {
      onChange(inputValue);
    }
  };

  const getCurrencySymbol = (curr: string) => {
    const symbols: { [key: string]: string } = {
      'RUB': '₽',
      'USD': '$',
      'EUR': '€',
      'GBP': '£'
    };
    return symbols[curr] || curr;
  };

  return (
    <div className="relative mb-4">
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full p-3 pr-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        inputMode="decimal"
      />
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
        {getCurrencySymbol(currency)}
      </span>
    </div>
  );
};