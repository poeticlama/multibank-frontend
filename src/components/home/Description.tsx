// src/components/home/Description.tsx
const Description = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              О Multibank
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-xl leading-relaxed mb-6 text-gray-600">
              <strong>Multibank</strong> — это современный финансовый институт, который сочетает 
              в себе надежность традиционного банкинга и инновационные технологии 
              цифровой эпохи. Мы создаем финансовые решения, которые делают жизнь 
              наших клиентов проще и комфортнее.
            </p>

            <div className="grid md:grid-cols-2 gap-8 my-12">
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="text-blue-600 mr-3">🎯</span>
                  Наша миссия
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Предоставлять доступные и понятные финансовые услуги, 
                  помогая клиентам достигать их целей через smart-решения 
                  и персональный подход.
                </p>
              </div>

              <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="text-green-600 mr-3">🚀</span>
                  Наше видение
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Стать самым технологичным банком, где каждый клиент 
                  чувствует заботу и получает лучший сервис независимо 
                  от своего местоположения.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-6 mt-12">
              Почему клиенты выбирают нас?
            </h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Простота и удобство
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Интуитивно понятный интерфейс личного кабинета и мобильного приложения 
                    позволяет управлять финансами без специальных знаний. Все операции 
                    занимают минимум времени и усилий.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Безопасность превыше всего
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Мы используем многоуровневую систему защиты, включая биометрическую 
                    аутентификацию, двухфакторную проверку и шифрование данных. Ваши 
                    средства и персональная информация находятся под надежной защитой.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Круглосуточная поддержка
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Наша служба поддержки работает 24/7. Вы можете обратиться за помощью 
                    в любое время через онлайн-чат, телефон или email. Мы решаем вопросы 
                    оперативно и профессионально.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Description;