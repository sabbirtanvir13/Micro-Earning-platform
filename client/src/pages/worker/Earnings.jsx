import { useEffect, useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const Earnings = () => {
  const [earnings, setEarnings] = useState([]);
  const [totalEarned, setTotalEarned] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEarnings();
  }, []);

  const fetchEarnings = async () => {
    try {
      const [userRes, submissionsRes] = await Promise.all([
        api.get('/auth/me'),
        api.get('/submissions/worker/my-submissions?status=approved'),
      ]);

      const user = userRes.data.user;
      const submissions = submissionsRes.data.submissions || [];

      setTotalEarned(user.totalEarned || 0);
      setEarnings(
        submissions
          .filter((s) => s.coinsAwarded)
          .map((s) => ({
            taskTitle: s.taskId?.title || 'Task',
            coins: s.coinsAwarded,
            date: s.reviewedAt || s.createdAt,
          }))
      );
    } catch (error) {
      toast.error('Failed to load earnings');
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
      <h2 className="text-2xl font-bold mb-6">Earnings History</h2>
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="text-gray-600 text-sm mb-2">Total Earned</div>
        <div className="text-4xl font-bold text-green-600">{totalEarned} coins</div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Task
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Coins Earned
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {earnings.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                  No earnings yet
                </td>
              </tr>
            ) : (
              earnings.map((earning, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {earning.taskTitle}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                    +{earning.coins} coins
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(earning.date).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Earnings;
