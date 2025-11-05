import { useState, useEffect } from 'react';
import type { AccountData } from '../../../types/account-types.ts';
import RubleIcon from './RubleIcon.tsx';
import { Link } from 'react-router-dom';

type AccountCardProps = {
  accountData: AccountData;
}

const AccountCard = ({ accountData }: AccountCardProps) => {
  
  const [iconSize, setIconSize] = useState(20);
  
  useEffect(() => {
    const calculateIconSize = () => {
      const screenWidth = window.innerWidth;
      const tenthOfScreen = Math.floor(screenWidth / 35);
      const size = Math.min(tenthOfScreen, 30);
      const finalSize = Math.max(size, 16);
      setIconSize(finalSize);
    };

    calculateIconSize();
    window.addEventListener('resize', calculateIconSize);
    
    return () => window.removeEventListener('resize', calculateIconSize);
  }, []);


  return (
    <div className="px-3 xs:px-4 sm:px-5 py-2 sm:py-3 bg-blue-200 w-full h-20 xs:h-22 sm:h-25 flex flex-col justify-between rounded-xl transition-all duration-200 hover:shadow-md">

      <div className="flex items-center gap-1.5 xs:gap-2.5 sm:gap-3.5">
        <div className="w-4 h-4 xs:w-4 xs:h-4 sm:w-4 sm:h-4 flex-shrink-0">
          <RubleIcon size = {iconSize}/>
        </div>
        <h3 
          className="text-lg xs:text-xl sm:text-2xl font-bold break-words mt-[3%] ml-[3%]"
        >
          {accountData.amount + " " + accountData.currency}
        </h3>
      </div>

      <div className="mb-2 xs:mb-3 font-light flex justify-between items-center gap-2">
        <span className="text-sm xs:text-base truncate flex-1">
          {accountData.bank}
        </span>
        <Link
          to='/account'
          className="text-xs xs:text-sm font-semibold hover:underline whitespace-nowrap flex-shrink-0 px-1 xs:px-2 py-1 rounded hover:bg-blue-300 transition-colors"
        >
          Реквизиты
        </Link>
      </div>

    </div>
  )
}

export default AccountCard;