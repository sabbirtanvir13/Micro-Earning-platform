import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const Contact = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 mb-6">Contact Us</h1>
                        <p className="text-gray-600 mb-8 text-lg">Have questions? We're here to help. Reach out to our support team and we'll get back to you within 24 hours.</p>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Email</p>
                                    <p className="text-gray-900 font-bold">support@microearn.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50">
                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:outline-none" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                                <textarea rows="4" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:outline-none" placeholder="How can we help?"></textarea>
                            </div>
                            <button className="w-full bg-blue-600 text-white font-black py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">Send Message</button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Contact;
