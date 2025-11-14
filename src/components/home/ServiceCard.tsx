import { Link } from 'react-router-dom';

type Service = {
  title: string;
  description: string;
  icon: string;
  path: string;
  gradient: string;
  features: string[];
};

type ServiceCardProps = {
  service: Service;
  isHovered: boolean;
  onHover: (title: string | null) => void;
};

const ServiceCard = ({ service, isHovered, onHover }: ServiceCardProps) => {
  return (
    <Link
      to={service.path}
      className='block group'
      onMouseEnter={() => onHover(service.title)}
      onMouseLeave={() => onHover(null)}
    >
      <div
        className={`
          h-80 rounded-2xl p-6 transition-all duration-500 transform
          bg-gradient-to-br ${service.gradient} 
          ${isHovered ? 'scale-105 shadow-2xl' : 'scale-100 shadow-lg'}
        `}
      >
        <div className='text-white h-full flex flex-col justify-between'>
          <div>
            <div className='text-4xl mb-4'>{service.icon}</div>
            <h3 className='text-2xl font-bold mb-3'>{service.title}</h3>
            <p className='text-blue-100 mb-6'>{service.description}</p>
          </div>

          <div className='space-y-2'>
            {service.features.map((feature, index) => (
              <div
                key={index}
                className='flex items-center text-blue-100 text-sm transition-all duration-300'
                style={{
                  transform: isHovered ? `translateX(${index * 8}px)` : 'translateX(0)',
                }}
              >
                <div className='w-2 h-2 bg-white rounded-full mr-3'></div>
                {feature}
              </div>
            ))}
          </div>

          <div
            className={`mt-4 transition-all duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className='flex items-center justify-between text-white text-sm font-semibold'>
              <span>Перейти</span>
              <span className='transform transition-transform duration-300 group-hover:translate-x-1'>
                →
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
