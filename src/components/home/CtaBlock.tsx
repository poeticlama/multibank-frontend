import { Link } from 'react-router-dom';

const CtaBlock = () => {
  return (
    <section className='py-16 bg-blue-600'>
      <div className='container mx-auto px-4'>
        <div className='text-center text-white max-w-3xl mx-auto'>
          <h2 className='text-3xl md:text-4xl font-bold mb-6'>Готовы начать?</h2>
          <p className='text-xl text-blue-100 mb-8'>
            Присоединяйтесь к миллионам довольных клиентов по всей стране
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link
              to='/register'
              className='bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300'
            >
              Стать клиентом
            </Link>
            <Link
              to='/login'
              className='border-2 border-white text-white hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300'
            >
              Войти в кабинет
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBlock;
