import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTask();
    fetchSubmissions();
  }, [id]);

  const fetchTask = async () => {
    try {
      const response = await api.get(`/tasks/${id}`);
      setTask(response.data.task);
    } catch (error) {
      toast.error('Failed to load task');
      navigate('/buyer/my-tasks');
    } finally {
      setLoading(false);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const response = await api.get(`/submissions/task/${id}`);
      setSubmissions(response.data.submissions || []);
    } catch (error) {
      console.error('Failed to load submissions');
    }
  };

  const handleApprove = async (submissionId) => {
    try {
      await api.patch(`/submissions/${submissionId}/approve`);
      toast.success('Submission approved!');
      fetchSubmissions();
      fetchTask();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to approve');
    }
  };

  const handleReject = async (submissionId) => {
    const reason = prompt('Enter rejection reason:');
    if (!reason) return;

    try {
      await api.patch(`/submissions/${submissionId}/reject`, { rejectionReason: reason });
      toast.success('Submission rejected');
      fetchSubmissions();
      fetchTask();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reject');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!task) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/buyer/my-tasks')}
          className="group flex items-center space-x-2 text-sm font-black text-gray-400 hover:text-blue-600 transition-all uppercase tracking-widest"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth={3} /></svg>
          <span>Back to Campaigns</span>
        </button>
        <div className="flex items-center space-x-2 text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
          <span>Management</span>
          <span>/</span>
          <span className="text-blue-600">Task Intelligence</span>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] shadow-2xl shadow-blue-100 overflow-hidden border border-blue-50">
        <div className="flex flex-col lg:flex-row">
          {/* Visual Section */}
          <div className="lg:w-1/3 relative bg-gray-50 min-h-[300px]">
            <img
              src={task.image || `https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80`}
              alt={task.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-blue-600/10"></div>
          </div>

          {/* Campaign Detail Section */}
          <div className="lg:flex-1 p-10 lg:p-16">
            <div className="flex items-center space-x-4 mb-6">
              <span className="px-5 py-2 bg-blue-50 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest ring-1 ring-blue-100">
                Active Deployment
              </span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                REF #{task._id.slice(-6).toUpperCase()}
              </span>
            </div>

            <h2 className="text-4xl font-black text-gray-900 mb-6 uppercase tracking-tight leading-none">
              {task.title}
            </h2>

            <div className="flex flex-wrap gap-10 mb-10">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth={2.5} /></svg>
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Rate / Worker</p>
                  <p className="text-xl font-black text-gray-900">{task.coinsPerWorker} <span className="text-xs">Coins</span></p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 005.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeWidth={2.5} /></svg>
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Deployment Reach</p>
                  <p className="text-xl font-black text-gray-900">{task.currentWorkers} / {task.requiredWorkers} <span className="text-xs">Capacity</span></p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-100">
              <p className="text-gray-500 font-medium leading-relaxed italic line-clamp-2">
                "{task.description}"
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Incoming Protocol Proofs</h3>
            <p className="text-gray-400 font-medium text-sm">Review and validate submissions from the worker network.</p>
          </div>
          <div className="bg-white px-6 py-2 rounded-2xl border border-gray-100 shadow-sm">
            <span className="text-sm font-black text-blue-600">{submissions.length}</span>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Submissions</span>
          </div>
        </div>

        {submissions.length === 0 ? (
          <div className="bg-white p-20 rounded-[3rem] shadow-2xl shadow-blue-50 shadow-inner border border-blue-50 text-center">
            <div className="w-20 h-20 bg-blue-50 text-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 transform -rotate-12">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeWidth={2.5} /></svg>
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Waiting for Unit Reports</h3>
            <p className="text-gray-400 font-medium italic">New submissions will appear here as workers complete their tasks.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {submissions.map((submission) => (
              <div
                key={submission._id}
                className="group bg-white rounded-[2.5rem] border border-gray-50 shadow-xl shadow-gray-200/40 hover:shadow-blue-500/10 transition-all duration-500 flex flex-col md:flex-row overflow-hidden"
              >
                {/* Proof Image */}
                <div className="md:w-48 h-56 md:h-auto relative bg-gray-100 overflow-hidden shrink-0 border-r border-gray-50">
                  <img
                    src={submission.submissionImages?.[0] || 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80'}
                    alt="Proof"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-blue-600/0 transition-colors"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="px-3 py-1 bg-gray-900/60 backdrop-blur-md rounded-full text-[8px] font-black text-white uppercase tracking-widest border border-white/20">
                      {submission.submissionImages?.[0] ? 'Visual Confirmation' : 'Text Record'}
                    </span>
                  </div>
                </div>

                <div className="flex-1 p-8 flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-sm ring-4 ring-blue-50">
                        {submission.workerId?.displayName?.[0] || 'W'}
                      </div>
                      <div>
                        <p className="font-black text-gray-900 uppercase tracking-tighter leading-none">
                          {submission.workerId?.displayName || 'Active Agent'}
                        </p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                          {new Date(submission.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ring-1 ${submission.status === 'approved' ? 'bg-emerald-50 text-emerald-600 ring-emerald-200' :
                          submission.status === 'rejected' ? 'bg-red-50 text-red-600 ring-red-200' :
                            'bg-blue-50 text-blue-600 ring-blue-200'
                        }`}
                    >
                      {submission.status}
                    </span>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-5 mb-6 border border-gray-100 group-hover:bg-white transition-all flex-grow">
                    <p className="text-gray-500 font-medium text-sm leading-relaxed italic">
                      "{submission.submissionText}"
                    </p>
                  </div>

                  <div className="mt-auto">
                    {submission.status === 'pending' && (
                      <div className="flex gap-4">
                        <button
                          onClick={() => handleApprove(submission._id)}
                          className="flex-1 bg-emerald-600 text-white font-black py-4 rounded-2xl hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center justify-center space-x-2 text-xs uppercase tracking-widest"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeWidth={3} /></svg>
                          <span>Validate</span>
                        </button>
                        <button
                          onClick={() => handleReject(submission._id)}
                          className="flex-1 bg-red-600 text-white font-black py-4 rounded-2xl hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/30 transition-all flex items-center justify-center space-x-2 text-xs uppercase tracking-widest"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth={3} /></svg>
                          <span>Decline</span>
                        </button>
                      </div>
                    )}

                    {submission.status === 'rejected' && submission.rejectionReason && (
                      <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center space-x-4">
                        <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01" strokeWidth={2} /></svg>
                        </div>
                        <p className="text-xs font-bold text-red-700 truncate">REASON: {submission.rejectionReason}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetail;
