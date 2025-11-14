import { Link } from 'react-router-dom';

const HeroBlock = () => {
  return (
    <section className='bg-white border-b border-gray-200'>
      <div className='container mx-auto px-4 py-16'>
        <div className='text-center max-w-4xl mx-auto'>
          <h1 className='text-4xl md:text-6xl font-bold text-gray-900 mb-6'>Multibank</h1>
          <p className='text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed'>
            Современный банкинг для вашего комфорта
          </p>
          <p className='text-lg text-gray-500 mb-12 max-w-2xl mx-auto'>
            Управляйте финансами легко и безопасно. Полный контроль над вашими средствами в любое
            время и в любом месте.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link
              to='/login'
              className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300 shadow-lg hover:shadow-xl'
            >
              Войти в систему
            </Link>
            <Link
              to='/register'
              className='border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300'
            >
              Открыть счет
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBlock;
