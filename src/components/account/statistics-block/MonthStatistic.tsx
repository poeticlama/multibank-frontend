type MonthStatisticProps = {
  height: number;
  month: string;
  expense: number;
  predictHeight?: number;
  predictExpense?: number;
}

const MonthStatistic = ({height, month, expense, predictHeight, predictExpense}: MonthStatisticProps) => {
  return (
    <div>
      <div className='flex flex-col h-70 justify-end relative group'>
        <div className='absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 whitespace-nowrap'>
          Траты: {expense.toLocaleString()}
          {predictHeight && (
            <div className='left-1/2'>Прогноз на месяц {predictExpense?.toFixed(0).toLocaleString()}</div>
          )}
          <div className='absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800'></div>
        </div>
        {predictHeight && (
          <div
            style={{
              height: `${predictHeight - height}%`,
            }}
            className='bg-green-300 w-10 duration-1000 hover:bg-green-600 cursor-pointer'
          />
        )}
        {height === 0 ? (
          <div
            style={{
              height: `0.5%`,
            }}
            className='bg-blue-300 w-10 duration-1000 hover:bg-blue-600 cursor-pointer'
          />
        ) : (
          <div
            style={{
              height: `${height}%`,
            }}
            className='bg-blue-300 w-10 duration-1000 hover:bg-blue-600 cursor-pointer'
          />
        )}
      </div>
      <div className='text-gray-400 mt-2' style={{fontSize: "0.6rem"}}>{month}</div>
    </div>
  );
}

export default MonthStatistic;
