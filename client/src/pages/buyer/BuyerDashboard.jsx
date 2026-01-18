import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';

const BuyerDashboard = () => {
  const [stats, setStats] = useState({
    totalSpent: 0,
    activeTasks: 0,
    completedTasks: 0,
    totalCoins: 0,
    totalWorkers: 0,
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
      const totalWorkers = tasks.reduce((sum, task) => sum + (task.currentWorkers || 0), 0);

      setStats({
        totalSpent: user.totalSpent || 0,
        activeTasks: active,
        completedTasks: completed,
        totalCoins: user.coins || 0,
        totalWorkers,
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
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome Back, Buyer! 🚀</h1>
        <p className="text-purple-100">Manage your tasks and track progress</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Available Balance */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500 rounded-xl">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <Link to="/buyer/payments" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
              Add Funds →
            </Link>
          </div>
          <div className="text-gray-600 text-sm mb-1">Available Balance</div>
          <div className="text-3xl font-black text-blue-700">{stats.totalCoins} <span className="text-lg">coins</span></div>
        </div>

        {/* Total Spent */}
        <div className="bg-gradient-to-br from-red-50 to-pink-50 border border-red-200 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-500 rounded-xl">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-full">
              This Month
            </span>
          </div>
          <div className="text-gray-600 text-sm mb-1">Total Invested</div>
          <div className="text-3xl font-black text-red-700">{stats.totalSpent} <span className="text-lg">coins</span></div>
        </div>

        {/* Active Tasks */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-500 rounded-xl">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">
              In Progress
            </span>
          </div>
          <div className="text-gray-600 text-sm mb-1">Active Tasks</div>
          <div className="text-3xl font-black text-yellow-700">{stats.activeTasks}</div>
        </div>

        {/* Completed Tasks */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500 rounded-xl">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
              +{stats.completedTasks} Done
            </span>
          </div>
          <div className="text-gray-600 text-sm mb-1">Completed Tasks</div>
          <div className="text-3xl font-black text-green-700">{stats.completedTasks}</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/buyer/create-task" className="group bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-2xl p-6 text-white transition-all duration-300 hover:shadow-xl transform hover:scale-105">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-lg">Create New Task</div>
              <div className="text-sm text-white/80">Post a new job</div>
            </div>
          </div>
        </Link>

        <Link to="/buyer/my-tasks" className="group bg-white border-2 border-gray-200 hover:border-blue-500 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 group-hover:bg-blue-500 rounded-xl transition-colors">
              <svg className="w-6 h-6 text-blue-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-gray-900">Manage Tasks</div>
              <div className="text-sm text-gray-500">View all your tasks</div>
            </div>
          </div>
        </Link>

        <Link to="/buyer/payments" className="group bg-white border-2 border-gray-200 hover:border-green-500 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 group-hover:bg-green-500 rounded-xl transition-colors">
              <svg className="w-6 h-6 text-green-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-gray-900">Add Funds</div>
              <div className="text-sm text-gray-500">Buy more coins</div>
            </div>
          </div>
        </Link>
      </div>

      {/* Task Overview */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Task Overview</h3>
          <Link to="/buyer/my-tasks" className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
            <div className="text-4xl font-black text-purple-600 mb-2">{stats.totalWorkers}</div>
            <div className="text-sm text-gray-600">Total Workers Hired</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
            <div className="text-4xl font-black text-blue-600 mb-2">{stats.activeTasks + stats.completedTasks}</div>
            <div className="text-sm text-gray-600">Total Tasks Posted</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <div className="text-4xl font-black text-green-600 mb-2">
              {stats.activeTasks + stats.completedTasks > 0
                ? Math.round((stats.completedTasks / (stats.activeTasks + stats.completedTasks)) * 100)
                : 0}%
            </div>
            <div className="text-sm text-gray-600">Completion Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
