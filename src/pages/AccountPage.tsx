import accountsMock from '../mocks/accounts-mock.ts';
import AccountCard from '../components/account/AccountCard.tsx';
import ExpenseStatistics from '../components/account/ExpenseStatistics.tsx';
import statisticsMock from '../mocks/statistics-mock.ts';

const AccountPage = () => {
  const accounts = accountsMock.map(account => <AccountCard key={account.accountId} accountData={account} />);
  const currentPredict = statisticsMock.currentPredict;
  const nextPredict = statisticsMock.nextPredict;
  const months = Object.keys(statisticsMock.statistic);
  const expenses = Object.values(statisticsMock.statistic);

  return (
    <main className="py-10 px-25 text-blue-900">
      <h2 className="text-4xl font-light pl-10 mb-5">Добро пожаловать!</h2>
      <div className="flex gap-10">
        <div className="flex flex-col gap-2 bg-gray-100 p-5 rounded-xl h-fit">
          {accounts}
        </div>
        <div className="bg-gray-100 p-5 rounded-xl w-full flex flex-col justify-around">
          <h2 className="text-xl mb-12">Расходы за последние 12 месяцев</h2>
          <ExpenseStatistics months={months} expenses={expenses} currentPredict={currentPredict} nextPredict={nextPredict} />
        </div>
      </div>
    </main>
  )
}

export default AccountPage;
