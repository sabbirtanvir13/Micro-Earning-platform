import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const BuyerHeader = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Buyer Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
            <span className="font-semibold">{user?.coins || 0} Coins</span>
          </div>
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-900 text-sm font-medium"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </header>
  );
};

export default BuyerHeader;
