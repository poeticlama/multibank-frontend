import getCurrencySymbol from '../../constants/get-currency.ts';
import { type ChangeEvent } from 'react';

type AmountInputProps = {
  value: string;
  onChange: (amount: string) => void;
  placeholder?: string;
  currency?: string;
  label?: string;
};

export const AmountInput = ({
  value,
  onChange,
  placeholder = 'Введите сумму...',
  currency = 'RUB',
  label = 'Сумма перевода:',
}: AmountInputProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Только числа и точку для десятичных
    if (inputValue === '' || /^\d+([,.]\d{0,2})?$/.test(inputValue)) {
      onChange(inputValue);
    }
  };

  return (
    <div className='relative mb-4'>
      <label className='block text-sm font-medium text-gray-700 mb-2'>{label}</label>
      <input
        type='text'
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className='w-full p-3 pr-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-colors outline-none'
        inputMode='decimal'
      />
      <span className='absolute right-3 mt-6 transform -translate-y-1/2 text-gray-500 font-medium'>
        {getCurrencySymbol(currency)}
      </span>
    </div>
  );
};
