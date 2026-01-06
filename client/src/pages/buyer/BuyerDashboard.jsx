import { useEffect, useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const BuyerDashboard = () => {
  const [stats, setStats] = useState({
    totalSpent: 0,
    activeTasks: 0,
    completedTasks: 0,
    totalCoins: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [userRes, tasksRes] = await Promise.all([
        api.get('/auth/me'),
        api.get('/tasks/buyer/my-tasks'),
      ]);

      const user = userRes.data.user;
      const tasks = tasksRes.data.tasks || [];

      const active = tasks.filter((t) => t.status === 'open' || t.status === 'in_progress').length;
      const completed = tasks.filter((t) => t.status === 'completed').length;

      setStats({
        totalSpent: user.totalSpent || 0,
        activeTasks: active,
        completedTasks: completed,
        totalCoins: user.coins || 0,
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
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-gray-600 text-sm mb-2">Total Spent</div>
          <div className="text-3xl font-bold text-red-600">{stats.totalSpent} coins</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-gray-600 text-sm mb-2">Current Balance</div>
          <div className="text-3xl font-bold text-blue-600">{stats.totalCoins} coins</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-gray-600 text-sm mb-2">Active Tasks</div>
          <div className="text-3xl font-bold text-yellow-600">{stats.activeTasks}</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-gray-600 text-sm mb-2">Completed Tasks</div>
          <div className="text-3xl font-bold text-green-600">{stats.completedTasks}</div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
