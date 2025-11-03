type MonthStatisticProps = {
  height: number;
  month: string;
  expense: number;
}

const MonthStatistic = ({height, month, expense}: MonthStatisticProps) => {
  return (
    <div
      className="flex flex-col justify-end gap-2 relative group"
    >
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 whitespace-nowrap">
        ${expense.toLocaleString()}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
      </div>
      <div
        style={{
          height: `${height}%`,
        }}
        className="bg-blue-300 w-full duration-1000 hover:bg-blue-600"
      />
      <div
        className="text-xs text-gray-400"
      >
        {month}
      </div>
    </div>
  )
}

export default MonthStatistic;
