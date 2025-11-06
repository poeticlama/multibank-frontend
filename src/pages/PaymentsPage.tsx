import { useEffect, useState } from 'react';
import { PaymentMethodSelector } from '../components/payment/PaymentMethodSelector';
import { CardPaymentForm } from '../components/payment/CardPaymentForm';
import { AccountPaymentForm } from '../components/payment/AccountPaymentForm';
import { Button } from '../components/shared/Button';
import { useAccounts } from '../hooks/useAccounts.ts';


type PaymentMethod = 'card' | 'account';


const PaymentsPage= () => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const { accounts, getAllAccounts } = useAccounts();

  useEffect(() => {
    getAllAccounts();
  }, [getAllAccounts]);

  const handleSubmit = () => {
    const fromAccountData = accounts.find(acc => acc.accountId === fromAccount);
    const toAccountData = accounts.find(acc => acc.accountId === toAccount);

    const paymentData = {
      method: selectedMethod,
      cardNumber: selectedMethod === 'card' ? cardNumber : undefined,
      amount: parseFloat(amount),
      fromAccount: fromAccountData,
      toAccount: selectedMethod === 'account' ? toAccountData : undefined,
    };

    console.log('Payment data:', paymentData);

    // Суда API ставъ

    
  };

  const isFormValid = () => {
    if (selectedMethod === 'card') {
      return cardNumber.trim().length >= 16 && amount && fromAccount;
    } else {
      return amount && fromAccount && toAccount && fromAccount !== toAccount;
    }
  };



  return (
    <div className="min-h-screen py-8">
      <h1 className="text-2xl font-bold mb-5 lg:mb-10 lg:px-25 text-blue-900 text-center lg:text-left">
        Платежи и переводы
      </h1>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm p-6">
        <PaymentMethodSelector
          selectedMethod={selectedMethod}
          onMethodChange={setSelectedMethod}
        />
        
        <div className="mb-6">
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
        
        <Button 
          onClick={handleSubmit} 
          disabled={!isFormValid()}
        >
          Отправить
        </Button>
      </div>
    </div>
  );
};


export default PaymentsPage