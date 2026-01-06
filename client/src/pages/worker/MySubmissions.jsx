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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Submissions</h2>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2 border rounded"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      {submissions.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-600">No submissions found.</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {submissions.map((submission) => (
              <div key={submission._id} className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {submission.taskId?.title || 'Task'}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {submission.taskId?.coinsPerWorker || 0} coins
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded text-sm font-semibold ${getStatusBadge(
                      submission.status
                    )}`}
                  >
                    {submission.status}
                  </span>
                </div>
                <p className="text-gray-700 mb-4">{submission.submissionText}</p>
                {submission.status === 'rejected' && submission.rejectionReason && (
                  <div className="bg-red-50 border border-red-200 rounded p-3 mb-4">
                    <p className="text-red-800 text-sm">
                      <strong>Rejection Reason:</strong> {submission.rejectionReason}
                    </p>
                  </div>
                )}
                {submission.status === 'approved' && submission.coinsAwarded && (
                  <div className="bg-green-50 border border-green-200 rounded p-3">
                    <p className="text-green-800 text-sm">
                      <strong>Coins Awarded:</strong> {submission.coinsAwarded}
                    </p>
                  </div>
                )}
                <div className="text-gray-500 text-xs mt-4">
                  Submitted: {new Date(submission.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
          {pagination.pages > 1 && (
            <div className="mt-6 flex justify-center space-x-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {page} of {pagination.pages}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page >= pagination.pages}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MySubmissions;
