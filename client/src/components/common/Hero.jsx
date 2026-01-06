import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Hero = () => {
  const { user } = useAuth();

  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            Earn Money by Completing
            <span className="block text-yellow-300">Micro Tasks</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Join thousands of workers earning coins every day. Simple tasks, real rewards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link
                to={user.role === 'worker' ? '/worker/dashboard' : user.role === 'buyer' ? '/buyer/dashboard' : '/select-role'}
                className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg font-bold text-lg hover:bg-yellow-300 transition"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg font-bold text-lg hover:bg-yellow-300 transition"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/login"
                  className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
