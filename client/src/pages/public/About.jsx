import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const About = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="max-w-7xl mx-auto px-6 py-20">
                <h1 className="text-4xl font-black text-gray-900 mb-8">About MicroEarn</h1>
                <div className="prose prose-lg text-gray-600 max-w-none">
                    <p>
                        MicroEarn is a global platform that connects businesses needing small tasks completed with thousands of workers looking to earn money online. Our mission is to provide accessible earning opportunities to everyone, everywhere.
                    </p>
                    <p>
                        Founded in 2024, we've grown into a community of over 50,000 active members. We pride ourselves on our transparent coin system, instant payouts, and high-quality task matching.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default About;
