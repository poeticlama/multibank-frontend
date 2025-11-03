type MonthStatisticProps = {
  height: number;
  month: string;
  expense: number;
}

const MonthStatistic = ({height, month, expense}: MonthStatisticProps) => {
  return (
    <div
      className="flex flex-col justify-end gap-2"
    >
      <div
        style={{
          height: `${height}%`,
        }}
        className="bg-blue-500 w-full duration-1000"
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
