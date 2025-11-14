import premiumFeatures from '../../constants/premiumFeatures.ts';

const PremiumFeatures = () => {
  return (
    <div className='bg-gray-100 p-4 sm:p-5 lg:p-6 rounded-xl'>
      <h3 className='text-lg sm:text-xl lg:text-2xl font-medium mb-4 sm:mb-6 text-blue-900'>
        Преимущества премиума
      </h3>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
        {premiumFeatures.map((feature, index) => (
          <div key={index} className='flex items-start gap-3'>
            <div className='w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
              <svg
                className='w-3 h-3 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={3}
                  d='M5 13l4 4L19 7'
                />
              </svg>
            </div>
            <span className='text-sm sm:text-base text-gray-700'>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumFeatures;
