import type { ReactNode } from 'react';

type ContentCardProps = {
  children: ReactNode;
  className?: string;
};

export const ContentCard = ({ children, className = '' }: ContentCardProps) => {
  return (
    <div
      className={`max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 text-blue-900 ${className}`}
    >
      {children}
    </div>
  );
};
