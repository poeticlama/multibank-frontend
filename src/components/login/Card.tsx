import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 text-blue-900 ${className}`}>
      {children}
    </div>
  );
};