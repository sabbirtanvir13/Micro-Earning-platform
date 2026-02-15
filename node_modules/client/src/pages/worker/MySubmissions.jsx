import { useEffect, useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const MySubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchSubmissions();
  }, [page, statusFilter]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const query = `page=${page}&limit=10${statusFilter ? `&status=${statusFilter}` : ''}`;
      const response = await api.get(`/submissions/worker/my-submissions?${query}`);
      setSubmissions(response.data.submissions || []);
      setPagination(response.data.pagination || {});
    } catch (error) {
      toast.error('Failed to load submissions');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
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
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">My Submissions</h2>
          <p className="text-gray-500 font-medium">Track your proof of work and claim your rewards.</p>
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="w-full md:w-48 px-6 py-3 bg-white border border-gray-200 rounded-2xl font-bold text-gray-900 focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 outline-none transition-all appearance-none"
          >
            <option value="">All Domains</option>
            <option value="pending">Under Review</option>
            <option value="approved">Success Protocol</option>
            <option value="rejected">Action Required</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth={2.5} /></svg>
          </div>
        </div>
      </div>

      {submissions.length === 0 ? (
        <div className="bg-white p-20 rounded-[3rem] shadow-2xl shadow-indigo-100 border border-indigo-50 text-center animate-in fade-in zoom-in duration-700">
          <div className="w-24 h-24 bg-indigo-50 text-indigo-200 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeWidth={2} /></svg>
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tight">No Submissions Detected</h3>
          <p className="text-gray-500 font-medium">Your work history is currently empty. Start completing tasks to earn coins.</p>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {submissions.map((submission) => (
              <div
                key={submission._id}
                className="group bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-indigo-500/10 transition-all duration-300 overflow-hidden flex flex-col md:flex-row"
              >
                {/* Proof Snapshot */}
                <div className="md:w-56 h-56 md:h-auto relative overflow-hidden bg-gray-50 border-r border-gray-50">
                  <img
                    src={submission.submissionImages?.[0] || 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80'}
                    alt="Submission Proof"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-indigo-600/10 group-hover:bg-indigo-600/0 transition-colors"></div>
                  {submission.submissionImages?.[0] ? (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/40 backdrop-blur-md rounded-full text-[8px] font-black text-white uppercase tracking-widest border border-white/20">
                      Live Proof
                    </div>
                  ) : (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-gray-900/40 backdrop-blur-md rounded-full text-[8px] font-black text-white uppercase tracking-widest border border-white/20">
                      Text Only
                    </div>
                  )}
                </div>

                <div className="flex-1 p-8 flex flex-col">
                  <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${submission.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                            submission.status === 'rejected' ? 'bg-red-100 text-red-800' :
                              'bg-amber-100 text-amber-800'
                          }`}>
                          {submission.status}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          {new Date(submission.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-xl font-black text-gray-900 mb-2 truncate uppercase tracking-tight" title={submission.taskId?.title}>
                        {submission.taskId?.title || 'Contract Reward'}
                      </h3>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter mb-1">Earning Protocol</p>
                      <p className="text-2xl font-black text-indigo-600">+{submission.taskId?.coinsPerWorker || 0} <span className="text-xs">Coins</span></p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6 mb-6 flex-grow">
                    <p className="text-gray-500 font-medium text-sm line-clamp-2 italic leading-relaxed">
                      "{submission.submissionText}"
                    </p>
                  </div>

                  {submission.status === 'rejected' && submission.rejectionReason && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center space-x-4 animate-pulse">
                      <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeWidth={2} /></svg>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-red-800 uppercase tracking-widest">Reason for Rejection</p>
                        <p className="text-sm font-bold text-red-700">{submission.rejectionReason}</p>
                      </div>
                    </div>
                  )}

                  {submission.status === 'approved' && submission.coinsAwarded && (
                    <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth={2} /></svg>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Transaction Confirmed</p>
                        <p className="text-sm font-bold text-emerald-700">Earnings Credited to Vault</p>
                      </div>
                    </div>
                  )}

                  <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${submission.status === 'approved' ? 'bg-emerald-500' : submission.status === 'rejected' ? 'bg-red-500' : 'bg-amber-500'}`}></div>
                      <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Real-time status</span>
                    </div>
                    <button className="text-indigo-600 font-black text-[10px] uppercase tracking-widest hover:underline">View History →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {pagination.pages > 1 && (
            <div className="mt-12 flex justify-center items-center space-x-6">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-8 py-3 bg-white border border-gray-200 rounded-2xl font-black text-sm text-gray-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all disabled:opacity-50 shadow-xl shadow-gray-200/50"
              >
                Previous
              </button>
              <span className="font-black text-gray-500 uppercase tracking-widest text-xs bg-gray-100 px-6 py-3 rounded-2xl">
                Block {page} of {pagination.pages}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page >= pagination.pages}
                className="px-8 py-3 bg-white border border-gray-200 rounded-2xl font-black text-sm text-gray-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all disabled:opacity-50 shadow-xl shadow-gray-200/50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MySubmissions;
