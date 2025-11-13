import { useEffect } from 'react';

const SuccessfulPaymentModal = () => {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-black/20 to-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-center animate-scale-in">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Перевод выполнен!
        </h3>

        <p className="text-gray-600 mb-6">
          Деньги успешно переведены. Средства поступят в течение нескольких минут.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
        >
          Понятно
        </button>
      </div>
    </div>
  )
}

export default SuccessfulPaymentModal;