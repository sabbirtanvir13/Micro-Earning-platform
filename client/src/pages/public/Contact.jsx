import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const Contact = () => {
    const contactInfo = [
        {
            title: 'Our Headquarters',
            detail: '123 Earning Street, Digital Valley, Tech City 10110',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            color: 'blue'
        },
        {
            title: 'Support Email',
            detail: 'support@microearn.com',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            color: 'purple'
        },
        {
            title: 'Global Phone',
            detail: '+1 (555) 123-4567',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
            color: 'indigo'
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="relative py-24 overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-60"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-60"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-3">Get In Touch</h2>
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
                            We're Here to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Support You</span>
                        </h1>
                        <p className="text-xl text-gray-500 font-medium">
                            Have questions or need technical assistance? Our team typically responds within 24 hours.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Contact Info Sidebar */}
                        <div className="lg:col-span-1 space-y-8">
                            {contactInfo.map((info, i) => (
                                <div key={i} className="flex items-start space-x-6 p-8 bg-gray-50/50 rounded-3xl border border-gray-100 hover:border-blue-100 transition-all duration-300">
                                    <div className={`w-14 h-14 rounded-2xl bg-${info.color}-100 flex items-center justify-center text-${info.color}-600 shrink-0 shadow-lg shadow-${info.color}-500/10`}>
                                        {info.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-gray-900 mb-1">{info.title}</h4>
                                        <p className="text-gray-500 font-medium leading-relaxed">{info.detail}</p>
                                    </div>
                                </div>
                            ))}

                            {/* Social Connect Badge */}
                            <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2.5rem] text-white overflow-hidden relative group">
                                <div className="relative z-10">
                                    <h4 className="text-xl font-bold mb-4">Connect on Socials</h4>
                                    <p className="text-gray-400 mb-6 text-sm">Follow us for weekly task updates and platform news.</p>
                                    <div className="flex space-x-3">
                                        {['FB', 'TW', 'IG', 'LN'].map((s, i) => (
                                            <button key={i} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-xs hover:bg-white hover:text-gray-900 transition-all">
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                            </div>
                        </div>

                        {/* Modern Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white p-10 md:p-12 rounded-[3rem] border border-gray-100 shadow-2xl shadow-gray-200/50">
                                <form className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-2">Full Name</label>
                                            <input
                                                type="text"
                                                placeholder="John Doe"
                                                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-gray-900 font-medium border-2"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-2">Email Address</label>
                                            <input
                                                type="email"
                                                placeholder="john@example.com"
                                                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-gray-900 font-medium border-2"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-2">Subject</label>
                                        <select className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-gray-900 font-medium border-2 appearance-none">
                                            <option>General Inquiry</option>
                                            <option>Technical Support</option>
                                            <option>Payment Issue</option>
                                            <option>Partnership</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-2">Your Message</label>
                                        <textarea
                                            rows="6"
                                            placeholder="How can we help you today?"
                                            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-gray-900 font-medium border-2 resize-none"
                                        ></textarea>
                                    </div>

                                    <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black py-5 rounded-2xl hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 transition-all flex items-center justify-center space-x-3 group">
                                        <span>Send Message</span>
                                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Contact;
