import { Link } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Hero from '../../components/common/Hero';
import WhyChooseUs from '../../components/common/WhyChooseUs';
import HowItWorks from '../../components/common/HowItWorks';
import Testimonials from '../../components/common/Testimonials';
import Newsletter from '../../components/common/Newsletter';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <WhyChooseUs />
        <HowItWorks />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
