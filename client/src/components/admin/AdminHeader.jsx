import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminHeader = () => {
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
        <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
          Admin Control Center
        </h1>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleLogout}
              className="text-sm font-semibold text-gray-500 hover:text-red-600 transition-colors"
            >
              Logout
            </button>
            <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden border border-gray-100">
              <img
                src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'A')}`}
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

export default AdminHeader;
