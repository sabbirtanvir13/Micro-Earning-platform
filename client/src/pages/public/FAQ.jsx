import { useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const categories = [
        {
            title: 'Getting Started',
            questions: [
                { q: "How do I create an account?", a: "Simply click the 'Sign Up' button in the header, choose whether you want to be a Worker or a Buyer, and follow the registration steps. You'll get a welcome bonus instantly!" },
                { q: "Can I change my role later?", a: "Yes, you can register as both a worker and a buyer using the same email. However, your balances and dashboards remain separate to ensure security and clarity." },
                { q: "Is MicroEarn free to use?", a: "Absolutely! There are no registration or monthly fees. We only take a small service fee from task payments to maintain the platform ecosystem." }
            ]
        },
        {
            title: 'Earnings & Payments',
            questions: [
                { q: "What is the minimum withdrawal amount?", a: "The minimum withdrawal threshold is 200 coins ($2.00). This ensures we can process payments efficiently while keeping fees low for our users." },
                { q: "How long do payouts take?", a: "Once you request a withdrawal, our team reviews it within 24 hours. Most payments are processed instantly to your chosen payment method after approval." },
                { q: "What payment methods do you support?", a: "We currently support Stripe (Credit/Debit cards) and direct bank transfers. We are constantly adding new global payment partners." }
            ]
        },
        {
            title: 'Tasks & Quality',
            questions: [
                { q: "How long until my task is approved?", a: "Buyers usually review tasks within 24-48 hours. If a buyer doesn't take action within 7 days, our system automatically approves the task and releases the coins to the worker." },
                { q: "What happens if my task is rejected?", a: "If a task is rejected, the buyer must provide a reason. If you feel the rejection was unfair, you can appeal to our admin team through the support center." },
                { q: "How do I post a task as a Buyer?", a: "Switch to the Buyer Dashboard, click 'Create Task', fill in the requirements and reward amount. Once you fund the project with coins, workers will start seeing it in their feed." }
            ]
        }
    ];

    const flatQuestions = categories.flatMap(cat => cat.questions);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="relative py-24 overflow-hidden">
                {/* Decorative background blobs */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 opacity-60"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-50 rounded-full blur-3xl translate-y-1/2 translate-x-1/2 opacity-60"></div>

                <div className="max-w-4xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-3">Help Center</h2>
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
                            Got <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Questions?</span>
                        </h1>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">
                            Everything you need to know about the MicroEarn ecosystem. Can't find an answer?
                            <a href="/contact" className="text-blue-600 hover:underline ml-1">Contact our support team.</a>
                        </p>
                    </div>

                    <div className="space-y-16">
                        {categories.map((category, catIndex) => (
                            <div key={catIndex}>
                                <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center">
                                    <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm mr-4 shadow-lg shadow-blue-200">
                                        {catIndex + 1}
                                    </span>
                                    {category.title}
                                </h3>

                                <div className="space-y-4">
                                    {category.questions.map((faq, qIndex) => {
                                        const globalIndex = categories.slice(0, catIndex).reduce((acc, c) => acc + c.questions.length, 0) + qIndex;
                                        const isOpen = activeIndex === globalIndex;

                                        return (
                                            <div
                                                key={qIndex}
                                                className={`group border rounded-[2rem] transition-all duration-300 ${isOpen
                                                        ? 'border-blue-200 bg-blue-50/30 shadow-xl shadow-blue-500/5'
                                                        : 'border-gray-100 bg-white hover:border-gray-200'
                                                    }`}
                                            >
                                                <button
                                                    onClick={() => toggleAccordion(globalIndex)}
                                                    className="w-full flex items-center justify-between p-8 text-left focus:outline-none"
                                                >
                                                    <span className={`text-xl font-bold transition-colors ${isOpen ? 'text-blue-600' : 'text-gray-900'}`}>
                                                        {faq.q}
                                                    </span>
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-blue-600 text-white rotate-180' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'}`}>
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </div>
                                                </button>

                                                <div
                                                    className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                                        }`}
                                                >
                                                    <div className="px-8 pb-8 text-gray-600 leading-relaxed font-medium text-lg border-t border-blue-100/30 pt-4">
                                                        {faq.a}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quick Support Card */}
                    <div className="mt-24 p-12 bg-gradient-to-r from-gray-900 to-gray-800 rounded-[3rem] text-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2 group-hover:opacity-30 transition-opacity"></div>
                        <div className="relative z-10">
                            <h4 className="text-3xl font-black text-white mb-4">Still have questions?</h4>
                            <p className="text-gray-400 mb-10 text-lg">Our expert support team is ready to assist you 24/7 with any issue.</p>
                            <div className="flex flex-wrap justify-center gap-6">
                                <a href="/contact" className="px-10 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 hover:-translate-y-1">
                                    Get in Touch
                                </a>
                                <a href="mailto:support@microearn.com" className="px-10 py-4 bg-white/5 text-white border border-white/10 font-black rounded-2xl hover:bg-white/10 transition-all">
                                    Email Us
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default FAQ;
