import { Link } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Hero from '../../components/common/Hero';
import Features from '../../components/common/Features';
import HowItWorks from '../../components/common/HowItWorks';
import Testimonials from '../../components/common/Testimonials';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
