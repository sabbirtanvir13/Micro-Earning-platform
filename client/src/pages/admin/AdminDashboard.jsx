import { useEffect, useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalTasks: 0,
    totalUsers: 0,
    pendingWithdrawals: 0,
    totalSubmissions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Note: These endpoints would need to be created in the backend
      // For now, this is a placeholder structure
      setStats({
        totalTasks: 0,
        totalUsers: 0,
        pendingWithdrawals: 0,
        totalSubmissions: 0,
      });
    } catch (error) {
      toast.error('Failed to load dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Admin Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-gray-600 text-sm mb-2">Total Tasks</div>
          <div className="text-3xl font-bold text-blue-600">{stats.totalTasks}</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-gray-600 text-sm mb-2">Total Users</div>
          <div className="text-3xl font-bold text-green-600">{stats.totalUsers}</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-gray-600 text-sm mb-2">Pending Withdrawals</div>
          <div className="text-3xl font-bold text-yellow-600">
            {stats.pendingWithdrawals}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-gray-600 text-sm mb-2">Total Submissions</div>
          <div className="text-3xl font-bold text-purple-600">{stats.totalSubmissions}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
