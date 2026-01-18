import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import { Link } from 'react-router-dom';

const About = () => {
    const values = [
        {
            title: 'Radical Transparency',
            description: 'We believe in a world where work is verified by code, not just promises. Our coin system ensures every effort is tracked and rewarded.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            ),
            color: 'blue'
        },
        {
            title: 'Global Inclusion',
            description: 'Talent is universal, but opportunity is not. We bridge the gap, bringing premium micro-tasks to every corner of the globe.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
            ),
            color: 'purple'
        },
        {
            title: 'Unyielding Security',
            description: 'Your data and earnings are sacred. We leverage top-tier encryption and fraud prevention to keep the ecosystem pure.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            color: 'indigo'
        }
    ];

    const stats = [
        { label: 'Active Workers', value: '50k+' },
        { label: 'Tasks Completed', value: '1.2M' },
        { label: 'Total Paid Out', value: '$850k+' },
        { label: 'Countries Reached', value: '140+' },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main>
                {/* Modern Hero Section */}
                <section className="relative pt-20 pb-32 overflow-hidden">
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-blue-50 rounded-full blur-3xl opacity-50"></div>
                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-purple-50 rounded-full blur-3xl opacity-50"></div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="flex flex-col lg:flex-row items-center gap-16">
                            <div className="lg:w-1/2">
                                <div className="inline-flex items-center space-x-2 bg-blue-100/50 border border-blue-200 rounded-full px-4 py-2 mb-6">
                                    <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
                                    <span className="text-sm font-bold text-blue-800">Founded in 2024</span>
                                </div>
                                <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight mb-8">
                                    Redefining the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Future of Work</span>
                                </h1>
                                <p className="text-xl text-gray-500 leading-relaxed mb-10 max-w-xl">
                                    MicroEarn isn't just a platform; it's an ecosystem where talent meets opportunity instantly. We're building the infrastructure for a global decentralized workforce.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link to="/register" className="px-8 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 hover:-translate-y-1">
                                        Join the Movement
                                    </Link>
                                    <Link to="/contact" className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-100 font-black rounded-2xl hover:bg-gray-50 transition-all">
                                        Talk to Us
                                    </Link>
                                </div>
                            </div>
                            <div className="lg:w-1/2 relative">
                                <div className="relative z-10 grid grid-cols-2 gap-4">
                                    <div className="space-y-4">
                                        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop" className="rounded-[2.5rem] shadow-2xl" alt="Collaboration" />
                                        <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white">
                                            <p className="text-4xl font-black mb-2">99.9%</p>
                                            <p className="text-sm font-bold opacity-80 uppercase tracking-widest">Platform Uptime</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4 pt-8">
                                        <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white">
                                            <p className="text-4xl font-black mb-2">Instant</p>
                                            <p className="text-sm font-bold opacity-80 uppercase tracking-widest">Payout Approval</p>
                                        </div>
                                        <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=400&fit=crop" className="rounded-[2.5rem] shadow-2xl" alt="Work" />
                                    </div>
                                </div>
                                {/* Decorative blob */}
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-20 bg-gray-900 overflow-hidden relative">
                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                            {stats.map((stat, i) => (
                                <div key={i} className="text-center">
                                    <p className="text-5xl font-black text-white mb-2">{stat.value}</p>
                                    <p className="text-blue-400 font-bold uppercase tracking-widest text-xs">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-32 bg-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center max-w-3xl mx-auto mb-20">
                            <h2 className="text-indigo-600 font-black tracking-widest uppercase text-sm mb-3">Our Foundation</h2>
                            <h3 className="text-4xl md:text-5xl font-black text-gray-900">What Drives <span className="text-blue-600">MicroEarn?</span></h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {values.map((v, i) => (
                                <div key={i} className="group p-10 rounded-[2.5rem] bg-gray-50 border border-transparent hover:border-blue-100 hover:bg-white hover:shadow-2xl transition-all duration-500">
                                    <div className={`w-16 h-16 rounded-2xl bg-${v.color}-100 flex items-center justify-center text-${v.color}-600 mb-8 group-hover:scale-110 transition-transform`}>
                                        {v.icon}
                                    </div>
                                    <h4 className="text-2xl font-black text-gray-900 mb-4">{v.title}</h4>
                                    <p className="text-gray-500 leading-relaxed font-medium">
                                        {v.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Mission CTA */}
                <section className="py-32 bg-white px-6">
                    <div className="max-w-7xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[3rem] p-12 lg:p-24 relative overflow-hidden text-center text-white">
                        {/* Abstract pattern */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <path d="M0 100 L100 0" stroke="white" strokeWidth="0.5" fill="none" />
                                <path d="M0 0 L100 100" stroke="white" strokeWidth="0.5" fill="none" />
                            </svg>
                        </div>

                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h3 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Ready to be part of the Global Shift?</h3>
                            <p className="text-xl text-blue-100 mb-12 font-medium">
                                Whether you're a buyer scaling tasks or a worker seeking freedom, MicroEarn is your home.
                            </p>
                            <div className="flex flex-wrap justify-center gap-6">
                                <Link to="/register" className="px-12 py-5 bg-white text-blue-600 font-black rounded-[2rem] hover:shadow-2xl hover:scale-105 transition-all">
                                    Get Started Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default About;
