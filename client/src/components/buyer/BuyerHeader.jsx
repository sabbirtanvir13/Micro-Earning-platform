import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const BuyerHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-10">
      <div className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Buyer Panel
          </h1>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-tighter mr-2">Balance</span>
            <span className="font-bold text-blue-700">{user?.coins || 0} Coins</span>
          </div>

          <div className="flex items-center space-x-3 border-l pl-6 border-gray-100">
            <button
              onClick={handleLogout}
              className="text-sm font-semibold text-gray-500 hover:text-red-600 transition-colors"
            >
              Logout
            </button>
            <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden border border-gray-100">
              <img
                src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'U')}`}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default BuyerHeader;
