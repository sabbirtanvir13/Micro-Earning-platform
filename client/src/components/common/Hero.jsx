import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

const Hero = () => {
  const { user } = useAuth();

  const [query, setQuery] = useState('');

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const q = (query || '').trim();
    if (!q) return navigate('/worker/tasks');
    navigate(`/worker/tasks?q=${encodeURIComponent(q)}`);
  };

  return (
    <section className="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="inline-block bg-white/10 text-white/90 px-3 py-1 rounded-full text-sm font-medium mb-4">Trusted by 20k+ workers</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
              Turn small tasks into big opportunities
              <span className="block text-yellow-300">Earn instantly — anywhere, anytime</span>
            </h1>
            <p className="text-lg text-white/90 mb-6">Complete micro-tasks, earn rewards, and withdraw fast. Simple workflows, reliable payouts.</p>

            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-3 mb-6">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search tasks"
                placeholder="Search tasks: e.g. translation, testing, survey"
                className="w-full sm:flex-1 px-4 py-3 rounded-lg text-gray-800"
                type="search"
              />
              <button type="submit" className="w-full sm:w-auto bg-yellow-400 text-blue-900 font-bold px-6 py-3 rounded-lg shadow hover:bg-yellow-300 transition">Find Tasks</button>
            </form>

            <div className="flex flex-wrap gap-3 items-center">
              {user ? (
                <Link
                  to={user.role === 'worker' ? '/worker/dashboard' : user.role === 'buyer' ? '/buyer/dashboard' : '/select-role'}
                  className="bg-white text-blue-700 px-5 py-3 rounded-md font-semibold shadow"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/register" className="bg-white text-blue-700 px-5 py-3 rounded-md font-semibold shadow">Get Started Free</Link>
                  <Link to="/login" className="text-white/95 border border-white/30 px-5 py-3 rounded-md">Sign In</Link>
                </>
              )}
            </div>

            <ul className="mt-8 grid grid-cols-3 gap-4 text-sm text-white/90">
              <li>
                <strong className="block text-xl">$120k+</strong>
                <span className="text-xs">Paid to workers</span>
              </li>
              <li>
                <strong className="block text-xl">50k+</strong>
                <span className="text-xs">Tasks completed</span>
              </li>
              <li>
                <strong className="block text-xl">99%</strong>
                <span className="text-xs">On-time payouts</span>
              </li>
            </ul>
          </div>

          <div className="relative">
            <div className="mx-auto max-w-md bg-white/10 backdrop-blur rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-white/90">New Task</p>
                  <p className="font-semibold text-white">Translate a short paragraph</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white/90">Reward</p>
                  <p className="font-bold text-yellow-300">$1.25</p>
                </div>
              </div>
              <div className="h-36 bg-white/5 rounded-md flex items-center justify-center text-white/80">Task preview illustration</div>
            </div>

            <svg className="absolute -right-10 -top-8 w-52 h-52 opacity-30" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="g" x1="0" x2="1">
                  <stop offset="0%" stopColor="#fff" stopOpacity=".12" />
                  <stop offset="100%" stopColor="#fff" stopOpacity=".02" />
                </linearGradient>
              </defs>
              <path fill="url(#g)" d="M44.8,-62.6C57.5,-52.6,67.6,-42.1,73.8,-29.3C80,-16.4,82.2,-1.2,78.8,12.4C75.4,26,66.4,38,54.1,46.5C41.8,55.1,26.2,60.1,9.7,64.5C-6.8,68.9,-24.5,72.6,-36.8,66.9C-49.1,61.2,-56,46.1,-60.7,32C-65.4,17.9,-68,4.9,-68.1,-8.9C-68.1,-22.6,-65.6,-37.2,-56.6,-48.2C-47.6,-59.2,-31.9,-66.6,-16.2,-68.8C-0.5,-71,14.2,-68.5,28.9,-63.6C43.6,-58.6,57.4,-51,44.8,-62.6Z" transform="translate(100 100)"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
