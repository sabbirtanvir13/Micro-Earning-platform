import { Link } from 'react-router-dom';

const AdminHeader = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <Link
          to="/"
          className="text-gray-600 hover:text-gray-900 text-sm font-medium"
        >
          Back to Home
        </Link>
      </div>
    </header>
  );
};

export default AdminHeader;
