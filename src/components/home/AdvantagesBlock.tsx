import AdvantageCard from './AdvantageCard';

const AdvantagesBlock = () => {
  const advantages = [
    {
      icon: '🔒',
      title: 'Безопасность',
      description: 'Многоуровневая защита ваших средств и данных'
    },
    {
      icon: '⚡',
      title: 'Скорость',
      description: 'Мгновенные операции в любое время суток'
    },
    {
      icon: '💎',
      title: 'Надежность',
      description: 'Работаем на финансовом рынке более 20 лет'
    },
    {
      icon: '📱',
      title: 'Доступность',
      description: 'Полный функционал в мобильном приложении'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Почему выбирают нас
          </h2>
          <p className="text-xl text-gray-600">
            Преимущества нашего банковского обслуживания
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => (
            <AdvantageCard
              key={index}
              advantage={advantage}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesBlock;