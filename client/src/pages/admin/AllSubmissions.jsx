import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';

const AdminAllSubmissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = async () => {
        try {
            setLoading(true);
            // Fetch all submissions - would need admin endpoint
            const response = await api.get('/submissions/worker/my-submissions');
            setSubmissions(response.data.submissions || []);
        } catch (error) {
            toast.error('Failed to load submissions');
            // Set mock data for demo
            setSubmissions([]);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (submissionId, newStatus) => {
        try {
            await api.patch(`/submissions/${submissionId}/status`, { status: newStatus });
            toast.success(`Submission ${newStatus}`);
            fetchSubmissions();
        } catch (error) {
            toast.error('Failed to update submission');
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            pending: 'bg-yellow-100 text-yellow-800',
            approved: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800',
        };
        return badges[status] || 'bg-gray-100 text-gray-800';
    };

    const filteredSubmissions = submissions.filter(submission => {
        const matchesFilter = filter === 'all' || submission.status === filter;
        const matchesSearch = submission.submissionText?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const stats = {
        total: submissions.length,
        pending: submissions.filter(s => s.status === 'pending').length,
        approved: submissions.filter(s => s.status === 'approved').length,
        rejected: submissions.filter(s => s.status === 'rejected').length,
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">All Submissions</h1>
                    <p className="text-gray-600 mt-1">Review and manage worker submissions</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
                    <div className="text-sm text-gray-600">Total Submissions</div>
                    <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                </div>
                <div className="bg-yellow-50 rounded-xl p-4 border-2 border-yellow-200">
                    <div className="text-sm text-yellow-600">Pending Review</div>
                    <div className="text-2xl font-bold text-yellow-700">{stats.pending}</div>
                </div>
                <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
                    <div className="text-sm text-green-600">Approved</div>
                    <div className="text-2xl font-bold text-green-700">{stats.approved}</div>
                </div>
                <div className="bg-red-50 rounded-xl p-4 border-2 border-red-200">
                    <div className="text-sm text-red-600">Rejected</div>
                    <div className="text-2xl font-bold text-red-700">{stats.rejected}</div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Search submissions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-lg font-medium transition ${filter === 'all'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter('pending')}
                            className={`px-4 py-2 rounded-lg font-medium transition ${filter === 'pending'
                                ? 'bg-yellow-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Pending
                        </button>
                        <button
                            onClick={() => setFilter('approved')}
                            className={`px-4 py-2 rounded-lg font-medium transition ${filter === 'approved'
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Approved
                        </button>
                        <button
                            onClick={() => setFilter('rejected')}
                            className={`px-4 py-2 rounded-lg font-medium transition ${filter === 'rejected'
                                ? 'bg-red-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Rejected
                        </button>
                    </div>
                </div>
            </div>

            {/* Submissions List */}
            <div className="space-y-6">
                {filteredSubmissions.length === 0 ? (
                    <div className="bg-white rounded-[2rem] p-20 text-center border-2 border-dashed border-gray-100 animate-in fade-in zoom-in duration-700">
                        <div className="w-20 h-20 bg-gray-50 text-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeWidth={2} /></svg>
                        </div>
                        <p className="text-xl font-black text-gray-900 uppercase tracking-tighter">No submissions detected</p>
                        <p className="text-gray-400 font-medium mt-1 uppercase tracking-widest text-[10px]">Adjust your data filters to see more results</p>
                    </div>
                ) : (
                    filteredSubmissions.map((submission) => (
                        <div key={submission._id} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group">
                            <div className="flex flex-col lg:flex-row gap-8">
                                {/* Left Side - Proof Snapshot */}
                                <div className="lg:w-64 h-64 lg:h-auto rounded-[2rem] overflow-hidden relative bg-gray-50 border border-gray-100 shrink-0">
                                    <img
                                        src={submission.submissionImages?.[0] || 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80'}
                                        alt="Proof Snapshot"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-blue-600/0 transition-colors"></div>
                                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/40 backdrop-blur-md rounded-full text-[8px] font-black text-white uppercase tracking-widest border border-white/20">
                                        {submission.submissionImages?.[0] ? 'Visual Proof' : 'Text Based'}
                                    </div>
                                </div>

                                {/* Center Side - Submission Detail */}
                                <div className="flex-1 min-w-0 py-2">
                                    <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusBadge(submission.status)}`}>
                                                    {submission.status}
                                                </span>
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                    Submitted {new Date(submission.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-black text-gray-900 truncate uppercase tracking-tighter" title={submission.taskId?.title}>
                                                {submission.taskId?.title || 'System Task'}
                                            </h3>
                                            <p className="text-sm font-bold text-blue-600 mt-1 flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" /></svg>
                                                {submission.workerId?.displayName || submission.workerId?.email || 'Anonymous Agent'}
                                            </p>
                                        </div>

                                        <div className="text-right shrink-0">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter mb-1">Potential Payout</p>
                                            <p className="text-3xl font-black text-emerald-600">+{submission.taskId?.coinsPerWorker || 0} <span className="text-xs">Coins</span></p>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-[1.5rem] p-6 mb-6 border border-gray-100 group-hover:bg-white group-hover:shadow-inner transition-all">
                                        <p className="text-gray-500 font-medium text-sm leading-relaxed line-clamp-3 italic">
                                            "{submission.submissionText}"
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                            <span>System Entry: {new Date(submission.createdAt).toLocaleTimeString()}</span>
                                        </div>
                                        {submission.reviewedAt && (
                                            <div className="flex items-center space-x-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                                <span>Finalized: {new Date(submission.reviewedAt).toLocaleTimeString()}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Right Side - Executive Actions */}
                                {submission.status === 'pending' && (
                                    <div className="lg:w-48 flex lg:flex-col gap-4 py-2">
                                        <button
                                            onClick={() => handleStatusUpdate(submission._id, 'approved')}
                                            className="grow bg-emerald-600 text-white font-black py-4 rounded-2xl hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-500/30 transition-all flex items-center justify-center space-x-2 text-sm uppercase tracking-widest"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeWidth={3} /></svg>
                                            <span>Approve</span>
                                        </button>
                                        <button
                                            onClick={() => handleStatusUpdate(submission._id, 'rejected')}
                                            className="grow bg-red-600 text-white font-black py-4 rounded-2xl hover:bg-red-700 hover:shadow-xl hover:shadow-red-500/30 transition-all flex items-center justify-center space-x-2 text-sm uppercase tracking-widest"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth={3} /></svg>
                                            <span>Reject</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Results Count */}
            {filteredSubmissions.length > 0 && (
                <div className="text-center text-sm text-gray-600">
                    Showing {filteredSubmissions.length} of {submissions.length} submissions
                </div>
            )}
        </div>
    );
};

export default AdminAllSubmissions;
