import { type ChangeEvent } from 'react';

type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
};

export const Checkbox = ({ label, checked, onChange, name = 'checkbox' }: CheckboxProps) => {
  return (
    <div className='flex items-center'>
      <input
        type='checkbox'
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
        className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
      />
      <label htmlFor={name} className='ml-2 block text-sm text-gray-700'>
        {label}
      </label>
    </div>
  );
};
