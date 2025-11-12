type PaymentMethodSelectorProps = {
  selectedMethod: 'card' | 'account';
  onMethodChange: (method: 'card' | 'account') => void;
};

export const PaymentMethodSelector = ({
  selectedMethod,
  onMethodChange,
}: PaymentMethodSelectorProps) => {
  return (
    <div className='flex mb-6 justify-self-center lg:justify-self-start'>
      <button
        className={`px-6 py-3 rounded-l-lg font-medium transition-colors ${
          selectedMethod === 'card'
            ? 'bg-blue-900 text-white shadow-md'
            : 'bg-gray-50 text-blue-900 hover:bg-gray-200 border-1 border-r-0 border-blue-900 cursor-pointer'
        }`}
        onClick={() => onMethodChange('card')}
      >
        По номеру карты
      </button>

      <button
        className={`px-6 py-3 rounded-r-lg font-medium transition-colors ${
          selectedMethod === 'account'
            ? 'bg-blue-900 text-white shadow-md'
            : 'bg-gray-50 text-blue-900 hover:bg-gray-200 border-1 border-l-0 border-blue-900 cursor-pointer'
        }`}
        onClick={() => onMethodChange('account')}
      >
        Между счетами
      </button>
    </div>
  );
};
