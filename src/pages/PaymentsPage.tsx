import { useState } from 'react';
import { PaymentMethodSelector } from '../components/payment/PaymentMethodSelector';
import { CardPaymentForm } from '../components/payment/CardPaymentForm';
import { AccountPaymentForm } from '../components/payment/AccountPaymentForm';
import { Button } from '../components/shared/Button';
import { useAccounts } from '../hooks/useAccounts.ts';
import { usePaymentMutation, useSinglePaymentConsentMutation } from '../store/api/endpoints/payments.api.ts';
import PaymentInput from '../components/payment/PaymentInput.tsx';
import Loader from '../components/shared/Loader.tsx';

type PaymentMethod = 'card' | 'account';

const PaymentsPage = () => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [comment, setComment] = useState('');

  const [amount, setAmount] = useState('');
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const { accounts } = useAccounts();

  const [createPaymentConsent, {isLoading: consentLoading, isError: consentError}] = useSinglePaymentConsentMutation();
  const [createPayment, {isLoading: paymentLoading, isSuccess: paymentSuccess, isError: paymentError}] = usePaymentMutation();

  const handleSubmit = () => {
    const fromAccountData = accounts.find(acc => acc.account[0].identification === fromAccount);
    const toAccountData = accounts.find(acc => acc.account[0].identification === toAccount);

    if (!fromAccountData) return

    const consentData = {
      bank_id: fromAccountData.bankId,
      debtor_account: fromAccountData.account[0].identification,
      amount: Number(amount),
      currency: fromAccountData.currency,
      creditor_account: selectedMethod === 'account' ? toAccountData?.account[0].identification || "" : cardNumber,
      creditor_name: toAccountData?.account[0].name || "",
      reference: comment,
    };

    const paymentData = {
      accountId: fromAccountData.accountId,
      debtor_account: fromAccountData.account[0].identification,
      creditor_account: selectedMethod === 'account' ? toAccountData?.account[0].identification || "" : cardNumber,
      debtor_bank: fromAccountData.bankId,
      creditor_bank: toAccountData?.bankId || "",
      amount: Number(amount),
      currency: fromAccountData.currency,
      comment: comment,
      debtor_scheme: fromAccountData.account[0].schemeName,
      creditor_scheme: selectedMethod === 'account' ? toAccountData?.account[0].schemeName || "" : "",
    }

    createPaymentConsent(consentData).then(() => {
      createPayment(paymentData);
    });

    setCardNumber('');
    setAmount('');
    setComment('');
    setFromAccount('');
    setToAccount('');
  };

  const isFormValid = () => {
    if (selectedMethod === 'card') {
      return cardNumber.trim().length >= 16 && amount && fromAccount;
    } else {
      return amount && fromAccount && toAccount && fromAccount !== toAccount;
    }
  };

  if (paymentLoading || consentLoading) return <Loader />

  return (
    <div className='min-h-screen pt-8'>
      <h1 className='text-2xl font-bold mb-5 lg:mb-10 lg:px-25 text-blue-900 text-center lg:text-left'>
        Платежи и переводы
      </h1>
      <div className='max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-6 lg:ml-25'>
        <PaymentMethodSelector selectedMethod={selectedMethod} onMethodChange={setSelectedMethod} />

        <div className='mb-2'>
          {selectedMethod === 'card' ? (
            <CardPaymentForm
              cardNumber={cardNumber}
              onCardNumberChange={setCardNumber}
              amount={amount}
              onAmountChange={setAmount}
              selectedAccount={fromAccount}
              onAccountChange={setFromAccount}
              accounts={accounts}
            />
          ) : (
            <AccountPaymentForm
              amount={amount}
              onAmountChange={setAmount}
              fromAccount={fromAccount}
              onFromAccountChange={setFromAccount}
              toAccount={toAccount}
              onToAccountChange={setToAccount}
              accounts={accounts}
            />
          )}
        </div>

        <PaymentInput
          type='text'
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder='Введите комментарий...'
          label='Комментарий к платежу'
          maxLength={100}
        />

        <div className='mt-6'>
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid() || paymentLoading || consentLoading}
          >
            Отправить
          </Button>
          {paymentSuccess && (
            <div className='text-xs lg:text-sm mt-1 -mb-2 text-center text-green-700'>
              Перевод выполнен успешно!
            </div>
          )}
          {(consentError || paymentError) && (
            <div className='text-xs lg:text-sm mt-1 -mb-2 text-center text-red-700'>
              Произошла ошибка, попробуйте позже
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;
