import type { AccountData } from '../../types/account-types.ts';
import RubleIcon from './RubleIcon.tsx';
import { Link } from 'react-router-dom';

type AccountCardProps = {
  accountData: AccountData;
}

const AccountCard = ({ accountData }: AccountCardProps) => {
  return (
    <div className="px-4 py-2 bg-blue-200 w-md h-25 flex flex-col justify-between rounded-xl">
      <div className="flex items-center gap-3">
        <RubleIcon />
        <h3 className="text-xl font-bold">
          {accountData.rubles} ₽
        </h3>
      </div>
      <div className="mb-3 font-light flex justify-between items-center">
        {accountData.bank}
        <Link
          to='/account'
          className="text-sm font-semibold mr-3 hover:underline"
        >
          Реквизиты
        </Link>
      </div>
    </div>
  )
}

export default AccountCard;