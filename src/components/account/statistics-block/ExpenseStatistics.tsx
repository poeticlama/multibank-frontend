import { useEffect, useState } from 'react';
import MonthStatistic from './MonthStatistic.tsx';
import GraphLegend from './GraphLegend.tsx';

type ExpenseStatisticsProps = {
  months: string[];
  expenses: number[];
  currentPredict: number;
  nextPredict: number;
}

const ExpenseStatistics = ({months, expenses, currentPredict, nextPredict}: ExpenseStatisticsProps) => {
  const maxHeight = Math.max(...expenses, currentPredict, nextPredict);
  const [heights, setHeights] = useState(months.map(() => 0));
  const [currentPredictHeight, setCurrentPredictHeight] = useState(0);
  const [nextPredictHeight, setNextPredictHeight] = useState(0);
  const graph = months.map((month, i) => {
    if (i === 12) {
      return <MonthStatistic key={month + i} height={heights[i]} month={month} expense={expenses[i]} predictHeight={currentPredictHeight} predictExpense={currentPredict} />;
    } else if (i === 13) {
      return <MonthStatistic key={month + i} height={heights[i]} month={month} expense={expenses[i]} predictHeight={nextPredictHeight - 0.5} predictExpense={nextPredict} />;
    } else {
      return <MonthStatistic key={month + i} height={heights[i]} month={month} expense={expenses[i]} />
    }
  });

  useEffect(() => {
    setHeights(expenses.map((expense) => (expense / maxHeight) * 100))
    setCurrentPredictHeight((currentPredict / maxHeight) * 100);
    setNextPredictHeight((nextPredict / maxHeight) * 100);
  }, [expenses, maxHeight, currentPredictHeight, currentPredict, nextPredict]);

  return (
    <>
      <div className="flex justify-center gap-3 mb-5">
        {graph}
      </div>
      <GraphLegend currentExpenses={expenses[expenses.length - 2]} currentPredict={currentPredict.toFixed(0)} nextPredict={nextPredict.toFixed(0)} />
    </>
  );
}

export default ExpenseStatistics;