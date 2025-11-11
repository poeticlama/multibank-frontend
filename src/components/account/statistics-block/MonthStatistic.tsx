import { useState, useEffect } from 'react';

type MonthStatisticProps = {
  height: number;
  month: string;
  expense: number;
  predictHeight?: number;
  predictExpense?: number;
};

const MonthStatistic = ({
  height,
  month,
  expense,
  predictHeight,
  predictExpense,
}: MonthStatisticProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className='flex flex-col items-center flex-1 min-w-0'>
      <div className='flex flex-col h-40 xs:h-50 sm:h-60 md:h-70 justify-end relative group w-full max-w-16'>
        <div className='absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 whitespace-nowrap'>
          Траты: {expense.toLocaleString()} ₽
          {!!predictHeight && (
            <div className='left-1/2'>Прогноз: {predictExpense?.toFixed(0).toLocaleString()} ₽</div>
          )}
          <div className='absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800'></div>
        </div>

        {!!predictHeight && (
          <div
            style={{
              height: `${predictHeight - height}%`,
            }}
            className='bg-green-300 w-full duration-1000 hover:bg-green-600 cursor-pointer'
          />
        )}

        {height === 0 ? (
          <div
            style={{
              height: `0.5%`,
            }}
            className='bg-blue-300 w-full duration-1000 hover:bg-blue-600 cursor-pointer'
          />
        ) : (
          <div
            style={{
              height: `${height}%`,
            }}
            className='bg-blue-300 w-full duration-1000 hover:bg-blue-600 cursor-pointer'
          />
        )}
      </div>

      <div className='text-gray-400 mt-1 text-center w-full'>
        <span
          className={
            'xs:text-sm block px-1 whitespace-nowrap' + isMobile
              ? 'transform -rotate-45 origin-left'
              : ''
          }
          style={
            isMobile ? { writingMode: 'vertical-lr', fontSize: '0.5rem' } : { fontSize: '0.6rem' }
          }
        >
          {month}
        </span>
      </div>
    </div>
  );
};

export default MonthStatistic;
