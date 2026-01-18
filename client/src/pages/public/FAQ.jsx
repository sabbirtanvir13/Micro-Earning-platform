import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const FAQ = () => {
    const faqs = [
        { q: "How do I earn coins?", a: "Browse available tasks in the dashboard, follow the instructions, and submit your proof. Once the buyer approves, coins are added to your balance." },
        { q: "What is the minimum withdrawal?", a: "The minimum withdrawal is 200 coins, which is equivalent to $2.00." },
        { q: "How long does approval take?", a: "Buyers usually review tasks within 24-48 hours. If they don't review, the system automatically approves them after 7 days." }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="max-w-4xl mx-auto px-6 py-20">
                <h1 className="text-4xl font-black text-gray-900 mb-12 text-center">Frequently Asked Questions</h1>
                <div className="space-y-6">
                    {faqs.map((faq, i) => (
                        <div key={i} className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100">
                            <h4 className="text-xl font-bold text-gray-900 mb-2">{faq.q}</h4>
                            <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default FAQ;
