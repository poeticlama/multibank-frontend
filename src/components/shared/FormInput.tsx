import { type ChangeEvent } from 'react';

type FormInputProps = {
  label: string;
  type: 'text' | 'password' | 'email';
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoComplete?: string;
  minLength?: number;
};

export const FormInput = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  autoComplete,
  minLength,
}: FormInputProps) => {
  return (
    <div>
      <label htmlFor={name} className='block text-sm font-medium text-blue-900 mb-2'>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={true}
        autoComplete={autoComplete}
        minLength={minLength}
        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200'
        placeholder={placeholder}
      />
    </div>
  );
};
