import { type ReactNode } from 'react';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  children: ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  pointer?: boolean;
};

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  pointer = false,
}: ButtonProps) => {
  const baseStyles =
    'w-full py-3 px-6 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary: `${
      disabled
        ? `bg-gray-300 text-gray-500 cursor-not-allowed ${pointer? 'cursor-pointer' : ''}`
        : `bg-blue-900 text-white hover:bg-blue-700 focus:ring-blue-500 ${pointer? 'cursor-pointer' : ''}`
    }`,
    secondary: `${
      disabled
        ? `bg-gray-200 text-gray-500 cursor-not-allowed ${pointer? 'cursor-pointer' : ''}`
        : `bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500 ${pointer? 'cursor-pointer' : ''}`
    }`,
  };

  return (
    <button className={`${baseStyles} ${variants[variant]}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
