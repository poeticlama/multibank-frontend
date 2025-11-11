import AccountCard from './AccountCard.tsx';
import { Button } from '../../shared/Button.tsx';
import { useNavigate } from 'react-router-dom';
import { useAccounts } from '../../../hooks/useAccounts.ts';
import { useSetDescriptionMutation } from '../../../store/api/endpoints/accounts.api.ts';
import { useState } from 'react';

const AccountsBlock = () => {
  const navigate = useNavigate();
  const { accounts, hasAccounts, isLoading } = useAccounts();
  const [isFull, setIsFull] = useState(false);
  const [setDescription] = useSetDescriptionMutation();

  const onDescriptionUpdate = async (accountId: string, bankId: string, newDescription: string) => {
    try {
      await setDescription({
        bankId,
        id: accountId,
        text: newDescription,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex flex-col gap-2 sm:gap-3 bg-gray-100 p-3 sm:p-4 lg:p-5 rounded-xl w-full xl:w-auto xl:min-w-[300px] 2xl:min-w-[350px] h-fit'>
      {!hasAccounts && !isLoading && (
        <div className='text-center my-3 opacity-40'>У вас пока не добавлены счета</div>
      )}
      {isLoading
        ? 'Загрузка...'
        : accounts
          .filter((_, i) => isFull ? true : i < 3)
          .map(account => (
          <AccountCard
            key={account.accountId + account.bankId}
            accountData={account}
            onDescriptionUpdate={onDescriptionUpdate}
          />
        ))}
      {!(isLoading || accounts.length <= 3 || isFull) &&
        <button
          onClick={() => setIsFull(true)}
          className="flex items-center gap-2 text-sm hover:opacity-70 cursor-pointer transition-colors duration-200 group ml-3 mb-3"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          Показать все счета
        </button>
      }
      {!(isLoading || !isFull) &&
        <button
          onClick={() => setIsFull(false)}
          className="flex items-center gap-2 text-sm hover:opacity-70 cursor-pointer transition-colors duration-200 group ml-3 mb-3"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 15l-6-6-6 6" />
          </svg>
          Скрыть счета
        </button>
      }
      <Button
        onClick={() => {
          navigate('/account/add');
        }}
        pointer={true}
      >
        Добавить счет
      </Button>
    </div>
  )
}

export default AccountsBlock;