import { Button } from '../shared/Button.tsx';

type PremiumCardProps = {
  title: string;
  days: number;
  price: number;
  originalPrice?: number;
  popular?: boolean;
  onSelect: (days: number) => void;
};

const PremiumCard = ({
  title,
  days,
  price,
  originalPrice,
  popular,
  onSelect,
}: PremiumCardProps) => {
  return (
    <div
      className={`relative bg-white p-4 sm:p-5 lg:p-6 rounded-xl border-2 ${popular ? 'border-green-600' : 'border-gray-200'} hover:border-blue-300 transition-colors h-full flex flex-col`}
    >
      {popular && (
        <div className='absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium'>
          Популярный
        </div>
      )}

      <h3 className='text-md sm:text-lg lg:text-xl font-medium text-center mb-3 sm:mb-4'>
        {title}
      </h3>

      <div className='flex-1 flex flex-col justify-between'>
        <div className='text-center mb-4 sm:mb-6'>
          <div className='text-xl sm:text-2xl lg:text-3xl font-bold text-blue-900 mb-2'>
            {days} дней
          </div>
          <div className='text-gray-600 text-sm'>премиум-доступа</div>
        </div>

        <div className='text-center mb-4 sm:mb-6'>
          <div className='flex items-center justify-center gap-2 mb-1'>
            <span className='text-lg sm:text-xl lg:text-2xl font-bold text-blue-900'>
              {price} ₽
            </span>
            {originalPrice &&
              (originalPrice == price ? null : (
                <span className='text-md text-gray-400 line-through'>{originalPrice} ₽</span>
              ))}
          </div>
          {originalPrice &&
            (originalPrice == price ? null : (
              <div className='text-green-600 text-xs font-medium'>
                Экономия {originalPrice - price} ₽
              </div>
            ))}
        </div>

        <Button onClick={() => onSelect(days)} variant="secondary" pointer>
          Выбрать
        </Button>
      </div>
    </div>
  );
};

export default PremiumCard;
