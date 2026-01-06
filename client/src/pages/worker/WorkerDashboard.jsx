import { useEffect, useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const WorkerDashboard = () => {
  const [stats, setStats] = useState({
    totalEarned: 0,
    pendingSubmissions: 0,
    approvedSubmissions: 0,
    totalCoins: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [userRes, submissionsRes] = await Promise.all([
        api.get('/auth/me'),
        api.get('/submissions/worker/my-submissions'),
      ]);

      const user = userRes.data.user;
      const submissions = submissionsRes.data.submissions || [];

      const pending = submissions.filter((s) => s.status === 'pending').length;
      const approved = submissions.filter((s) => s.status === 'approved').length;

      setStats({
        totalEarned: user.totalEarned || 0,
        pendingSubmissions: pending,
        approvedSubmissions: approved,
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
          <div className="text-gray-600 text-sm mb-2">Total Earned</div>
          <div className="text-3xl font-bold text-green-600">
            {stats.totalEarned} coins
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-gray-600 text-sm mb-2">Current Balance</div>
          <div className="text-3xl font-bold text-blue-600">
            {stats.totalCoins} coins
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-gray-600 text-sm mb-2">Pending Submissions</div>
          <div className="text-3xl font-bold text-yellow-600">
            {stats.pendingSubmissions}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-gray-600 text-sm mb-2">Approved Submissions</div>
          <div className="text-3xl font-bold text-green-600">
            {stats.approvedSubmissions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;
