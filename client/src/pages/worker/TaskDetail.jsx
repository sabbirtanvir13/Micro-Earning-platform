import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [submissionText, setSubmissionText] = useState('');
  const [submissionImage, setSubmissionImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      const response = await api.get(`/tasks/${id}`);
      setTask(response.data.task);
      setSubmission(response.data.userSubmission);
    } catch (error) {
      toast.error('Failed to load task');
      navigate('/worker/tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await api.post('/submissions', {
        taskId: id,
        submissionText,
        submissionImages: submissionImage ? [submissionImage] : [],
      });
      toast.success('Submission created successfully!');
      navigate('/worker/my-submissions');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit');
    } finally {
      setSubmitting(false);
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
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Breadcrumbs & Navigation */}
      <div className="flex items-center space-x-2 text-sm font-black uppercase tracking-widest text-gray-400">
        <button onClick={() => navigate('/worker/tasks')} className="hover:text-indigo-600 transition-colors">Find Tasks</button>
        <span>/</span>
        <span className="text-gray-900">Task Intelligence</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column - Image & Instructions */}
        <div className="lg:col-span-12 space-y-8">
          <div className="bg-white rounded-[3rem] shadow-2xl shadow-indigo-100 overflow-hidden border border-indigo-50">
            <div className="flex flex-col lg:flex-row">
              {/* Visual Section */}
              <div className="lg:w-1/2 relative bg-gray-100 min-h-[400px]">
                <img
                  src={task.image || `https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80`}
                  alt={task.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Meta Section */}
              <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center">
                <div className="flex items-center space-x-3 mb-6">
                  <span className="px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest ring-1 ring-indigo-200">
                    {task.category || 'Service'}
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Reference #{task._id.slice(-6).toUpperCase()}
                  </span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight uppercase tracking-tighter text-balance">
                  {task.title}
                </h1>
                <div className="flex flex-wrap gap-6 mb-10">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth={2.5} /></svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Reward</p>
                      <p className="text-xl font-black text-emerald-600">{task.coinsPerWorker} Coins</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 005.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeWidth={2.5} /></svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Required</p>
                      <p className="text-xl font-black text-gray-900">{task.requiredWorkers - task.currentWorkers} / {task.requiredWorkers}</p>
                    </div>
                  </div>
                </div>
                <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-indigo-${i * 100} ring-1 ring-gray-100`}></div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-50 flex items-center justify-center text-[10px] font-black text-gray-400">+12</div>
                  </div>
                  <p className="text-xs font-bold text-gray-400">Trusted Task Provider</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Description */}
            <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl shadow-gray-200/50">
              <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center">
                <span className="w-1.5 h-6 bg-indigo-600 rounded-full mr-3"></span>
                Executive Brief
              </h3>
              <div className="prose prose-indigo max-w-none text-gray-500 font-medium leading-relaxed whitespace-pre-wrap">
                {task.description}
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-white shadow-xl shadow-indigo-500/10">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth={2} /></svg>
                Strict Instructions
              </h3>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <p className="text-indigo-50 leading-relaxed font-medium">
                  {task.submissionInstructions || 'Follow all platform guidelines and ensure high-quality results. Rejections will affect your worker rating.'}
                </p>
              </div>
            </div>
          </div>

          {/* Submission Logic */}
          <div className="bg-white rounded-[2.5rem] p-10 md:p-16 border-2 border-dashed border-gray-200 text-center">
            {submission ? (
              <div className="space-y-4">
                <div className="w-20 h-20 bg-yellow-100 text-yellow-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth={2} /></svg>
                </div>
                <h4 className="text-2xl font-black text-gray-900">Submission Under Review</h4>
                <p className="text-gray-500 max-w-sm mx-auto font-medium">You have already submitted your proof for this task. The buyer will review it shortly. Current Status: <span className="font-black text-indigo-600 uppercase tracking-widest">{submission.status}</span></p>
              </div>
            ) : task.status === 'open' || task.status === 'in_progress' ? (
              <div className="max-w-2xl mx-auto">
                <div className="mb-10 text-center">
                  <h4 className="text-3xl font-black text-gray-900 mb-4">Finalize Completion</h4>
                  <p className="text-gray-500 font-medium italic">Provide the requested proof or information to claim your reward.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-10 text-left">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-4">Detailed Proof / Deliverables</label>
                    <textarea
                      value={submissionText}
                      onChange={(e) => setSubmissionText(e.target.value)}
                      rows={6}
                      className="w-full px-8 py-6 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 transition-all outline-none font-medium leading-relaxed shadow-inner"
                      placeholder="Enter URLs, screenshots, or text proof here..."
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-1 gap-10">
                    <div className="space-y-4">
                      <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-4">Proof Screenshot URL</label>
                      <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="flex-1 w-full relative group">
                          <input
                            type="url"
                            value={submissionImage}
                            onChange={(e) => setSubmissionImage(e.target.value)}
                            className="w-full px-8 py-5 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 transition-all outline-none font-bold shadow-inner"
                            placeholder="https://imgur.com/screenshot.jpg"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth={2} /></svg>
                          </div>
                        </div>

                        {submissionImage && (
                          <div className="w-full md:w-32 h-32 rounded-[2rem] overflow-hidden border-4 border-white shadow-xl bg-gray-100 group">
                            <img
                              src={submissionImage}
                              alt="Proof Preview"
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              onError={(e) => { e.target.src = 'https://placehold.co/400x400?text=Invalid+Link'; }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting || !submissionText.trim()}
                    className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white font-black py-6 rounded-3xl text-xl shadow-2xl shadow-indigo-500/30 hover:-translate-y-1 transition-all disabled:opacity-50"
                  >
                    {submitting ? 'Authenticating Submission...' : 'Securely Submit Proof →'}
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-20 h-20 bg-red-100 text-red-600 rounded-3xl flex items-center justify-center mx-auto">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeWidth={2} /></svg>
                </div>
                <h4 className="text-2xl font-black text-gray-900">Task Inaccessible</h4>
                <p className="text-gray-500 font-medium">This task is currently locked or has reached maximum capacity.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
