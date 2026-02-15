import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-white relative overflow-hidden">
            {/* Abstract Background Blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none animate-pulse delay-700" />

            <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-12 relative z-10">
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-8xl md:text-9xl font-black bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-4 tracking-tighter">
                        404
                    </h1>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-6">
                        Oops! This Task doesn't exist.
                    </h2>
                    <p className="text-slate-400 text-lg mb-8 leading-relaxed max-w-md">
                        It looks like you've wandered into an unassigned zone. Even the smallest earnings get lost sometimes. Let's get you back on track to earning!
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <button
                            onClick={() => navigate('/')}
                            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-50 hover:to-blue-500 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] active:scale-95"
                        >
                            Back to Home
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            className="px-8 py-4 bg-slate-900 border border-slate-700 hover:border-slate-500 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl"
                        >
                            Go Back
                        </button>
                    </div>
                </div>

                <div className="flex-1 relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
                    <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                        <img
                            src="/404-illustration.png"
                            alt="404 Not Found"
                            className="w-full h-auto object-cover opacity-90 group-hover:scale-110 transition duration-700"
                        />
                    </div>
                </div>
            </div>

            <div className="mt-20 text-slate-500 text-sm font-medium tracking-widest uppercase flex items-center gap-4">
                <div className="w-8 h-[1px] bg-slate-800" />
                Micro-Earning Platform
                <div className="w-8 h-[1px] bg-slate-800" />
            </div>
        </div>
    );
};

export default NotFound;
