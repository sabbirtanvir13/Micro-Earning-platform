import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const Privacy = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="max-w-4xl mx-auto px-6 py-20">
                <h1 className="text-4xl font-black text-gray-900 mb-8">Privacy Policy</h1>
                <div className="prose prose-blue text-gray-600">
                    <p className="mb-4">At MicroEarn, your privacy is our priority. We only collect the data necessary to provide our services and ensure secure transactions.</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Data Collection</h3>
                    <p>We collect your email, display name, and task-related data to manage your account and earnings.</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Data Security</h3>
                    <p>We use industry-standard encryption to protect your information and never share your data with third parties without your consent.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Privacy;
