import React from 'react';


export const RegisterLink: React.FC = () => {
  return (
    <div className="mt-6 text-center">
      <p className="text-gray-600">
        Нет аккаунта?{' '}
        <a 
          href="/register"
          className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
        >
          Зарегистрируйтесь
        </a>
      </p>
    </div>
  );
};