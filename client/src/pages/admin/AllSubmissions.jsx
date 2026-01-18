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
            <div className="space-y-4">
                {filteredSubmissions.length === 0 ? (
                    <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
                        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-gray-600 font-medium">No submissions found</p>
                        <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
                    </div>
                ) : (
                    filteredSubmissions.map((submission) => (
                        <div key={submission._id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                {/* Left Side - Submission Info */}
                                <div className="flex-1 space-y-3">
                                    {/* Header */}
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-900">
                                                Task: {submission.taskId?.title || 'Unknown Task'}
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Submitted by: {submission.workerId?.displayName || submission.workerId?.email || 'Unknown Worker'}
                                            </p>
                                        </div>
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(submission.status)}`}>
                                            {submission.status}
                                        </span>
                                    </div>

                                    {/* Submission Content */}
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-sm font-medium text-gray-700 mb-2">Submission:</p>
                                        <p className="text-gray-600">{submission.submissionText}</p>
                                    </div>

                                    {/* Metadata */}
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                        <div className="flex items-center space-x-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>{new Date(submission.createdAt).toLocaleString()}</span>
                                        </div>
                                        {submission.reviewedAt && (
                                            <div className="flex items-center space-x-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span>Reviewed: {new Date(submission.reviewedAt).toLocaleString()}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Right Side - Actions */}
                                {submission.status === 'pending' && (
                                    <div className="flex lg:flex-col gap-2">
                                        <button
                                            onClick={() => handleStatusUpdate(submission._id, 'approved')}
                                            className="flex-1 lg:flex-none px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition flex items-center justify-center space-x-2"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>Approve</span>
                                        </button>
                                        <button
                                            onClick={() => handleStatusUpdate(submission._id, 'rejected')}
                                            className="flex-1 lg:flex-none px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition flex items-center justify-center space-x-2"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
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
