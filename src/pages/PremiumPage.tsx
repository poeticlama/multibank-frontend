import { useState } from 'react';
import PremiumCard from '../components/premium/PremiumCard';
import PremiumFeatures from '../components/premium/PremiumFeatures';
import PaymentMethod from '../components/premium/PaymentMethod';
import { Button } from '../components/shared/Button';
import { useNavigate } from 'react-router-dom';
import { useActivatePremiumMutation } from '../store/api/endpoints/premium.api.ts';

const PremiumPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const navigate = useNavigate();

  const [mutatePremium] = useActivatePremiumMutation();

  const premiumPlans = [
    { days: 1, title: 'Дневной', price: 228, originalPrice: 228 },
    { days: 7, title: 'Недельный', price: 1339, originalPrice: 1339 },
    { days: 30, title: 'Месячный', price: 1499, originalPrice: 1999, popular: true },
    { days: 180, title: 'Полгода', price: 7499, originalPrice: 9999 },
    { days: 365, title: 'Годовой', price: 12999, originalPrice: 17999 }
  ];

  const handlePlanSelect = (days: number) => {
    setSelectedPlan(days);
  };

  const handlePurchase = async () => {
    if (!selectedPlan) return;
    try {
      await mutatePremium(selectedPlan);
      console.log(`Покупка премиума на ${selectedPlan} дней через ${paymentMethod}`);
      navigate('/account');
    } catch (error) {
      console.error(error);
    }
  };

  const selectedPlanData = premiumPlans.find(plan => plan.days === selectedPlan);

  return (
    <main className='py-4 sm:py-6 lg:py-8 xl:py-10 px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-25 text-blue-900 max-w-screen-2xl mx-auto'>
      <h2 className='text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-light pl-2 sm:pl-4 lg:pl-6 xl:pl-10 mb-4 sm:mb-5'>
        Премиум подписка
      </h2>

      <div className='flex flex-col xl:flex-row gap-4 sm:gap-5 lg:gap-6 xl:gap-8 2xl:gap-10'>

        <div className='w-full xl:w-2/3'>
          <div className='bg-gray-100 p-3 sm:p-4 lg:p-5 rounded-xl mb-4 sm:mb-5 lg:mb-6'>
            <h3 className='text-lg sm:text-xl lg:text-2xl font-medium mb-4 sm:mb-6 text-blue-900'>
              Выберите тариф
            </h3>
            
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5'>
              {premiumPlans.map((plan) => (
                <PremiumCard
                  key={plan.days}
                  title={plan.title}
                  days={plan.days}
                  price={plan.price}
                  originalPrice={plan.originalPrice}
                  popular={plan.popular}
                  onSelect={handlePlanSelect}
                />
              ))}
            </div>
          </div>

          <PremiumFeatures />
        </div>

        <div className='w-full xl:w-1/3'>
          <div className='bg-gray-100 p-4 sm:p-5 lg:p-6 rounded-xl sticky top-4'>
            <h3 className='text-lg sm:text-xl lg:text-2xl font-medium mb-4 sm:mb-6 text-blue-900'>
              Оформление заказа
            </h3>

            {selectedPlan ? (
              <>
                <div className='mb-4 sm:mb-6 p-3 sm:p-4 bg-white rounded-lg'>
                  <div className='text-center mb-2'>
                    <div className='text-lg sm:text-xl font-bold text-blue-900'>{selectedPlanData?.title}</div>
                    <div className='text-gray-600 text-sm'>{selectedPlan} дней</div>
                  </div>
                  <div className='text-center text-2xl sm:text-3xl font-bold text-blue-900'>
                    {selectedPlanData?.price} ₽
                  </div>
                </div>

                <PaymentMethod
                  selectedMethod={paymentMethod}
                  onMethodChange={setPaymentMethod}
                />

                <Button
                  onClick={handlePurchase}
                  variant="primary"
                  disabled={!selectedPlan}
                >
                  Оформить подписку
                </Button>
              </>
            ) : (
              <div className='text-center py-8 text-gray-500'>
                Выберите тариф для продолжения
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PremiumPage;