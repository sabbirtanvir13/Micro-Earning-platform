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
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Earnings Vault</h2>
          <p className="text-gray-500 font-medium">Detailed log of your successful task completions and rewards.</p>
        </div>
        <div className="bg-white px-8 py-4 rounded-[2rem] shadow-xl shadow-indigo-100 border border-indigo-50 flex items-center space-x-4 group overflow-hidden relative">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth={2.5} /></svg>
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Lifetime Revenue</p>
            <p className="text-3xl font-black text-emerald-600 leading-none">{totalEarned} <span className="text-sm">Coins</span></p>
          </div>
          <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-emerald-50 rounded-full blur-2xl opacity-50 group-hover:scale-150 transition-transform"></div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Protocol Type</th>
                <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Campaign Reference</th>
                <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Reward Unit</th>
                <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Execution Date</th>
                <th className="px-10 py-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {earnings.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-10 py-20 text-center">
                    <div className="w-16 h-16 bg-gray-50 text-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth={2} /></svg>
                    </div>
                    <p className="text-gray-900 font-black uppercase tracking-tight text-lg">No Revenue Data Detected</p>
                    <p className="text-gray-400 font-medium text-sm">Your earnings ledger is currently empty.</p>
                  </td>
                </tr>
              ) : (
                earnings.map((earning, index) => (
                  <tr key={index} className="hover:bg-indigo-50/30 transition-colors group">
                    <td className="px-10 py-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeWidth={3} /></svg>
                        </div>
                        <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Proof Verified</span>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <p className="font-black text-gray-900 uppercase tracking-tight truncate max-w-[250px]">{earning.taskTitle}</p>
                    </td>
                    <td className="px-10 py-6">
                      <p className="text-xl font-black text-emerald-600">+{earning.coins} <span className="text-xs uppercase">Coins</span></p>
                    </td>
                    <td className="px-10 py-6">
                      <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{new Date(earning.date).toLocaleDateString()}</p>
                    </td>
                    <td className="px-10 py-6 text-right">
                      <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest ring-1 ring-emerald-200">
                        Settled
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
