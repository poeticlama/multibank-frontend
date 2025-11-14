type Advantage = {
  icon: string;
  title: string;
  description: string;
};

type AdvantageCardProps = {
  advantage: Advantage;
};

const AdvantageCard = ({ advantage }: AdvantageCardProps) => {
  return (
    <div className='bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300'>
      <div className='text-4xl mb-4'>{advantage.icon}</div>
      <h3 className='text-xl font-bold text-gray-900 mb-3'>{advantage.title}</h3>
      <p className='text-gray-600 leading-relaxed'>{advantage.description}</p>
    </div>
  );
};

export default AdvantageCard;
