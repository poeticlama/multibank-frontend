import HeroBlock from '../components/home/HeroBlock';
import ServicesBlock from '../components/home/ServicesBlock';
import AdvantagesBlock from '../components/home/AdvantagesBlock';
import CtaBlock from '../components/home/CtaBlock';
import FooterBlock from '../components/home/FooterBlock';
import Description from '../components/home/Description';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <HeroBlock />
      <Description />
      <ServicesBlock />
      <AdvantagesBlock />
      <CtaBlock />
      <FooterBlock />
    </div>
  );
};

export default HomePage;