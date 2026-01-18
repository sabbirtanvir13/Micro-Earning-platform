import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import HowItWorks from '../../components/common/HowItWorks';

const HowItWorksPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main>
                <div className="bg-blue-600 py-20 text-white text-center">
                    <h1 className="text-5xl font-black mb-4">How it Works</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">Learn how to maximize your earnings or scale your business with MicroEarn.</p>
                </div>
                <HowItWorks />
            </main>
            <Footer />
        </div>
    );
};

export default HowItWorksPage;
