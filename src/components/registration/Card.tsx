import { type ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div
      className={`max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 text-blue-900 ${className}`}
    >
      {children}
    </div>
  );
};
