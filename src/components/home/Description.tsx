// src/components/home/Description.tsx
const Description = () => {
  return (
    <section className='py-6 bg-white'>
      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6'>О Multibank</h2>
            <div className='w-24 h-1 bg-blue-600 mx-auto mb-8'></div>
          </div>

          <div className='prose prose-lg max-w-none text-gray-700'>
            <p className='text-xl leading-relaxed mb-6 text-gray-600'>
              <strong>Multibank</strong> —  это цифровая платформа, которая объединяет современные банковские
              технологии и инструменты для эффективного управления личными и бизнес-финансами. Она делает
              финансовую жизнь пользователей удобнее и технологичнее за счет продвинутых сервисов и возможностей
              персонализации.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Description;
