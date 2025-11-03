import { useEffect, useState } from 'react';
import MonthStatistic from './MonthStatistic.tsx';

type ExpenseStatisticsProps = {
  months: string[];
  expenses: number[];
  currentPredict: number;
  nextPredict: number;
}

const ExpenseStatistics = ({months, expenses, currentPredict, nextPredict}: ExpenseStatisticsProps) => {
  const maxHeight = Math.max(...expenses, currentPredict, nextPredict);
  const [heights, setHeights] = useState(months.map(() => 0));
  const graph = months.map((month, i) => (
    <MonthStatistic key={month + i} height={heights[i]} month={month} expense={expenses[i]} />
  ));

  useEffect(() => {
    setHeights(expenses.map((expense) => (expense / maxHeight) * 100 + 1))
  }, [expenses, maxHeight]);

  return (
    <div className="flex h-80 justify-between">
      {graph}
    </div>
  );
}

export default ExpenseStatistics;