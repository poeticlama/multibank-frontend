import { useState } from 'react';
import ServiceCard from './ServiceCard';
import bankServices from '../../constants/bankServices.ts';

const ServicesBlock = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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
