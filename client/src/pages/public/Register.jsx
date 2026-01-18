import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { isFirebaseConfigured } from '../../services/firebase.config';
import toast from 'react-hot-toast';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, loginWithGoogle, loginWithFacebook, loginWithGithub, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (user) {
    if (user.role === 'worker') navigate('/worker/dashboard');
    else if (user.role === 'buyer') navigate('/buyer/dashboard');
    else if (user.role === 'admin') navigate('/admin/dashboard');
    else navigate('/select-role');
  }

  const handleResult = (result, provider) => {
    if (result.success) {
      toast.success('Registration successful!');
      navigate('/select-role');
    } else {
      toast.error(result.error || `${provider} registration failed`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    const result = await register(email, password, displayName);
    handleResult(result, 'Email');
    setLoading(false);
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    let result;
    if (provider === 'Google') result = await loginWithGoogle();
    else if (provider === 'Facebook') result = await loginWithFacebook();
    else if (provider === 'GitHub') result = await loginWithGithub();

    handleResult(result, provider);
    setLoading(false);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white overflow-hidden font-sansSelection">
      {/* Left side: Premium Illustration & Content */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-gray-50 relative p-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 z-0" />
        <div className="relative z-10 space-y-8 max-w-lg text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-xs font-black uppercase tracking-widest animate-pulse">
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            <span>Initialize Protocol</span>
          </div>
          <h1 className="text-6xl font-black text-gray-900 leading-none tracking-tighter uppercase">
            Begin Your <br />
            <span className="text-blue-600">Legendary Journey</span>
          </h1>
          <p className="text-gray-500 font-medium text-lg italic">
            Set up your high-performance workspace and start earning through verified micro-tasking.
          </p>
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-[3rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <img
              src="https://img.freepik.com/free-vector/creative-team-concept-illustration_114360-3563.jpg"
              alt="Creative Journey"
              className="relative rounded-[2.5rem] shadow-2xl border border-white/50 w-full object-cover aspect-video bg-white"
            />
          </div>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-indigo-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl" />
      </div>

      {/* Right side: Register Form */}
      <div className="flex flex-col justify-center items-center p-8 lg:p-20 bg-white relative">
        <div className="w-full max-w-md space-y-10 animate-in fade-in slide-in-from-right-8 duration-700">
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center text-blue-600 font-black text-xs uppercase tracking-widest hover:translate-x-[-4px] transition-transform">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeWidth={2.5} /></svg>
              Abort Protocol
            </Link>
            <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tight">Identity Creation</h2>
            <p className="text-gray-400 font-medium">Define your presence in the earning biosphere.</p>
          </div>

          {!isFirebaseConfigured && (
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-2xl">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-amber-400 mr-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                <p className="text-amber-800 text-xs font-bold uppercase tracking-wider">Protocol Initialization Required: Check Environment Variables</p>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Public Alias</label>
                <div className="relative group">
                  <input
                    type="text"
                    className="w-full px-6 py-5 rounded-3xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all outline-none font-bold text-gray-900"
                    placeholder="E.g. Digital Pioneer"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeWidth={2.5} /></svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Secure Identifier</label>
                <div className="relative group">
                  <input
                    type="email"
                    required
                    className="w-full px-6 py-5 rounded-3xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all outline-none font-bold text-gray-900"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeWidth={2.5} /></svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Authentication Key</label>
                <div className="relative group">
                  <input
                    type="password"
                    required
                    className="w-full px-6 py-5 rounded-3xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all outline-none font-bold text-gray-900"
                    placeholder="Create strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeWidth={2.5} /></svg>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white font-black py-6 rounded-3xl text-sm uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/30 hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Commit Identity</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth={2.5} /></svg>
                </>
              )}
            </button>
          </form>

          <div className="space-y-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-6 bg-white text-gray-400 font-extrabold uppercase tracking-widest">Rapid Onboarding</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => handleSocialLogin('Google')}
                disabled={loading}
                className="flex items-center justify-center py-4 px-4 border-2 border-gray-50 rounded-2xl hover:bg-gray-50 hover:border-gray-100 transition-all disabled:opacity-50 group"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => handleSocialLogin('Facebook')}
                disabled={loading}
                className="flex items-center justify-center py-4 px-4 border-2 border-gray-50 rounded-2xl hover:bg-blue-50/50 hover:border-blue-100 transition-all disabled:opacity-50 text-[#1877f2]"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => handleSocialLogin('GitHub')}
                disabled={loading}
                className="flex items-center justify-center py-4 px-4 border-2 border-gray-50 rounded-2xl hover:bg-gray-900/5 hover:border-gray-200 transition-all disabled:opacity-50 text-gray-900"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          <div className="pt-6 flex justify-center">
            <p className="text-sm font-bold text-gray-400">
              Already part of the network?
              <Link to="/login" className="ml-2 text-blue-600 font-extrabold uppercase tracking-widest hover:text-blue-700 transition-colors">
                Access Portal
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
