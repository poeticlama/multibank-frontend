import type { ChangeEvent } from 'react';

type PaymentInputProps = {
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
  maxLength?: number;
};

const PaymentInput = ({
  type,
  value,
  onChange,
  placeholder,
  label,
  maxLength,
}: PaymentInputProps) => {
  return (
    <div className='mb-4'>
      <label className='block text-sm font-medium text-gray-700 mb-2'>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-colors outline-none'
        maxLength={maxLength}
      />
    </div>
  );
};

export default PaymentInput;
