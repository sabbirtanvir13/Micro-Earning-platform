import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [loading, setLoading] = useState(false);
  const { selectRole, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if role already selected
  useEffect(() => {
    if (user && user.role) {
      if (user.role === 'worker') navigate('/worker/dashboard');
      else if (user.role === 'buyer') navigate('/buyer/dashboard');
      else if (user.role === 'admin') navigate('/admin/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedRole) {
      toast.error('Please select a role');
      return;
    }

    setLoading(true);
    const result = await selectRole(selectedRole);

    if (result.success) {
      toast.success(`Welcome as ${selectedRole}!`);
      if (selectedRole === 'worker') {
        navigate('/worker/dashboard');
      } else if (selectedRole === 'buyer') {
        navigate('/buyer/dashboard');
      } else if (selectedRole === 'admin') {
        navigate('/admin/dashboard');
      }
    } else {
      toast.error(result.error || 'Failed to select role');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Choose Your Role
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Select how you want to use the platform
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Worker Card */}
            <div
              onClick={() => setSelectedRole('worker')}
              className={`cursor-pointer border-2 rounded-lg p-6 transition-all ${selectedRole === 'worker'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
                }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Worker</h3>
                <input
                  type="radio"
                  name="role"
                  value="worker"
                  checked={selectedRole === 'worker'}
                  onChange={() => setSelectedRole('worker')}
                  className="h-5 w-5 text-blue-600"
                />
              </div>
              <p className="text-gray-600 mb-4">
                Complete tasks and earn coins. Get started with 10 coins!
              </p>
              <div className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded">
                +10 Coins Bonus
              </div>
            </div>

            {/* Buyer Card */}
            <div
              onClick={() => setSelectedRole('buyer')}
              className={`cursor-pointer border-2 rounded-lg p-6 transition-all ${selectedRole === 'buyer'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
                }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Buyer</h3>
                <input
                  type="radio"
                  name="role"
                  value="buyer"
                  checked={selectedRole === 'buyer'}
                  onChange={() => setSelectedRole('buyer')}
                  className="h-5 w-5 text-blue-600"
                />
              </div>
              <p className="text-gray-600 mb-4">
                Post tasks and get them completed. Get started with 50 coins!
              </p>
              <div className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded">
                +50 Coins Bonus
              </div>
            </div>
          </div>

          {/* Admin Option (if needed) */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => setSelectedRole('admin')}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Are you an admin? Click here
            </button>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || !selectedRole}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Setting up...' : 'Continue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoleSelection;
