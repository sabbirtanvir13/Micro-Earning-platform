import { useState } from 'react';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');

        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setEmail('');
        }, 1500);
    };

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 bg-indigo-600">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-90"></div>
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                    <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white opacity-10 blur-3xl"></div>
                    <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full bg-purple-400 opacity-10 blur-3xl transform translate-x-1/3"></div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-16 lg:flex lg:items-center lg:justify-between shadow-2xl border border-white/10">
                    <div className="lg:w-1/2 lg:pr-12">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
                            Stay ahead in the micro-earning world
                        </h2>
                        <p className="text-lg text-indigo-100 mb-8 lg:mb-0">
                            Join our newsletter to get weekly tips on maximizing your earnings, new task categories, and platform updates directly to your inbox.
                        </p>
                    </div>

                    <div className="lg:w-1/2 lg:pl-12">
                        <form onSubmit={handleSubmit} className="sm:flex">
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="w-full rounded-full border-0 px-6 py-4 placeholder-gray-500 text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:outline-none shadow-sm text-base"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={status === 'success' || status === 'loading'}
                            />
                            <div className="mt-3 sm:mt-0 sm:ml-4 sm:flex-shrink-0">
                                <button
                                    type="submit"
                                    disabled={status === 'success' || status === 'loading'}
                                    className={`w-full flex items-center justify-center rounded-full border border-transparent px-8 py-4 text-base font-medium text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${status === 'loading' ? 'opacity-75 cursor-wait' : ''
                                        }`}
                                >
                                    {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
                                </button>
                            </div>
                        </form>
                        {status === 'success' && (
                            <p className="mt-3 text-sm text-green-300 font-medium animate-fade-in">
                                ✨ Successfully subscribed! Welcome directly to your inbox.
                            </p>
                        )}
                        <p className="mt-4 text-sm text-indigo-200">
                            We care about your data. Read our{' '}
                            <a href="#" className="font-medium text-white underline decoration-indigo-300 hover:decoration-white transition-colors">
                                Privacy Policy
                            </a>.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
