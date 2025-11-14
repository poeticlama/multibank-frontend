import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { BankInfo } from '../../types/bank-info.ts';
import { useLazyBanksQuery } from '../../store/api/endpoints/banks.api.ts';
import { useConsentAccountMutation } from '../../store/api/endpoints/accounts.api.ts';
import { useAccounts } from '../../hooks/useAccounts.ts';

const AddBankForm = () => {
  const [banks, setBanks] = useState<BankInfo[]>([]);
  const navigate = useNavigate();
  const [bankId, setBankId] = useState('abank');
  const [clientId, setClientId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {getAllAccounts} = useAccounts();

  const [fetchBanks] = useLazyBanksQuery();
  const [consentAccountMutation, {isError: consentError}] = useConsentAccountMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await consentAccountMutation({
        bank_id: bankId,
        client_id: clientId,
      }).unwrap();
      await getAllAccounts();

      navigate('/account');
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const loadBanks = async () => {
      try {
        const fetchedBanks = await fetchBanks(null).unwrap();
        setBanks(fetchedBanks);
      } catch (error) {
        console.error('Ошибка при загрузке банков:', error);
      }
    };

    loadBanks();
  }, [fetchBanks]);

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md mx-auto bg-white rounded-lg shadow-md p-6'>
        <h1 className='text-2xl font-bold text-blue-900 mb-6'>Добавить учетную запись банка</h1>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label htmlFor='bankId' className='block text-sm font-medium text-gray-700 mb-2'>
              Выберите банк
            </label>
            <select
              id='bankId'
              value={bankId}
              onChange={e => setBankId(e.target.value)}
              required
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            >
              {banks.map(bank => (
                <option key={bank.id} value={bank.id}>
                  {bank.name}
                </option>
              ))}
            </select>
          </div>

          {/* ClientID Input */}
          <div>
            <label htmlFor='clientId' className='block text-sm font-medium text-gray-700 mb-2'>
              ClientID банка
            </label>
            <input
              id='clientId'
              type='text'
              placeholder='Введите clientID...'
              value={clientId}
              onChange={e => setClientId(e.target.value)}
              required
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            />
          </div>

          <button
            type='submit'
            disabled={isLoading}
            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors'
          >
            {isLoading ? (
              <div className='flex items-center'>
                <svg
                  className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
                Загрузка...
              </div>
            ) : (
              'Добавить банк'
            )}
          </button>
          {consentError && <div className="text-center text-sm text-red-600">
            Произошла ошибка, попробуйте позже
          </div>}
        </form>
      </div>
    </div>
  );
};

export default AddBankForm;
