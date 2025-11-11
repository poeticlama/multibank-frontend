type PaymentMethodProps = {
  selectedMethod: string;
  onMethodChange: (method: string) => void;
};

const PaymentMethod = ({ selectedMethod, onMethodChange }: PaymentMethodProps) => {
  const methods = [
    {
      id: 'sbp',
      name: 'СБП',
      icon: '',
      description: 'Мгновенный перевод',
    },
    {
      id: 'account',
      name: 'Счет банка',
      icon: '',
      description: 'Списание с вашего счета',
    },
  ];

  return (
    <div className='bg-gray-100 p-4 sm:p-5 lg:p-6 rounded-xl'>
      <h3 className='text-lg sm:text-xl lg:text-2xl font-medium mb-4 sm:mb-6 text-blue-900'>
        Способ оплаты
      </h3>

      <div className='space-y-3'>
        {methods.map(method => (
          <label
            key={method.id}
            className={`flex items-center gap-3 cursor-pointer p-3 sm:p-4 rounded-lg transition-colors ${
              selectedMethod === method.id
                ? 'bg-blue-50 border border-blue-200'
                : 'bg-white hover:bg-gray-50 border border-transparent'
            }`}
          >
            <input
              type='radio'
              name='paymentMethod'
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={e => onMethodChange(e.target.value)}
              className='w-4 h-4 text-blue-600 focus:ring-blue-500'
            />

            {
              // Надо бы после финального определения способов оплаты svg иконки отрисовать
              /*<div className='w-8 h-8 flex items-center justify-center bg-white rounded-lg p-1.5 border border-gray-200'>
              <img 
                src={method.icon} 
                alt={method.icon}
                className='w-full h-full object-contain'
              />
            </div>*/
            }

            <div className='flex-1'>
              <div className='text-sm sm:text-base font-medium text-gray-900'>{method.name}</div>
              <div className='text-xs text-gray-500 mt-0.5'>{method.description}</div>
            </div>

            {selectedMethod === method.id && (
              <div className='w-2 h-2 bg-blue-600 rounded-full'></div>
            )}
          </label>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethod;
