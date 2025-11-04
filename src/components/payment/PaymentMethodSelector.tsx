interface PaymentMethodSelectorProps {
  selectedMethod: 'card' | 'account';
  onMethodChange: (method: 'card' | 'account') => void;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onMethodChange,
}) => {
  return (
    <div className="flex space-x-4 mb-6">
      <button
        className={`px-6 py-3 rounded-lg font-medium transition-colors ${
          selectedMethod === 'card'
            ? 'bg-blue-600 text-white shadow-md'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        onClick={() => onMethodChange('card')}
      >
        По номеру карты
      </button>
      
      <button
        className={`px-6 py-3 rounded-lg font-medium transition-colors ${
          selectedMethod === 'account'
            ? 'bg-blue-600 text-white shadow-md'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        onClick={() => onMethodChange('account')}
      >
        Между счетами
      </button>
    </div>
  );
};