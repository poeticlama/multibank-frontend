type GraphLegendProps = {
  currentExpenses: number;
  currentPredict: string;
  nextPredict: string;
};

const GraphLegend = ({ currentExpenses, currentPredict, nextPredict }: GraphLegendProps) => {
  return (
    <div className='flex justify-between items-center'>
      <div className='flex flex-col gap-2'>
        <div>
          Траты за текущий месяц: <span className='font-semibold'>{currentExpenses} ₽</span>
        </div>
        <div>
          Прогноз трат на текущий месяц: <span className='font-semibold'>{currentPredict} ₽</span>
        </div>
        <div>
          Прогноз трат на следующий месяц: <span className='font-semibold'>{nextPredict} ₽</span>
        </div>
      </div>
      <div className='flex flex-col gap-1'>
        <div className='flex items-center gap-2'>
          <span className='block w-3 h-3 bg-blue-300' />
          <span className='text-sm text-gray-500'>Траты за месяц</span>
        </div>
        <div className='flex items-center gap-2'>
          <span className='block w-3 h-3 bg-green-300' />
          <span className='text-sm text-gray-500'>Прогноз трат за месяц</span>
        </div>
      </div>
    </div>
  );
};

export default GraphLegend;
