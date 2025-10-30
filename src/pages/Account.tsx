import accountsMock from '../mocks/accountsMock.ts';
import AccountCard from '../components/account/AccountCard.tsx';
import smile from './smile.png'

const Account = () => {
  const accounts = accountsMock.map(account => <AccountCard key={account.id} accountData={account} />);

  return (
    <main className="py-10 px-25 text-blue-900">
      <h2 className="text-4xl font-light pl-10 mb-5">Добро пожаловать!</h2>
      <div className="flex gap-10">
        <div className="flex flex-col gap-2 bg-gray-100 p-5 rounded-xl h-fit">
          {accounts}
        </div>
        <div className="bg-gray-100 p-5 rounded-xl w-full flex justify-around">
          <img src={smile} alt="smileface" />
          <img src={smile} alt="smileface" />
        </div>
      </div>
    </main>
  )
}

export default Account;
