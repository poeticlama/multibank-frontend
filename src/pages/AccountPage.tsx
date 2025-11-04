import accountsMock from '../mocks/accounts-mock.ts';
import AccountCard from '../components/account/accounts-block/AccountCard.tsx';
import ExpenseStatistics from '../components/account/statistics-block/ExpenseStatistics.tsx';
import statisticsMock from '../mocks/statistics-mock.ts';

const AccountPage = () => {
  const accounts = accountsMock.map(account => <AccountCard key={account.accountId} accountData={account} />);
  const currentPredict = statisticsMock.currentPredict;
  const nextPredict = statisticsMock.nextPredict;
  const months = Object.keys(statisticsMock.statistic);
  const expenses = Object.values(statisticsMock.statistic);

  return (
    <main className="py-5 lg:py-10 px-4 sm:px-6 lg:px-25 text-blue-900">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light pl-4 sm:pl-6 lg:pl-10 mb-5">Добро пожаловать!</h2>
      <div className="flex flex-col xl:flex-row gap-5 lg:gap-10">
        <div className="flex flex-col gap-2 bg-gray-100 p-4 sm:p-5 rounded-xl w-full h-fit lg:w-fit">
          {accounts}
        </div>
        <div className="bg-gray-100 p-4 sm:p-5 rounded-xl w-full flex flex-col justify-around">
          <h2 className="text-lg sm:text-xl mb-6 sm:mb-12">Расходы за последние 12 месяцев</h2>
          <ExpenseStatistics months={months} expenses={expenses} currentPredict={currentPredict} nextPredict={nextPredict} />
        </div>
      </div>
    </main>
  )
}

export default AccountPage;
