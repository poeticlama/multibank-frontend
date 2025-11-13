import { useState } from 'react';
import PremiumCard from '../components/premium/PremiumCard';
import PremiumFeatures from '../components/premium/PremiumFeatures';
import PaymentMethod from '../components/premium/PaymentMethod';
import { Button } from '../components/shared/Button';
import { useActivatePremiumMutation } from '../store/api/endpoints/premium.api.ts';
import premiumPlans from '../constants/premiumPlans.ts';
import { useAuth } from '../hooks/useAuth.ts';
import Loader from '../components/shared/Loader.tsx';

const PremiumPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const { user, refreshUser } = useAuth();

  const [mutatePremium, {isLoading: premiumPaymentLoading}] = useActivatePremiumMutation();

  if (premiumPaymentLoading) return <Loader />;

  const handlePlanSelect = (days: number) => {
    setSelectedPlan(days);
  };

  const handlePurchase = async () => {
    if (!selectedPlan) return;
    try {
      await mutatePremium(selectedPlan);
      await refreshUser();
    } catch (error) {
      console.error(error);
    }
  };

  const selectedPlanData = premiumPlans.find(plan => plan.days === selectedPlan);

  return (
    <main className='py-4 sm:py-6 lg:py-8 xl:py-10 px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-25 text-blue-900 max-w-screen-2xl mx-auto'>
      <h2 className='text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-light pl-2 sm:pl-4 lg:pl-6 xl:pl-10 mb-4 sm:mb-7'>
        Премиум подписка
      </h2>

      <div className="ml-10 mb-10">
        <span className="font-semibold">Текущий тариф: </span>
        {(user?.status === "PREMIUM" && !!user?.premiumExpireDate) ? (
          <span className="text-yellow-500 font-medium">
          Премиум <span className="text-blue-900">(до {new Date(user?.premiumExpireDate).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long'
          })})</span>
  </span>
        ) : (
          <span className="text-gray-600">Базовый</span>
        )}
      </div>

      <div className='flex flex-col xl:flex-row gap-4 sm:gap-5 lg:gap-6 xl:gap-8 2xl:gap-10'>
        <div className='w-full xl:w-2/3'>
          <div className='bg-gray-100 p-3 sm:p-4 lg:p-5 rounded-xl mb-4 sm:mb-5 lg:mb-6'>
            <h3 className='text-lg sm:text-xl lg:text-2xl font-medium mb-4 sm:mb-6 text-blue-900'>
              Выберите тариф
            </h3>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5'>
              {premiumPlans.map(plan => (
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
          <div className='bg-gray-100 p-4 sm:p-5 lg:p-6 rounded-xl sticky top-40'>
            <h3 className='text-lg sm:text-xl lg:text-2xl font-medium mb-4 sm:mb-6 text-blue-900'>
              Оформление заказа
            </h3>

            {selectedPlan ? (
              <>
                <div className='mb-4 sm:mb-6 p-3 sm:p-4 bg-white rounded-lg'>
                  <div className='text-center mb-2'>
                    <div className='text-lg sm:text-xl font-bold text-blue-900'>
                      {selectedPlanData?.title}
                    </div>
                    <div className='text-gray-600 text-sm'>{selectedPlan} дней</div>
                  </div>
                  <div className='text-center text-2xl sm:text-3xl font-bold text-blue-900'>
                    {selectedPlanData?.price} ₽
                  </div>
                </div>

                <PaymentMethod selectedMethod={paymentMethod} onMethodChange={setPaymentMethod} />

                <Button onClick={handlePurchase} variant='primary' disabled={!selectedPlan} pointer>
                  Оформить подписку
                </Button>
              </>
            ) : (
              <div className='text-center py-8 text-gray-500'>Выберите тариф для продолжения</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PremiumPage;
