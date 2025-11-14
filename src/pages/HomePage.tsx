import HeroBlock from '../components/home/HeroBlock';
import ServicesBlock from '../components/home/ServicesBlock';
import CtaBlock from '../components/home/CtaBlock';
import FooterBlock from '../components/home/FooterBlock';
import Description from '../components/home/Description';

const HomePage = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50'>
      <HeroBlock />
      <Description />
      <ServicesBlock />
      <CtaBlock />
      <FooterBlock />
    </div>
  );
};

export default HomePage;
