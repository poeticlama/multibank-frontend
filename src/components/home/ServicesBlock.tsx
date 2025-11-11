import { useState } from 'react';
import ServiceCard from './ServiceCard';

const ServicesBlock = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const bankServices = [
    {
      title: 'Личный кабинет',
      description: 'Управление счетами и картами в одном месте',
      icon: '👤',
      path: '/account',
      gradient: 'from-blue-600 to-blue-800',
      features: ['Просмотр балансов', 'История операций', 'Управление картами'],
    },
    {
      title: 'Переводы и платежи',
      description: 'Быстрые переводы между счетами и оплата услуг',
      icon: '💸',
      path: '/account/payments',
      gradient: 'from-green-600 to-green-800',
      features: ['Межбанковские переводы', 'Оплата услуг', 'Шаблоны платежей'],
    },
    {
      title: 'История операций',
      description: 'Полная детализация всех финансовых операций',
      icon: '📊',
      path: '/account/history',
      gradient: 'from-purple-600 to-purple-800',
      features: ['Фильтрация по датам', 'Экспорт выписок', 'Поиск операций'],
    },
    {
      title: 'Финансовые продукты',
      description: 'Инвестиции, кредиты и страховые решения',
      icon: '🏦',
      path: '/account/products',
      gradient: 'from-orange-600 to-orange-800',
      features: ['Инвестиционные счета', 'Кредитные предложения', 'Страхование'],
    },
    {
      title: 'Премиум услуги',
      description: 'Эксклюзивные возможности для премиум-клиентов',
      icon: '⭐',
      path: '/account/premium',
      gradient: 'from-yellow-600 to-yellow-800',
      features: ['Персональный менеджер', 'Повышенные лимиты', 'Приоритетное обслуживание'],
    },
  ];

  return (
    <section className='py-16 bg-white'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>Наши услуги</h2>
          <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
            Полный спектр банковских услуг для физических лиц
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {bankServices.map(service => (
            <ServiceCard
              key={service.path}
              service={service}
              isHovered={hoveredCard === service.title}
              onHover={setHoveredCard}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesBlock;
